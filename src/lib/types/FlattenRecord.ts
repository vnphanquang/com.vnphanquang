import type { IsFlatObject } from './IsFlatObject';
import type { IsObject } from './IsObject';
import type { UnionToIntersection } from './UnionToIntersection';
import type { ValuesOf } from './ValuesOf';

type NonObjectKeysOf<T> = ValuesOf<{
  [K in keyof T]: IsObject<T[K]> extends false ? K : never;
}>;

type NonObjectPropertiesOf<T> = Pick<T, NonObjectKeysOf<T>>;
type ObjectValuesOf<T> = ValuesOf<Omit<T, NonObjectKeysOf<T>>>;

export type FlattenRecord<T> = NonObjectPropertiesOf<T> &
  (IsFlatObject<UnionToIntersection<ObjectValuesOf<T>>> extends true
    ? UnionToIntersection<ObjectValuesOf<T>>
    : FlattenRecord<UnionToIntersection<ObjectValuesOf<T>>>);
