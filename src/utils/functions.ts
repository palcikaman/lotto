import { LOTTO_LIMIT } from '../config/const.ts';

export const getRandomNumbers = () => {
  const numbers: number[] = [];

  while (numbers.length < 5) {
    const number = Math.floor(Math.random() * LOTTO_LIMIT);
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }

  return numbers.sort((a, b) => a - b);
};

export const countNumbersIntersection = (a: number[], b: number[]) => {
  return a.reduce((result, currentValue) => (b.includes(currentValue) ? result + 1 : result), 0);
};
