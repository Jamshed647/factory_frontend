// export const formatTwoDecimal = (value: number | string): number => {
//   return Number(Number(value).toFixed(2));
// };

export const formatTwoDecimal = (value: number | string): number => {
  return Number(Number(value || 0).toFixed(2));
};
