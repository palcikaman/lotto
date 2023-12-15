import { create } from 'zustand';
import { Ticket } from './types.ts';

type State = {
  player: {
    name: string;
    balance: number;
  };
  house: {
    balance: number;
  };
  tickets: Ticket[];
  winningNumbers: number[] | null;
};

type Actions = {
  setPlayerName: (name: string) => void;
  setPlayerBalance: (balance: number) => void;
  setHouseBalance: (balance: number) => void;
  addTicket: (ticket: Ticket) => void;
  setWinningNumbers: (numbers: number[] | null) => void;
};

const getInitialState = () => {
  const playerName = localStorage.getItem('playerName') || 'Player';
  const playerBalance = localStorage.getItem('playerBalance');
  const houseBalance = localStorage.getItem('houseBalance');

  return {
    player: {
      name: playerName,
      balance: playerBalance !== null ? Number(playerBalance) : 10000,
    },
    house: {
      balance: houseBalance !== null ? Number(houseBalance) : 0,
    },
    tickets: [],
    winningNumbers: null,
  };
};

export const useStore = create<Actions & State>((set, get) => {
  return {
    ...getInitialState(),
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
      set((state) => ({
        ...state,
        tickets: [...state.tickets, ticket],
      }));
      get().setHouseBalance(get().house.balance + 500);
      if (ticket.owner === 'player') {
        get().setPlayerBalance(get().player.balance - 500);
      }
    },
    setWinningNumbers: (numbers) =>
      set((state) => ({ ...state, winningNumbers: numbers })),
  };
});
