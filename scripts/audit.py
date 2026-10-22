#!/usr/bin/env python3
"""Проверка выложенного сайта — ТОЛЬКО ЧТЕНИЕ. Браузер — Playwright (Chrome for Testing),
не обычный Chrome (правило проекта).

Для каждого адреса и каждой ширины (1440 десктоп, 768 планшет, 390 и 320 телефон с мобильным UA):
  код ответа · число h1 · горизонтальная прокрутка · битые картинки (видимые, с src) ·
  растяжение картинок (показано шире исходника: 1440 — > 1,0; телефон @2 — > 1,33) ·
  невидимые после полной прокрутки [data-reveal] · JS-ошибки · служебные фразы ·
  КОНТРАСТ каждой видимой надписи: фон снимается с прозрачным текстом ПО ЭКРАНАМ
  (не full_page — иначе всё, что зависит от vh, съезжает), надпись должна быть верхним
  элементом в своей точке (elementFromPoint — иначе меряем куки-баннер или шапку).
  Куки принимаются до замеров. scroll-behavior выключается перед съёмкой.
Плюс: все внутренние ссылки со всех страниц — код ответа.

usage: audit.py <base_url> <outdir> [--paths p1,p2,...] [--modes d1440,t768,m390,m320] [--shots]
"""
import asyncio
import json
import os
import random
import re
import sys
import urllib.request
from io import BytesIO
from urllib.parse import urljoin, urlparse

from PIL import Image
from playwright.async_api import async_playwright

MOB_UA = ("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 "
          "(KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1")
# 768 — планшет (по «Стандарту вёрстки»): там текст первого экрана лежит на фото почти во всю ширину.
# Выбрать часть ширин: --modes d1440,t768 (по умолчанию все четыре, ~25 мин на 18 страниц).
MODES = [("d1440", 1440, 900, 1, False), ("t768", 768, 1024, 2, True), ("m390", 390, 844, 2, True), ("m320", 320, 640, 2, True)]
SERVICE_PHRASES = [
    "уточняется", "по данным клиента", "нужно уточнить", "tbd", "todo", "lorem", "заглушка",
    "материалы клиента", "сведение за клиентом", "вынесено клиенту", "пока нет фото",
    "служебн", "[...]", "{name}", "{acc}", "undefined", "null", "nan",
]

PAGE_JS = r"""
() => {
  const vis = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0.01; };
  const imgs = [...document.images];
  const broken = imgs.filter(i => i.complete && i.naturalWidth === 0 && (i.getAttribute('src')||'') && vis(i)).map(i => i.getAttribute('src'));
  const stretch = imgs.filter(i => vis(i) && i.naturalWidth > 0).map(i => {
      const r = i.getBoundingClientRect();
      const fit = getComputedStyle(i).objectFit;
      // У картинок с srcset naturalWidth пересчитан под плотность и почти всегда «равен» боксу —
      // настоящую ширину файла берём из имени (-2000.webp, -800.webp), высоту — по пропорции.
      const mw = (i.currentSrc || '').match(/-(\d{3,4})\.(webp|jpg|png)/);
      const realW = mw ? +mw[1] : i.naturalWidth;
      const realH = realW * i.naturalHeight / i.naturalWidth;
      // при cover кадр заполняет бокс: показанная ширина исходника = max по осям
      const k = fit === 'cover' ? Math.max(r.width / realW, r.height / realH)
              : fit === 'contain' ? Math.min(r.width / realW, r.height / realH)
              : r.width / realW;
      return { src: i.currentSrc || i.src, k: +(k * devicePixelRatio).toFixed(2), box: [Math.round(r.width), Math.round(r.height)], nat: [realW, Math.round(realH)] };
  });
  const hidden = [...document.querySelectorAll('[data-reveal], [data-reveal-stagger] > *')]
      .filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && parseFloat(getComputedStyle(el).opacity) < 0.05; })
      .map(el => el.className || el.tagName);
  const links = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href'));
  const h1 = [...document.querySelectorAll('h1')].map(h => h.innerText.trim());
  return {
    title: document.title, h1, links, broken, stretch, hidden,
    // ширина экрана — clientWidth: в мобильном режиме innerWidth растягивается вслед за вылезшим блоком
    // (на 320 было innerWidth 331 = scrollWidth 331, и прокрутка вбок не ловилась)
    sw: document.documentElement.scrollWidth, iw: document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight,
    text: document.body.innerText,
    robots: (document.querySelector('meta[name=robots]')||{}).content || null,
    canonical: (document.querySelector('link[rel=canonical]')||{}).href || null,
  };
}
"""

