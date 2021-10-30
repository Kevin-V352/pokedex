/* eslint-disable camelcase */
import typesStats from '../data/typesOfDetails';
import { Stat } from '../interfaces/pokemonsInterfaces';

export const calculatePercentage = (total: number, value: number): string => `${((value * 100) / total)}%`;

export const calculateMaxAndMinValuesOfStats = (stats: Stat[]) => {
  let total: number = 0;

  const formattedStatistics = stats.map(({ base_stat, stat: { name } }) => {
    // eslint-disable-next-line operator-assignment
    total = total + base_stat;

    return {
      title: typesStats[name],
      value: base_stat,
      maxValue: calculateMaximumStatisticValue(name, base_stat),
      minValue: calculateMinimumStatisticValue(name, base_stat)
    };
  });

  return {
    formattedStatistics,
    total
  };
};

export const calculateMinimumStatisticValue = (name: string, value: number) => {
  if (name === 'hp') return Math.floor((2 * value) + 110);
  return Math.floor(((2 * value) + 5) * 0.9);
};

export const calculateMaximumStatisticValue = (name: string, value: number) => {
  if (name === 'hp') return Math.floor(((2 * value) + 94) + 110);
  return Math.floor((((2 * value) + 94) + 5) * 1.1);
};
