/** Направления компании — порядок как в требованиях клиента: 10 материалов
 *  (кирпич, ЖБИ, арматура, сухие и цветные смеси, тротуарная плитка, кровля, окна,
 *  благоустройство, товары для ремонта) и 4 услуги (дизайн-проект, ремонт,
 *  строительство домов, укладка плитки). */
import type { Direction } from '../../lib/types';
import { deepTypo } from '../../lib/format';

import kirpich from './kirpich';
import zhbi from './zhbi';
import armatura from './armatura';
import sukhieSmesi from './sukhie-smesi';
import cvetnyeSmesi from './cvetnye-smesi';
import trotuarnayaPlitka from './trotuarnaya-plitka';
import krovlya from './krovlya';
import plastikovyeOkna from './plastikovye-okna';
import blagoustroystvo from './blagoustroystvo';
import tovaryDlyaRemonta from './tovary-dlya-remonta';

import dizaynProekt from './dizayn-proekt';
import remont from './remont';
import stroitelstvoDomov from './stroitelstvo-domov';
import ukladkaPlitki from './ukladka-plitki';

// Тексты проходят экранную типографику (неразрывные пробелы и дефисы) — см. typo() в lib/format.ts
export const MATERIALS: Direction[] = [
  kirpich, zhbi, armatura, sukhieSmesi, cvetnyeSmesi,
  trotuarnayaPlitka, krovlya, plastikovyeOkna, blagoustroystvo, tovaryDlyaRemonta,
].map((d) => deepTypo(d));

export const SERVICES: Direction[] = [dizaynProekt, remont, stroitelstvoDomov, ukladkaPlitki].map((d) => deepTypo(d));

export const DIRECTIONS: Direction[] = [...MATERIALS, ...SERVICES];

/** Адрес страницы направления: материалы — /materialy/<slug>/, услуги — /uslugi/<slug>/. */
export function directionPath(d: Pick<Direction, 'kind' | 'slug'>): string {
  return d.kind === 'material' ? `/materialy/${d.slug}/` : `/uslugi/${d.slug}/`;
}

export function getDirection(slug: string): Direction {
  const d = DIRECTIONS.find((x) => x.slug === slug);
  if (!d) throw new Error(`Нет направления: ${slug}`);
  return d;
}
