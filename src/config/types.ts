export type Ticket = {
  numbers: number[];
  owner: 'player' | 'unknown';
  created: Date;
};

export const HIT_COUNT_KEYS = [5, 4, 3, 2, 'losing'] as const;
export type HitCountKey = (typeof HIT_COUNT_KEYS)[number];
export const HIT_COUNT_TITLES = {
  5: '5 Match',
  4: '4 Match',
  3: '3 Match',
  2: '2 Match',
  losing: '<2 Match',
};

export type HitCounts = {
  [key in HitCountKey]: number;
};
