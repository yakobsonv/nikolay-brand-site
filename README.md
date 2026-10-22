# nikolay-brand-site — сайт-визитка «Кирпичный трест»

Статический сайт на Astro 6. Превью: https://nikolay-brand-code.vercel.app (noindex). Правила — [CLAUDE.md](CLAUDE.md).

## Запуск

```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # → dist/, 19 страниц
npx astro check    # 0 ошибок
```

## Устройство

| Где | Что |
|---|---|
| `src/lib/sites.ts` | реестр сайта: имя (`BRAND`), телефон, часы, шоу-румы (`SHOWROOMS`), реквизиты, адрес превью. `BRAND` — только знак в шапке; название «Кирпичный трест» ещё вписано в title страниц и тексты (`grep -rn "Кирпичный трест" src`) — менять везде |
| `src/data/home.ts` | тексты главной: баннер, бегущая строка, заголовки колонок плиток, «почему удобно», производители, «кому мы полезны», SEO |
| `src/data/directions/<slug>.ts` | страница направления (10 материалов + 4 услуги), схема — `Direction` в `src/lib/types.ts` |
| `src/data/directions/photos/<slug>.ts` | фото направления: `hero` + `gallery` |
| `src/data/directions/index.ts` | порядок направлений, адреса (`/materialy/<slug>/`, `/uslugi/<slug>/`), типографика `deepTypo` |
| `src/data/legal.ts` | правовые тексты клиента (Положение, Согласие) — дословно |
| `src/components/brand/` | шапка, подвал, логотип (временный знак), плитка, фото, иконки, полоса контактов с картой, шаблон страницы направления |
| `src/pages/` | главная, `materialy/[slug]`, `uslugi/[slug]`, контакты, правовые, 404 |
| `src/styles/tokens.css` | тема `brand`: цвета (контраст посчитан в комментарии), шрифты Manrope 800 + Onest |
| `public/assets/<slug>/` | картинки: `hero-2000/1000.webp`, `gN-1600/800.webp`; `logos/` — знаки заводов; `map/` — статичная карта шоу-румов (Static API Яндекса, склейка: 1280 и 2560 — десктоп, 1680×800 — планшет, 800 — телефон) |
| `photos-manifest/g1..g4.json` | откуда каждый кадр (клиент / Unsplash, автор, что на кадре); `logos.json` — знаки производителей, `map.json` — карта |
| `scripts/static-map.py` | пересборка картинок карты шоу-румов (`python scripts/static-map.py public/assets/map`), если поменяются адреса — координаты в `PT` |
| `scripts/audit.py` | проверка выложенного сайта: код, h1, прокрутка вбок, битые/растянутые картинки, контраст по каждой надписи, служебные фразы, ссылки |

## Выкладка

Проект Vercel `nikolay-brand-code` подключён к репозиторию https://github.com/yakobsonv/nikolay-brand-site (ветка `main`):
пуш в `main` выкладывает превью сам. Порядок после пуша и откат — CLAUDE.md, раздел «Доступ, окружение, выкладка, откат».
Превью *.vercel.app из России открывается через раз — для показа клиенту нужен хостинг, доступный из РФ.

## Проверка

Нужно: Python 3.10+, `pip install playwright pillow`, `python -m playwright install chromium` (лучше в `.venv`).
Все 18 страниц (без 404), около 25 минут:

```bash
python3 scripts/audit.py https://nikolay-brand-code.vercel.app audit-out --paths "/,/kontakty/,/regulation/,/consent/,/materialy/kirpich/,/materialy/zhbi/,/materialy/armatura/,/materialy/sukhie-smesi/,/materialy/cvetnye-smesi/,/materialy/trotuarnaya-plitka/,/materialy/krovlya/,/materialy/plastikovye-okna/,/materialy/blagoustroystvo/,/materialy/tovary-dlya-remonta/,/uslugi/dizayn-proekt/,/uslugi/remont/,/uslugi/stroitelstvo-domov/,/uslugi/ukladka-plitki/"
```

В Git Bash на Windows — с `MSYS_NO_PATHCONV=1` перед командой: иначе MSYS превращает «/» в `--paths` в путь к папке Git, и главная молча не проверяется.
Ширины по умолчанию — 1440, 768, 390, 320 (около 25 минут); часть — `--modes d1440,t768` (имена: `d1440`, `t768`, `m390`, `m320`).

`audit-out/` в git не класть. Пройдено = 0 замечаний, **или** каждое оставшееся срабатывание контраста разобрано
снимком и описано в отчёте (детектор даёт ложные срабатывания — см. «Грабли» в CLAUDE.md). Страницу 404 скриптом
не гонять (он всегда ставит ей ❌: код 404 и ошибка загрузки в консоли — это норма) — проверить руками
несуществующий адрес: код 404 и наша страница. Меню, баннер, лайтбокс и FAQ — проверить кликами (скрипт их не трогает).
Ширины: скрипт снимает 1440 / 768 / 390 / 320; глазами смотреть всё равно.

## Когда появится домен

1. `src/lib/sites.ts`: `domain`, `punycode`, `origin`, убрать `hasLiveDomain: false`.
2. Правовые страницы (`src/pages/regulation.astro`, `consent.astro`): адрес сайта в тексте — с `PREVIEW_ORIGIN` на `liveUrl('brand')`.
3. Снятие noindex (метатег, `vercel.json`, `public/robots.txt`) — только по отдельному решению при запуске.
