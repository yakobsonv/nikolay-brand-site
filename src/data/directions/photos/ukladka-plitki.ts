import type { Photo } from '../../../lib/types';

/* Фото направления. Источники и авторы — photos-manifest/g1.json (служебное на страницу не попадает). */

export const hero: Photo = {
  src: '/assets/ukladka-plitki/hero-2000.webp',
  srcSmall: '/assets/ukladka-plitki/hero-1000.webp',
  alt: 'Мастер в рабочей одежде укладывает серую плитку на песчаное основание',
  width: 2000,
  height: 1333,
  focus: '50% 70%',
};

export const gallery: Photo[] = [
  {
    src: '/assets/ukladka-plitki/g1-1600.webp',
    srcSmall: '/assets/ukladka-plitki/g1-800.webp',
    alt: 'Стопки серой плитки на песчаном основании посреди частично уложенного покрытия',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/ukladka-plitki/g2-1600.webp',
    srcSmall: '/assets/ukladka-plitki/g2-800.webp',
    alt: 'Рабочий укладывает тротуарную и жёлтую тактильную плитку на углу тротуара',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/ukladka-plitki/g3-1600.webp',
    srcSmall: '/assets/ukladka-plitki/g3-800.webp',
    alt: 'Подъездная дорожка из серой брусчатки перед одноэтажным домом с гаражом',
    width: 1600,
    height: 1068,
  },
  {
    src: '/assets/ukladka-plitki/g4-1600.webp',
    srcSmall: '/assets/ukladka-plitki/g4-800.webp',
    alt: 'Круглая площадка из брусчатки со скамьями и дорожка из каменных плит в саду',
    width: 1600,
    height: 1067,
  },
];

export default { hero, gallery };
