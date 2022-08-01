/** https://stackoverflow.com/questions/43118692/typescript-filter-out-nulls-from-an-array */
export function nonNullableFilter<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined) return false;
  return true;
}
