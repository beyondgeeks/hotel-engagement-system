export const sum = (array: number[]) => {
  return array.reduce((partialSum, value) => partialSum + value, 0);
};
