import type { Photo } from '../../../lib/types';

/* Фото направления. Источники и авторы — photos-manifest/g2.json (служебное на страницу не попадает). */

export const hero: Photo = {
  src: '/assets/armatura/hero-2000.webp',
  srcSmall: '/assets/armatura/hero-1000.webp',
  alt: 'Рифлёные арматурные прутки в штабеле, освещённые солнцем',
  width: 2000,
  height: 1124,
};

export const gallery: Photo[] = [
  {
    src: '/assets/armatura/g1-1600.webp',
    srcSmall: '/assets/armatura/g1-800.webp',
    alt: 'Связки арматуры на стройплощадке, рядом рабочие в касках и стрела крана',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/armatura/g2-1600.webp',
    srcSmall: '/assets/armatura/g2-800.webp',
    alt: 'Арматурный каркас колонны снизу на фоне светлого неба',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/armatura/g3-1600.webp',
    srcSmall: '/assets/armatura/g3-800.webp',
    alt: 'Рабочий в сигнальном жилете вяжет арматурную сетку стены у опалубки',
    width: 1600,
    height: 1067,
  },
];

export default { hero, gallery };
