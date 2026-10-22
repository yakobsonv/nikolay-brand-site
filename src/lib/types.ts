/** Общие типы данных сайта-визитки.
 *  Контент лежит в данных (src/data), вёрстка их только показывает. */

/** Один сайт — визитка компании Николая. */
export type SiteKey = 'brand';

/** Цена. value — строкой ровно как на боевом сайте («32,40»), либо числом.
 *  Округлять и пересчитывать запрещено: переносим дословно. */
export interface Price {
  /** «32,40» или 32.4 */
  value: string | number;
  /** «₽» по умолчанию */
  currency?: string;
  /** подпись под ценой: «Цена за 1 шт», «₽/м²» */
  unit?: string;
  /** «от» перед ценой */
  prefix?: string;
  /** откуда взято: сайт / прайс / подтверждено клиентом */
  source?: 'site' | 'pricelist' | 'confirmed' | 'unconfirmed';
  /** сноска: расхождение, «под заказ» и т.п. */
  note?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  /** выпадающий список (мега-меню Стелларда) */
  children?: NavItem[];
  /** пометка «текущая страница» */
  current?: boolean;
}

export interface ImageItem {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface Badge {
  text: string;
  /** hit — «ХИТ ПРОДАЖ», new — «НОВИНКА», top — «ТОП-3» */
  tone?: 'hit' | 'new' | 'top';
}

export interface Product {
  id?: string;
  title: string;
  /** производитель: «ООО "ОСМиБТ", г. Старый Оскол» */
  subtitle?: string;
  image?: string;
  alt?: string;
  price?: Price;
  badge?: Badge;
  /** текст кнопки карточки */
  ctaLabel?: string;
  /** ссылка на страницу позиции */
  href?: string;
  /** id модального окна с формой (вместо ссылки) */
  modalId?: string;
  /** характеристики для страницы/модалки */
  specs?: SpecRow[];
  note?: string;
}

export interface SpecRow {
  label: string;
  value: string;
  unit?: string;
  note?: string;
}

export interface FaqItem {
  q: string;
  /** ответ: HTML или простой текст */
  a: string;
  /** показывать в коротком блоке на других страницах */
  top?: boolean;
}

export interface ColorItem {
  id?: string;
  name: string;
  image: string;
  alt?: string;
  /** ссылка на страницу цвета (свотчи Оскола кликабельны) */
  href?: string;
  /** «образец снят на брусчатке» и т.п. */
  note?: string;
}

export interface ColorGroup {
  id?: string;
  title: string;
  subtitle?: string;
  /** ограничение коллекции: «только 60 мм» */
  restriction?: string;
  colors: ColorItem[];
}

export interface Advantage {
  title?: string;
  text?: string;
  /** число-счётчик для варианта stats: «19+», «1200+» */
  value?: string;
  icon?: string;
  image?: string;
  alt?: string;
}

export interface RelatedItem {
  href: string;
  label: string;
  note?: string;
  image?: string;
  alt?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** Поле лид-формы. Больше типов не нужно: на боевых везде имя + телефон. */
export interface FieldDef {
  name: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'tel' | 'email' | 'textarea' | 'select';
  required?: boolean;
  options?: string[];
  autocomplete?: string;
}

/** Строка прайса для PriceTable в режиме list */
export interface PriceRow {
  title: string;
  price?: Price;
  note?: string;
}

/** Конфигурация сайта (см. src/lib/sites.ts) */
export interface SiteConfig {
  key: SiteKey;
  /** название бренда, оно же name в микроразметке */
  brand: string;
  /** домен кириллицей — для показа людям */
  domain: string;
  /** домен в punycode — для canonical и og:url */
  punycode: string;
  /** боевой origin: https://<punycode>. У новых проектов домена ещё нет — см. hasLiveDomain */
  origin: string;
  /** false — боевого домена не существует: canonical ведём на превью, а не на выдуманный адрес */
  hasLiveDomain?: boolean;
  /** префикс адресов сайта в репозитории ('' — сайт в корне) */
  base: string;
  phone: { display: string; href: string };
  /** дополнительные телефоны, если есть */
  phonesExtra?: { display: string; href: string }[];
  hours: string;
  /** описание организации для JSON-LD */
  orgDescription: string;
  legal: { name: string; inn: string; ogrn?: string; postalCode?: string };
  /** готовая строка прав в подвале; {year} подставляется. Не задана — собирается из legal */
  legalLine?: string;
  address: { street: string; locality: string; country: string };
  geo: { lat: number; lng: number };
  /** id счётчика Метрики (пока пусто — счётчик выключен) */
  metrikaId: string;
  sameAs: string[];
  /** картинка по умолчанию для og:image */
  ogImage?: string;
  logo?: { src?: string; srcOnDark?: string; text?: string; alt?: string };
}

/* ===================== ВИЗИТКА: направления ===================== */

/** Фото на странице. Файлы лежат в public/assets/<slug>/; ширина исходника ≥ показанной на 1440@1.
 *  Происхождение каждого кадра записано в photos-manifest.json в корне репозитория
 *  (НЕ в данных страницы — служебное на страницу не попадает). */
export interface Photo {
  /** путь к большой версии, например /assets/kirpich/hero-2000.webp */
  src: string;
  /** путь к уменьшенной версии (≈1000 px по ширине) для плиток и телефона */
  srcSmall?: string;
  alt: string;
  width: number;
  height: number;
  /** точка фокуса для object-position, например '50% 40%' */
  focus?: string;
}

export type DirectionKind = 'material' | 'service';

/** Направление компании: материал или услуга. Одна страница — один объект.
 *  ⚠️ Никаких служебных полей (источники, пометки «уточнить», «по данным клиента»):
 *  всё, что лежит в этом объекте, может оказаться на странице. */
export interface Direction {
  slug: string;
  kind: DirectionKind;
  /** короткое имя: плитка на главной, меню, хлебные крошки — «Облицовочный кирпич» */
  name: string;
  /** H1 страницы */
  title: string;
  /** подпись в плитке на главной, до 70 знаков */
  tagline: string;
  seo: { title: string; description: string };
  /** абзац под H1, до 240 знаков */
  lead: string;
  hero: Photo;
  /** главный блок: «Что поставляем» / «Что входит в работу» */
  offer: { heading: string; intro?: string; items: { title: string; text: string }[] };
  /** развёрнутый текст: 2–3 абзаца */
  about?: { heading: string; paragraphs: string[] };
  /** где применяется / в каких случаях нужно */
  uses?: { heading: string; items: string[] };
  /** производители — ТОЛЬКО подтверждённые материалами клиента */
  producers?: { name: string; note?: string; logo?: string }[];
  /** как работаем — шаги (у услуг обязательно) */
  steps?: { heading: string; items: { title: string; text: string }[] };
  /** кому полезно */
  audience?: string[];
  gallery?: Photo[];
  /** витрины компании с ценами (живые сайты) */
  shops?: { label: string; href: string; note?: string }[];
  faq?: { q: string; a: string }[];
  /** slug-и соседних направлений, 3–4 штуки */
  related: string[];
}
