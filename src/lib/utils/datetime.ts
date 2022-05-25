export const fullDateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' });

export function blogDate(date: Date | string) {
  return fullDateFormat.format(new Date(date));
}
