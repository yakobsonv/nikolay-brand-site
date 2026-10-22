import type { Photo } from '../../../lib/types';

/* Фото направления. Источники и авторы — photos-manifest/g1.json (служебное на страницу не попадает).
   11.10 по независимой проверке: снят почти дубль светлой кладки (g2). */

export const hero: Photo = {
  src: '/assets/cvetnye-smesi/hero-2000.webp',
  srcSmall: '/assets/cvetnye-smesi/hero-1000.webp',
  alt: 'Стена из красного кирпича разных оттенков со светлым швом',
  width: 2000,
  height: 1333,
};

export const gallery: Photo[] = [
  {
    src: '/assets/cvetnye-smesi/g1-1600.webp',
    srcSmall: '/assets/cvetnye-smesi/g1-800.webp',
    alt: 'Кладка из светлого серо-бежевого кирпича с чёрным швом',
    width: 1600,
    height: 1538,
  },
  {
    src: '/assets/cvetnye-smesi/g3-1600.webp',
    srcSmall: '/assets/cvetnye-smesi/g3-800.webp',
    alt: 'Стена из красного кирпича с тёмным, почти чёрным швом',
    width: 1600,
    height: 1061,
  },
];

export default { hero, gallery };
