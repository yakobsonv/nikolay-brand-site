import type { Photo } from '../../../lib/types';

/* Фото направления. Источники и авторы — photos-manifest/g3.json (служебное на страницу не попадает). */

export const hero: Photo = {
  src: '/assets/tovary-dlya-remonta/hero-2000.webp',
  srcSmall: '/assets/tovary-dlya-remonta/hero-1000.webp',
  alt: 'Раскрытый веер цветовой палитры красок, кисть и валик на деревянном столе',
  width: 2000,
  height: 1333,
  focus: '50% 30%',
};

export const gallery: Photo[] = [
  {
    src: '/assets/tovary-dlya-remonta/g1-1600.webp',
    srcSmall: '/assets/tovary-dlya-remonta/g1-800.webp',
    alt: 'Ручной инструмент на столе: угольник, рулетка, шуруповёрт, шестигранники, пассатижи и разводной ключ',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/tovary-dlya-remonta/g2-1600.webp',
    srcSmall: '/assets/tovary-dlya-remonta/g2-800.webp',
    alt: 'Рука в перчатке надрезает лист гипсокартона ножом вдоль складного метра',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/tovary-dlya-remonta/g3-1600.webp',
    srcSmall: '/assets/tovary-dlya-remonta/g3-800.webp',
    alt: 'Открытые банки с сиреневой, оранжевой, бирюзовой, жёлтой и синей краской',
    width: 1600,
    height: 1067,
  },
];

export default { hero, gallery };
