import type { Photo } from '../../../lib/types';

/* Фото направления. Источники и авторы — photos-manifest/g1.json (служебное на страницу не попадает). */

export const hero: Photo = {
  src: '/assets/kirpich/hero-2000.webp',
  srcSmall: '/assets/kirpich/hero-1000.webp',
  alt: 'Двухэтажный дом из красного кирпича с белыми карнизами, кирпичные столбы забора и кованые ворота',
  width: 2000,
  height: 1333,
  focus: '50% 40%',
};

export const gallery: Photo[] = [
  {
    src: '/assets/kirpich/g1-1600.webp',
    srcSmall: '/assets/kirpich/g1-800.webp',
    alt: 'Дом из соломенного кирпича с тёмно-коричневыми вставками и арочным окном',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/kirpich/g2-1600.webp',
    srcSmall: '/assets/kirpich/g2-800.webp',
    alt: 'Двухэтажный дом с коричневой кирпичной кладкой и светлым фасадом с балконом среди сосен',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/kirpich/g3-1600.webp',
    srcSmall: '/assets/kirpich/g3-800.webp',
    alt: 'Дом из красного кирпича со светлым обрамлением окон и кирпичным забором с коваными секциями',
    width: 1600,
    height: 1200,
  },
  {
    src: '/assets/kirpich/g4-1600.webp',
    srcSmall: '/assets/kirpich/g4-800.webp',
    alt: 'Загородный дом из светлого кирпича с колоннами и полукруглым балконом, мощёный двор',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/kirpich/g5-1600.webp',
    srcSmall: '/assets/kirpich/g5-800.webp',
    alt: 'Двухэтажный дом из светло-оранжевого кирпича с белым арочным обрамлением окна и полукруглым балконом',
    width: 1600,
    height: 1200,
  },
];

export default { hero, gallery };
