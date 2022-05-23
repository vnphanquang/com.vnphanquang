// https://flut1.medium.com/deep-flatten-typescript-types-with-finite-recursion-cb79233d93ca
// https://twitter.com/mpocock1/status/1526162474084737024

import type { IsFlatObject } from './IsFlatObject';
import type { IsObject } from './IsObject';
import type { UnionToIntersection } from './UnionToIntersection';
import type { ValuesOf } from './ValuesOf';

type NonObjectKeysOf<T> = {
  [K in keyof T]: IsObject<T[K]> extends false ? K : never
}[keyof T];

type NonObjectPropertiesOf<T> = Pick<T, NonObjectKeysOf<T>>;
type ObjectValuesOf<T> = ValuesOf<Omit<T, NonObjectKeysOf<T>>>;

export type FlattenRecord<T> = NonObjectPropertiesOf<T> & (
  IsFlatObject<UnionToIntersection<ObjectValuesOf<T>>> extends true ? UnionToIntersection<ObjectValuesOf<T>> : FlattenRecord<UnionToIntersection<ObjectValuesOf<T>>>
);
