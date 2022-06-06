import type { IsObject } from './IsObject';
import type { ValuesOf } from './ValuesOf';

type ObjectPropertiesFlatMapping<T> = {
  [K in keyof T]: IsObject<T[K]> extends true ? 'Object' : 'NonObject';
};
export type IsFlatObject<T> = ValuesOf<ObjectPropertiesFlatMapping<T>> extends 'NonObject'
  ? true
  : false;
