import { URLSearchParams } from 'url';

export const urlencode = (query: string): string =>
  new URLSearchParams(query).toString();
