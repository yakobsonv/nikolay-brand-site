import type { Photo } from '../../../lib/types';

/* Фото направления. Источники и авторы — photos-manifest/g2.json (служебное на страницу не попадает).
   11.10 по независимой проверке: снят серый кадр площадки со щебнем (g2). */

export const hero: Photo = {
  src: '/assets/zhbi/hero-2000.webp',
  srcSmall: '/assets/zhbi/hero-1000.webp',
  alt: 'Двое рабочих в касках осматривают штабель ребристых железобетонных плит на открытой площадке',
  width: 2000,
  height: 1333,
  focus: '60% 60%',
};

export const gallery: Photo[] = [
  {
    src: '/assets/zhbi/g1-1600.webp',
    srcSmall: '/assets/zhbi/g1-800.webp',
    alt: 'Бетонные блоки со стальными монтажными петлями, сложенные штабелем',
    width: 1600,
    height: 1067,
  },
];

export default { hero, gallery };
