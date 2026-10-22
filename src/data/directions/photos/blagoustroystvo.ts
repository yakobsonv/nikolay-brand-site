import type { Photo } from '../../../lib/types';

/* Фото направления. Источники и авторы — photos-manifest/g3.json (служебное на страницу не попадает). */

export const hero: Photo = {
  src: '/assets/blagoustroystvo/hero-2000.webp',
  srcSmall: '/assets/blagoustroystvo/hero-1000.webp',
  alt: 'Деревянная скамейка и большой бетонный вазон с кустом на площадке из плитки, вдоль газона бордюр',
  width: 2000,
  height: 1333,
  focus: '60% 60%',
};

export const gallery: Photo[] = [
  {
    src: '/assets/blagoustroystvo/g1-1600.webp',
    srcSmall: '/assets/blagoustroystvo/g1-800.webp',
    alt: 'Дорожка из серой плитки между живыми изгородями, по краям бордюрный камень',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/blagoustroystvo/g2-1600.webp',
    srcSmall: '/assets/blagoustroystvo/g2-800.webp',
    alt: 'Две скамейки с деревянными сиденьями, урна и фонарь у цветника в парке',
    width: 1600,
    height: 1200,
  },
  {
    src: '/assets/blagoustroystvo/g3-1600.webp',
    srcSmall: '/assets/blagoustroystvo/g3-800.webp',
    alt: 'Мощение из бежевой и белой брусчатки, круглая площадка в окантовке из гранитных блоков',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/blagoustroystvo/g4-1600.webp',
    srcSmall: '/assets/blagoustroystvo/g4-800.webp',
    alt: 'Сквер, вымощенный плитами, со скамейками вдоль подстриженной живой изгороди',
    width: 1600,
    height: 1200,
  },
];

export default { hero, gallery };
