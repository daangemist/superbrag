import formatRelative from 'date-fns/formatRelative'

export const relative = (date: number): string => {
  return formatRelative(date * 1000, new Date());
}
