/* eslint-disable @typescript-eslint/no-explicit-any */
export type IsObject<T> = T extends Array<any> ? false : T extends object ? true : false;
