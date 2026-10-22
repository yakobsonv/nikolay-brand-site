import type { Photo } from '../../../lib/types';

/* Фото направления. Источники и авторы — photos-manifest/g3.json (служебное на страницу не попадает). */

export const hero: Photo = {
  src: '/assets/plastikovye-okna/hero-2000.webp',
  srcSmall: '/assets/plastikovye-okna/hero-1000.webp',
  alt: 'Белое пластиковое окно, на подоконнике букет цветов в стеклянной банке, за окном зелёный луг и деревья',
  width: 2000,
  height: 1333,
  focus: '50% 60%',
};

export const gallery: Photo[] = [
  {
    src: '/assets/plastikovye-okna/g1-1600.webp',
    srcSmall: '/assets/plastikovye-okna/g1-800.webp',
    alt: 'Белые пластиковые створки с золотистыми оконными ручками',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/plastikovye-okna/g2-1600.webp',
    srcSmall: '/assets/plastikovye-okna/g2-800.webp',
    alt: 'Светлая гостиная с большим окном в белых рамах и видом на деревья',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/plastikovye-okna/g3-1600.webp',
    srcSmall: '/assets/plastikovye-okna/g3-800.webp',
    alt: 'Солнечный подоконник у пластикового окна: цветы в вазах, суккулент в горшке и чашка',
    width: 1600,
    height: 1060,
  },
  {
    src: '/assets/plastikovye-okna/g4-1600.webp',
    srcSmall: '/assets/plastikovye-okna/g4-800.webp',
    alt: 'Пустая комната с паркетом и большим белым окном с балконной дверью',
    width: 1600,
    height: 1067,
  },
];

export default { hero, gallery };
