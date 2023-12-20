import { create } from 'zustand';
import { HitCounts, Ticket } from './types.ts';
import {
  INITIAL_HOUSE_BALANCE,
  INITIAL_PLAYER_BALANCE,
  INITIAL_PLAYER_NAME,
  PRIZE_2_MATCH_PERCENT,
  PRIZE_3_MATCH_PERCENT,
  PRIZE_4_MATCH_PERCENT,
  PRIZE_5_MATCH_PERCENT,
  PRIZE_POOL_RATIO,
  TICKET_PRICE,
} from './const.ts';
import { countNumbersIntersection } from '../utils/functions.ts';

type State = {
  player: {
    name: string;
    balance: number;
  };
  house: {
    balance: number;
  };
  tickets: Ticket[];
  results: {
    winningNumbers: number[];
    hitCounts: { total: HitCounts; player: HitCounts };
    prize: {
      total: number;
      player: number;
      5: number;
      4: number;
      3: number;
      2: number;
    };
  } | null;
};

type Actions = {
  setPlayerName: (name: string) => void;
  setPlayerBalance: (balance: number) => void;
  setHouseBalance: (balance: number) => void;
  addTicket: (ticket: Ticket) => void;
  generateResults: (numbers: number[]) => void;
  newRound: () => void;
  reset: () => void;
};

const getInitialState = (useStorage?: boolean): State => {
  const state = {
    player: {
      name: INITIAL_PLAYER_NAME,
      balance: INITIAL_PLAYER_BALANCE,
    },
    house: {
      balance: INITIAL_HOUSE_BALANCE,
    },
    tickets: [],
    results: null,
  };

  if (useStorage) {
    const playerName = localStorage.getItem('playerName');
    const playerBalance = localStorage.getItem('playerBalance');
    const houseBalance = localStorage.getItem('houseBalance');

    if (playerName !== null) {
      state.player.name = playerName;
    }
    if (playerBalance !== null) {
      state.player.balance = Number(playerBalance);
    }
    if (houseBalance !== null) {
      state.house.balance = Number(houseBalance);
    }
  }

  return state;
};

export const useStore = create<Actions & State>((set, get) => {
  return {
    ...getInitialState(true),
    newRound: () => set(getInitialState(true)),
    reset: () =>
      set(() => {
        localStorage.setItem('playerName', INITIAL_PLAYER_NAME);
        localStorage.setItem('playerBalance', INITIAL_PLAYER_BALANCE.toString());
        localStorage.setItem('houseBalance', INITIAL_HOUSE_BALANCE.toString());
        return getInitialState();
      }),
    setPlayerName: (name) => {
      localStorage.setItem('playerName', name);
      set((state) => ({ ...state, player: { ...state.player, name } }));
    },
    setPlayerBalance: (balance) => {
      localStorage.setItem('playerBalance', balance.toString());
      set((state) => ({ ...state, player: { ...state.player, balance } }));
    },
    setHouseBalance: (balance) => {
      localStorage.setItem('houseBalance', balance.toString());
      set((state) => ({ ...state, house: { ...state.house, balance } }));
    },
    addTicket: (ticket) => {
      get().setHouseBalance(get().house.balance + TICKET_PRICE);
      if (ticket.owner === 'player') {
        get().setPlayerBalance(get().player.balance - TICKET_PRICE);
      }
      set((state) => ({
        ...state,
        tickets: [...state.tickets, ticket],
      }));
    },
    generateResults: (numbers) => {
      const tickets = get().tickets;
      const hitCounts: { total: HitCounts; player: HitCounts } = tickets.reduce(
        (result, ticket) => {
          const isPlayerTicket = ticket.owner === 'player';

          const count = countNumbersIntersection(ticket.numbers, numbers);

          const key = count === 2 || count === 3 || count === 4 || count === 5 ? count : 'losing';

          return {
            total: { ...result.total, [key]: result.total[key] + 1 },
            player: { ...result.player, [key]: result.player[key] + (isPlayerTicket ? 1 : 0) },
          };
        },
        {
          total: { losing: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          player: { losing: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        }
      );

      const prizePool = tickets.length * TICKET_PRICE * (PRIZE_POOL_RATIO / 100);

      const hit5Prize = Math.round(
        (prizePool * (PRIZE_5_MATCH_PERCENT / 100)) / (hitCounts.total['5'] || 1)
      );
      const hit4Prize = Math.round(
        (prizePool * (PRIZE_4_MATCH_PERCENT / 100)) / (hitCounts.total['4'] || 1)
      );
      const hit3Prize = Math.round(
        (prizePool * (PRIZE_3_MATCH_PERCENT / 100)) / (hitCounts.total['3'] || 1)
      );
      const hit2Prize = Math.round(
        (prizePool * (PRIZE_2_MATCH_PERCENT / 100)) / (hitCounts.total['3'] || 1)
      );

      const totalPrize =
        hit5Prize * hitCounts.total[5] +
        hit4Prize * hitCounts.total[4] +
        hit3Prize * hitCounts.total[3] +
        hit2Prize * hitCounts.total[2];

      get().setHouseBalance(get().house.balance - totalPrize);

      const playerPrize =
        hit5Prize * hitCounts.player['5'] +
        hit4Prize * hitCounts.player['4'] +
        hit3Prize * hitCounts.player['3'] +
        hit2Prize * hitCounts.player['2'];

      get().setPlayerBalance(get().player.balance + playerPrize);

      set((state) => {
        return {
          ...state,
          results: {
            winningNumbers: numbers,
            hitCounts,
            prize: {
              total: totalPrize,
              player: playerPrize,
              5: hit5Prize,
              4: hit4Prize,
              3: hit3Prize,
              2: hit2Prize,
            },
          },
        };
      });
    },
  };
});
