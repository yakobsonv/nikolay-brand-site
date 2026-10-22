import type { Photo } from '../../../lib/types';

/* Фото направления. Источники и авторы — photos-manifest/g4.json (служебное на страницу не попадает). */

export const hero: Photo = {
  src: '/assets/dizayn-proekt/hero-2000.webp',
  srcSmall: '/assets/dizayn-proekt/hero-1000.webp',
  alt: 'Светлая гостиная, объединённая с кухней: диван, два кресла, кухонный остров с барными стульями и деревянная балка под потолком',
  width: 2000,
  height: 1333,
  focus: '50% 65%',
};

export const gallery: Photo[] = [
  {
    src: '/assets/dizayn-proekt/g1-1600.webp',
    srcSmall: '/assets/dizayn-proekt/g1-800.webp',
    alt: 'Блокнот с эскизами мебели, рабочие чертежи интерьера и образцы отделки на столе',
    width: 1600,
    height: 1285,
  },
  {
    src: '/assets/dizayn-proekt/g2-1600.webp',
    srcSmall: '/assets/dizayn-proekt/g2-800.webp',
    alt: 'Каталоги обоев на деревянном столе: рука перелистывает образцы с рисунком пальм',
    width: 1600,
    height: 1114,
  },
  {
    src: '/assets/dizayn-proekt/g3-1600.webp',
    srcSmall: '/assets/dizayn-proekt/g3-800.webp',
    alt: 'Кухня-гостиная с каменным островом, белыми барными стульями и выходом на балкон',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/dizayn-proekt/g4-1600.webp',
    srcSmall: '/assets/dizayn-proekt/g4-800.webp',
    alt: 'Гостиная с рыжим кожаным диваном, серым креслом и комнатными растениями, за ней кухня',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/dizayn-proekt/g5-1600.webp',
    srcSmall: '/assets/dizayn-proekt/g5-800.webp',
    alt: 'Небольшое кафе с жёлтой стеной, светлыми столами и открытыми полками у лестницы',
    width: 1600,
    height: 1067,
  },
];

export default { hero, gallery };
