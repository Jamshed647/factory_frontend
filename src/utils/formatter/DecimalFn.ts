export const formatTwoDecimal = (value: number | string): number => {
  return Number(Number(value).toFixed(2));
};