# Текстовые элементы: у которых есть собственный непустой текстовый узел.
TEXT_JS = r"""
() => {
  const out = [];
  const all = document.querySelectorAll('body *');
  for (const el of all) {
    if (['SCRIPT','STYLE','NOSCRIPT','SVG','PATH','IFRAME','IMG'].includes(el.tagName)) continue;
    const own = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (!own.length) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < 0.3) continue;
    // скрытые подписи для экранных читалок (.vh: clip-path inset(50%)) на экране не видны
    if (el.closest('.vh') || (cs.clipPath && cs.clipPath !== 'none')) continue;
    if (el.closest('[aria-hidden="true"]') && !el.closest('.mq')) continue;
    const range = document.createRange(); range.selectNodeContents(own[0]);
    const rects = [...range.getClientRects()].filter(r => r.width > 2 && r.height > 2);
    if (!rects.length) continue;
    const r = rects[0];
    if (r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth) continue;
    const cx = Math.min(innerWidth - 1, Math.max(0, r.left + Math.min(r.width, 40) / 2));
    const cy = Math.min(innerHeight - 1, Math.max(0, r.top + r.height / 2));
    const top = document.elementFromPoint(cx, cy);
    if (!top || !(top === el || el.contains(top) || top.contains(el))) continue;
    const m = cs.color.match(/[\d.]+/g).map(Number);
    if (m.length > 3 && m[3] < 0.99) { /* полупрозрачный текст — смешаем с фоном ниже */ }
    out.push({
      text: own[0].textContent.trim().slice(0, 60), color: m,
      size: parseFloat(cs.fontSize), weight: parseInt(cs.fontWeight) || 400,
      box: [Math.max(0, r.left), Math.max(0, r.top), Math.min(innerWidth, r.right), Math.min(innerHeight, r.bottom)],
      sel: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : ''),
    });
  }
  return out;
}
"""


def lum(rgb):
    def f(c):
        c = c / 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = rgb[:3]
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def contrast(a, b):
    la, lb = sorted([lum(a), lum(b)], reverse=True)
    return (la + 0.05) / (lb + 0.05)


