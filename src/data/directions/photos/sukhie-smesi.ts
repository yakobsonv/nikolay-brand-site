import type { Photo } from '../../../lib/types';

/* Фото направления. Источники и авторы — photos-manifest/g2.json (служебное на страницу не попадает). */

export const hero: Photo = {
  src: '/assets/sukhie-smesi/hero-2000.webp',
  srcSmall: '/assets/sukhie-smesi/hero-1000.webp',
  alt: 'Совок с сыпучей песчаной смесью над насыпью, оранжевый фон',
  width: 2000,
  height: 1333,
  focus: '55% 45%',
};

export const gallery: Photo[] = [
  {
    src: '/assets/sukhie-smesi/g1-1600.webp',
    srcSmall: '/assets/sukhie-smesi/g1-800.webp',
    alt: 'Кладка бетонных блоков на раствор: мастер подравнивает шов кельмой',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/sukhie-smesi/g2-1600.webp',
    srcSmall: '/assets/sukhie-smesi/g2-800.webp',
    alt: 'Руки мастера со шпателями наносят белую шпаклёвку',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/sukhie-smesi/g3-1600.webp',
    srcSmall: '/assets/sukhie-smesi/g3-800.webp',
    alt: 'Белые мешки на поддонах, уложенные в несколько ярусов',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/sukhie-smesi/g4-1600.webp',
    srcSmall: '/assets/sukhie-smesi/g4-800.webp',
    alt: 'Замешанный раствор в строительном тазу и свежий слой смеси на плитке, рядом шпатель',
    width: 1600,
    height: 1048,
  },
];

export default { hero, gallery };
