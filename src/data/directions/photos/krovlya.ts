import type { Photo } from '../../../lib/types';

/* Фото направления. Источники и авторы — photos-manifest/g2.json (служебное на страницу не попадает). */

export const hero: Photo = {
  src: '/assets/krovlya/hero-2000.webp',
  srcSmall: '/assets/krovlya/hero-1000.webp',
  alt: 'Скат крыши из красной черепицы и кирпичная труба на фоне голубого неба',
  width: 2000,
  height: 1529,
  focus: '50% 45%',
};

export const gallery: Photo[] = [
  {
    src: '/assets/krovlya/g1-1600.webp',
    srcSmall: '/assets/krovlya/g1-800.webp',
    alt: 'Крыша из оранжевой черепицы со слуховыми окнами в бирюзовых рамах',
    width: 1600,
    height: 1061,
  },
  {
    src: '/assets/krovlya/g2-1600.webp',
    srcSmall: '/assets/krovlya/g2-800.webp',
    alt: 'Белый дом с зелёной фальцевой металлической кровлей',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/krovlya/g3-1600.webp',
    srcSmall: '/assets/krovlya/g3-800.webp',
    alt: 'Кровельщик со страховкой работает на крыше из гибкой черепицы',
    width: 1600,
    height: 1067,
  },
  {
    src: '/assets/krovlya/g4-1600.webp',
    srcSmall: '/assets/krovlya/g4-800.webp',
    alt: 'Красный профлист рядом с черепичной кровлей',
    width: 1600,
    height: 1200,
  },
];

export default { hero, gallery };