async def check_contrast(page, dpr):
    """Экран за экраном: снимок с прозрачным текстом → худший пиксель фона под надписью."""
    issues = []
    total = 0
    height = await page.evaluate("document.documentElement.scrollHeight")
    vh = await page.evaluate("innerHeight")
    y = 0
    seen = set()
    while y < height:
        await page.evaluate(f"window.scrollTo(0, {y})")
        await page.wait_for_timeout(350)
        items = await page.evaluate(TEXT_JS)
        await page.add_style_tag(content="*{color:transparent!important;text-shadow:none!important;caret-color:transparent!important;transition:none!important} *::placeholder{color:transparent!important} .kt-top,.kt-progress,.cookie-banner{visibility:hidden!important}", )
        await page.wait_for_timeout(60)
        await page.wait_for_timeout(120)
        png = await page.screenshot()
        await page.evaluate("document.querySelectorAll('style').forEach(s => { if (s.textContent.startsWith('*{color:transparent')) s.remove(); })")
        img = Image.open(BytesIO(png)).convert("RGB")
        for it in items:
            key = (it["text"], round(it["box"][1] + y))
            if key in seen:
                continue
            seen.add(key)
            total += 1
            x0, y0, x1, y1 = [int(v * dpr) for v in it["box"]]
            # рамка надписи не должна выходить за снимок: за краем PIL дорисовывает чёрное — ложный «плохой контраст»
            x1, y1 = min(x1, img.width), min(y1, img.height)
            if x1 - x0 < 2 or y1 - y0 < 2:
                continue
            crop = img.crop((x0, y0, x1, y1)).resize((max(1, (x1 - x0) // 3), max(1, (y1 - y0) // 3)))
            px = list(crop.getdata())
            col = it["color"]
            # худший 10-й процентиль по контрасту — текст должен читаться и на самом светлом/тёмном месте
            cs = sorted(contrast(col, p) for p in px)
            worst = cs[max(0, int(len(cs) * 0.1) - 1)] if cs else 21
            large = it["size"] >= 24 or (it["size"] >= 18.66 and it["weight"] >= 700)
            need = 3.0 if large else 4.5
            if worst < need:
                issues.append({"text": it["text"], "sel": it["sel"], "ratio": round(worst, 2), "need": need,
                               "y": round(it["box"][1] + y), "size": it["size"]})
        y += int(vh * 0.85)
    return total, issues


async def run(base, outdir, paths, shots):
    os.makedirs(outdir, exist_ok=True)
    report = {"base": base, "pages": [], "links": {}}
    all_links = set()
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for path in paths:
            for mode, w, h, dpr, mobile in MODES:
                ctx = await browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=dpr,
                                                is_mobile=mobile, has_touch=mobile,
                                                user_agent=MOB_UA if mobile else None)
                await ctx.add_init_script("try{localStorage.setItem('cookie-consent-v1','1')}catch(e){}")
                page = await ctx.new_page()
                errors = []
                page.on("pageerror", lambda e: errors.append(str(e)))
                page.on("console", lambda m: errors.append(m.text) if m.type == "error" and "yandex" not in m.text else None)
                url = urljoin(base, path) + ("&" if "?" in path else "?") + f"v={random.randint(10**6, 10**7)}"
                resp = await page.goto(url, wait_until="networkidle")
                await page.add_style_tag(content="html{scroll-behavior:auto!important}")
                # полная прокрутка — проявить всё, что появляется при прокрутке
                hgt = await page.evaluate("document.documentElement.scrollHeight")
                for yy in range(0, hgt + h, int(h * 0.7)):
                    await page.evaluate(f"window.scrollTo(0,{yy})")
                    await page.wait_for_timeout(120)
                await page.wait_for_timeout(900)
                info = await page.evaluate(PAGE_JS)
                # k — сколько пикселей экрана приходится на пиксель исходника (с учётом DPR).
                # Стандарт: на 1440@1 не больше 1,0; на телефоне @2 не больше 1,33.
                stretched = [s for s in info["stretch"] if s["k"] > (1.01 if not mobile else 1.34)]
                text_low = info["text"].lower()
                phrases = [ph for ph in SERVICE_PHRASES if re.search(r"(?<![а-яa-z])" + re.escape(ph) + r"(?![а-яa-z])", text_low)]
                total, low = await check_contrast(page, dpr)
                if shots:
                    await page.evaluate("window.scrollTo(0,0)")
                    await page.wait_for_timeout(300)
                    name = (path.strip("/").replace("/", "_") or "home") + f"_{mode}.png"
                    await page.screenshot(path=os.path.join(outdir, name), full_page=True)
                for href in info["links"]:
                    if href and not href.startswith(("tel:", "mailto:", "#", "http")):
                        all_links.add(href.split("#")[0])
                rec = {
                    "path": path, "mode": mode, "status": resp.status if resp else None,
                    "title": info["title"], "h1": info["h1"], "hscroll": info["sw"] > info["iw"],
                    "sw": info["sw"], "height": info["height"], "broken": info["broken"],
                    "stretched": stretched, "hidden": info["hidden"], "errors": errors,
                    "phrases": phrases, "texts": total, "contrast": low, "robots": info["robots"],
                    "canonical": info["canonical"],
                }
                report["pages"].append(rec)
                bad = (rec["status"] != 200 or len(rec["h1"]) != 1 or rec["hscroll"] or rec["broken"]
                       or rec["stretched"] or rec["hidden"] or rec["errors"] or rec["phrases"] or rec["contrast"])
                print(f"{'❌' if bad else '✓'} {path} {mode} st={rec['status']} h1={len(rec['h1'])} "
                      f"hscroll={rec['hscroll']} broken={len(rec['broken'])} stretch={len(stretched)} "
                      f"hidden={len(rec['hidden'])} js={len(errors)} phrases={phrases} "
                      f"contrast={len(low)}/{total} H={rec['height']}", flush=True)
                await ctx.close()
        await browser.close()
    for link in sorted(all_links):
        u = urljoin(base, link)
        try:
            import ssl
            ctx_ssl = ssl.create_default_context()
            try:
                import certifi
                ctx_ssl.load_verify_locations(certifi.where())
            except Exception:
                pass
            req = urllib.request.Request(u, method="GET", headers={"User-Agent": "audit"})
            code = urllib.request.urlopen(req, timeout=20, context=ctx_ssl).status
        except urllib.error.HTTPError as e:
            code = e.code
        except Exception as e:  # noqa
            code = str(e)
        report["links"][link] = code
    bad_links = {k: v for k, v in report["links"].items() if v != 200}
    print(f"links: {len(report['links'])}, bad: {bad_links}")
    with open(os.path.join(outdir, "report.json"), "w") as f:
        json.dump(report, f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    base = sys.argv[1].rstrip("/") + "/"
    outdir = sys.argv[2]
    paths = None
    shots = "--shots" in sys.argv
    if "--modes" in sys.argv:
        want = sys.argv[sys.argv.index("--modes") + 1].split(",")
        MODES[:] = [m for m in MODES if m[0] in want]
        if not MODES:
            print("--modes: ни одной известной ширины (d1440, t768, m390, m320)"); sys.exit(1)
    if "--paths" in sys.argv:
        paths = sys.argv[sys.argv.index("--paths") + 1].split(",")
    if not paths:
        print("нужен --paths"); sys.exit(1)
    asyncio.run(run(base, outdir, paths, shots))
