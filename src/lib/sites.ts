/** Реестр сайта-визитки компании Николая — он ОДИН.
 *
 *  Сайт-визитка компании, которая торгует строительными материалами и оказывает
 *  услуги. Цен и каталога на сайте нет.
 *
 *  Имя на сайте — «Кирпичный трест», как юрлицо называется в документах. Другое имя —
 *  меняется ОДНА строка BRAND ниже.
 *
 *  ⚠️ Домена ПОКА НЕТ. Пока его нет, canonical ведёт на адрес превью: обещать поиску
 *  несуществующую страницу хуже, чем не обещать ничего. Когда домен появится —
 *  заполнить domain/punycode/origin и снять hasLiveDomain.
 */

import type { SiteConfig, SiteKey } from './types';

export const SITE_KEYS: SiteKey[] = ['brand'];

/** Адрес превью этого репозитория. */
export const PREVIEW_ORIGIN = 'https://nikolay-brand-code.vercel.app';

export const BRAND = 'Кирпичный трест';

/** Шоу-румы — по контактам действующего сайта ЖКЗ (клиентский текст):
 *  «шоу-рум: пн.-пт. с 10:00 до 18:00 Москва, ул. большая почтовая д.55/59 москва,
 *  научный проезд д.10». Научный, 10 — ещё и юридический адрес ООО. */
export const SHOWROOMS = [
  {
    id: 'nauchnyy',
    title: 'Шоу-рум на Научном проезде',
    street: 'Научный проезд, 10',
    locality: 'Москва',
    hours: 'Пн–Пт: 10:00–18:00',
    geo: { lat: 55.656402, lng: 37.553388 },
  },
  {
    id: 'pochtovaya',
    title: 'Шоу-рум на Большой Почтовой',
    street: 'ул. Большая Почтовая, 55/59',
    locality: 'Москва',
    hours: 'Пн–Пт: 10:00–18:00',
    geo: { lat: 55.778755, lng: 37.696606 },
  },
] as const;

export const SITES: Record<SiteKey, SiteConfig> = {
  brand: {
    key: 'brand',
    brand: BRAND,
    domain: 'nikolay-brand-code.vercel.app',
    punycode: 'nikolay-brand-code.vercel.app',
    origin: PREVIEW_ORIGIN,
    hasLiveDomain: false,
    base: '',
    // Номер — тот же, что на сайтах Оскола, Стелларда и RECKE (основной номер компании).
    phone: { display: '+7 (495) 669-32-00', href: 'tel:+74956693200' },
    // Часы звонков — как у этого номера на сайте Оскола (пн–пт 9–18); у шоу-румов свои — 10–18.
    hours: 'Звонки пн–пт 9:00–18:00',
    // Наименование — как в юридических документах клиента: «Кирпичный трест» со строчной «т».
    legal: { name: 'ООО «Кирпичный трест»', inn: '7727756057', ogrn: '1117746587727', postalCode: '117246' },
    address: { street: 'Научный проезд, 10', locality: 'Москва', country: 'RU' },
    geo: { lat: 55.656402, lng: 37.553388 },
    orgDescription:
      'Строительные материалы и услуги в Москве и области: облицовочный кирпич, железобетонные изделия, арматура, сухие и цветные кладочные смеси, тротуарная плитка, кровля, окна, товары для благоустройства и ремонта; дизайн-проекты, ремонт, строительство домов, укладка плитки.',
    // Название ООО на виду не ставим — только ИНН; наименование — в правовых документах.
    legalLine: '© {year} · ИНН 7727756057',
    metrikaId: '',
    // Telegram на сайт не ставится.
    sameAs: [],
    ogImage: '/assets/og/og-brand.jpg',
  },
};

export function getSite(key: SiteKey): SiteConfig {
  const site = SITES[key];
  if (!site) throw new Error(`Неизвестный сайт: ${key}`);
  return site;
}

/** Локальный путь страницы: ('brand', 'materialy/kirpich') → '/materialy/kirpich/'. */
export function localPath(key: SiteKey, slug = ''): string {
  const base = getSite(key).base;
  const clean = slug.replace(/^\/+|\/+$/g, '');
  return clean ? `${base}/${clean}/` : `${base}/`;
}

/** Адрес страницы для canonical и og:url. Домена нет — ведём на превью. */
export function liveUrl(key: SiteKey, slug = ''): string {
  const site = getSite(key);
  const clean = slug.replace(/^\/+|\/+$/g, '');
  if (site.hasLiveDomain === false) {
    const base = `${PREVIEW_ORIGIN}${site.base}`;
    return clean ? `${base}/${clean}/` : `${base}/`;
  }
  return clean ? `${site.origin}/${clean}/` : `${site.origin}/`;
}
