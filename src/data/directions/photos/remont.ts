import type { Photo } from '../../../lib/types';

/* Фото направления. Источники и авторы — photos-manifest/g4.json (служебное на страницу не попадает).
   11.10 по независимой проверке: первым экраном — яркий кадр с жёлтой стеной; прежний (кухня под плёнкой, размыто) снят как беспорядок. */

export const hero: Photo = {
  src: '/assets/remont/g1-1600.webp',
  srcSmall: '/assets/remont/g1-800.webp',
  alt: 'Маляр в красном комбинезоне красит стену валиком в жёлтый цвет',
  width: 1600,
  height: 1068,

};

export const gallery: Photo[] = [
  {
    src: '/assets/remont/g2-1600.webp',
    srcSmall: '/assets/remont/g2-800.webp',
    alt: 'Рука разглаживает на стене обои с крупными цветами',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/remont/g3-1600.webp',
    srcSmall: '/assets/remont/g3-800.webp',
    alt: 'Валик наносит голубую краску на белую стену',
    width: 1600,
    height: 1117,
  },
  {
    src: '/assets/remont/g4-1600.webp',
    srcSmall: '/assets/remont/g4-800.webp',
    alt: 'Мастер в рабочих перчатках размечает складным метром лист гипсокартона',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/remont/g5-1600.webp',
    srcSmall: '/assets/remont/g5-800.webp',
    alt: 'Дрель на плиточном полу рядом с собранными деревянными шкафами, вид сверху',
    width: 1600,
    height: 1067,
  },
];

export default { hero, gallery };
