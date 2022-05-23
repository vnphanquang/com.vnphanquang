export type IsObject<T> = T extends Array<any>
  ? false
  : T extends object
  ? true
  : false;
