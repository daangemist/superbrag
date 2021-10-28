import formatISO from 'date-fns/formatISO';

export const date = (date: number): string => {
  return formatISO(date * 1000);
};
