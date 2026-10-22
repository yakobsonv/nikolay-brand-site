import type { Photo } from '../../../lib/types';

/* Фото направления. Источники и авторы — photos-manifest/g1.json (служебное на страницу не попадает).
   11.10 по независимой проверке: первым экраном — дорожка из плитки (в прежнем кадре больше газона и деревьев, он ушёл в галерею); снят кадр с пальмами (g5). */

export const hero: Photo = {
  src: '/assets/trotuarnaya-plitka/g1-1600.webp',
  srcSmall: '/assets/trotuarnaya-plitka/g1-800.webp',
  alt: 'Изогнутая дорожка из серо-бежевой плитки, уложенной дугами',
  width: 1600,
  height: 1067,

};

export const gallery: Photo[] = [
  {
    src: '/assets/trotuarnaya-plitka/hero-2000.webp',
    srcSmall: '/assets/trotuarnaya-plitka/hero-1000.webp',
    alt: 'Широкая аллея из красной брусчатки, уложенной ёлочкой, между зелёными газонами',
    width: 2000,
    height: 1333,
  },
  {
    src: '/assets/trotuarnaya-plitka/g2-1600.webp',
    srcSmall: '/assets/trotuarnaya-plitka/g2-800.webp',
    alt: 'Парковая дорожка из плитки с полосами другого цвета по краям и скамейка под деревьями',
    width: 1600,
    height: 1038,
  },
  {
    src: '/assets/trotuarnaya-plitka/g3-1600.webp',
    srcSmall: '/assets/trotuarnaya-plitka/g3-800.webp',
    alt: 'Круглая площадка из тёмной брусчатки в обрамлении гранитных столбиков и зелени',
    width: 1600,
    height: 1200,
  },
  {
    src: '/assets/trotuarnaya-plitka/g4-1600.webp',
    srcSmall: '/assets/trotuarnaya-plitka/g4-800.webp',
    alt: 'Мощение из камней разного размера в красных и жёлтых тонах, вид сверху',
    width: 1600,
    height: 721,
  },
];

export default { hero, gallery };
