#!/usr/bin/env python3
"""Статичная карта шоу-румов для ContactsBand (public/assets/map/*.webp) — без ключа и без рекламы.

Static API Яндекса 1.x (static-maps.yandex.ru/1.x) работает без ключа, но отдаёт не больше 650×450.
Нужная картинка склеивается из нескольких кадров с перекрытием: сдвиг центра считается в проекции
Яндекса (EPSG:3395), кадры совпадают попиксельно — расходится только знак «© Яндекс / Яндекс Карты»
в правом нижнем углу каждого кадра. Знаки промежуточных кадров перекрываются соседними; в итоге остаётся
один знак — в правом нижнем углу, с отступом INSET px (иначе его срезает скругление рамки на сайте).

Метки — по координатам SHOWROOMS из src/lib/sites.ts (поменялись адреса — поправить PT ниже и пересобрать).
scale=2 у API — не «ретина», а крупнее надписи на той же площади: z=10 при scale=2 на 800 px = z=10 на 400 px @2x.

usage: static-map.py <outdir>
"""
import io
import math
import os
import sys
import urllib.request

from PIL import Image

PT = '37.553388,55.656402,pm2rdl1~37.696606,55.778755,pm2rdl2'
# имя файла: (z, scale, ширина, высота, центр lon, центр lat, отступ знака Яндекса)
VARIANTS = {
    'showrooms-1280.webp': (11, 1, 1280, 500, 37.625, 55.724, 12),       # десктоп @1x
    'showrooms-2560.webp': (11, 2, 2560, 1000, 37.625, 55.724, 24),      # десктоп @2x
    'showrooms-1680x800.webp': (10, 2, 1680, 800, 37.625, 55.721, 28),   # 600–899 px, @2x
    'showrooms-800.webp': (10, 2, 800, 800, 37.625, 55.721, 32),         # телефон, @2x
}
E = 0.0818191908426  # эксцентриситет WGS84


def lat2y(lat):
    phi = math.radians(lat)
    return math.log(math.tan(math.pi / 4 + phi / 2) * ((1 - E * math.sin(phi)) / (1 + E * math.sin(phi))) ** (E / 2))


def y2lat(y):
    phi = 2 * math.atan(math.exp(y)) - math.pi / 2
    for _ in range(10):
        phi = 2 * math.atan(math.exp(y) * ((1 + E * math.sin(phi)) / (1 - E * math.sin(phi))) ** (E / 2)) - math.pi / 2
    return math.degrees(phi)


def shifted(lon, lat, z, s, dx, dy):
    k = 256 * 2 ** z * s / (2 * math.pi)  # пикселей на радиан
    return lon + math.degrees(dx / k), y2lat(lat2y(lat) - dy / k)


def fetch(lon, lat, z, s, w, h):
    url = (f'https://static-maps.yandex.ru/1.x/?ll={lon:.6f},{lat:.6f}&z={z}&l=map&size={w},{h}&lang=ru_RU'
           + (f'&scale={s}' if s != 1 else '') + f'&pt={PT}')
    return Image.open(io.BytesIO(urllib.request.urlopen(url, timeout=30).read())).convert('RGB')


def starts(total, t, ov):
    if total <= t:
        return [0]
    n = math.ceil((total - t) / (t - ov)) + 1
    step = (total - t) / (n - 1)
    return [round(i * step) for i in range(n)]


def build(z, s, W, H, lon, lat, inset):
    TW, TH = min(650, W), min(450, H)
    ovx, ovy = (320, 50) if s > 1 else (180, 30)  # перекрытие больше знака Яндекса

    def tile(tx, ty):
        l, la = shifted(lon, lat, z, s, tx + TW / 2 - W / 2, ty + TH / 2 - H / 2)
        return fetch(l, la, z, s, TW, TH)

    canvas = Image.new('RGB', (W, H))
    for ty in starts(H, TH, ovy):
        for tx in starts(W, TW, ovx):
            canvas.paste(tile(tx, ty), (tx, ty))
    # угол без знака: кадр сдвинут вниз, его знак уходит за край
    canvas.paste(tile(W - TW, H - TH + ovy), (W - TW, H - TH + ovy))
    # последний кадр со знаком — с отступом от угла
    canvas.paste(tile(W - TW - inset, H - TH - inset), (W - TW - inset, H - TH - inset))
    return canvas


if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else 'public/assets/map'
    os.makedirs(out, exist_ok=True)
    for name, (z, s, W, H, lon, lat, inset) in VARIANTS.items():
        build(z, s, W, H, lon, lat, inset).save(os.path.join(out, name), quality=82, method=6)
        print(name, W, H)
