import type { Photo } from '../../../lib/types';

/* Фото направления. Источники и авторы — photos-manifest/g4.json (служебное на страницу не попадает).
   11.10 по независимой проверке: снят кадр с неряшливой кладкой (раствор на лицевой стороне кирпича) — противоречил советам страницы о чистом шве. */

export const hero: Photo = {
  src: '/assets/stroitelstvo-domov/hero-2000.webp',
  srcSmall: '/assets/stroitelstvo-domov/hero-1000.webp',
  alt: 'Строящийся кирпичный дом в лесах: стены выложены, над ними деревянные стропила крыши',
  width: 2000,
  height: 1334,
  focus: '50% 55%',
};

export const gallery: Photo[] = [
  {
    src: '/assets/stroitelstvo-domov/g2-1600.webp',
    srcSmall: '/assets/stroitelstvo-domov/g2-800.webp',
    alt: 'Двухэтажный кирпичный дом на стадии стен и кровли, перед ним куча песка',
    width: 1600,
    height: 1204,
  },
  {
    src: '/assets/stroitelstvo-domov/g3-1600.webp',
    srcSmall: '/assets/stroitelstvo-domov/g3-800.webp',
    alt: 'Кирпичный дом с красной входной дверью, подстриженными кустами и газоном',
    width: 1600,
    height: 1060,
  },
  {
    src: '/assets/stroitelstvo-domov/g4-1600.webp',
    srcSmall: '/assets/stroitelstvo-domov/g4-800.webp',
    alt: 'Новый двухэтажный дом из красного кирпича под голубым небом',
    width: 1600,
    height: 1185,
  },
];

export default { hero, gallery };
