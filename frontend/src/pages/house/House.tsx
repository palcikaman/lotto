import { useStore } from '../../config/store.ts';
import { Divider } from '@mui/material';
import { TicketList } from '../../components/TicketList.tsx';
import { HouseHeader } from './components/HouseHeader.tsx';
import { NumberGenerator } from './components/NumberGenerator.tsx';

export const House = () => {
  const { tickets } = useStore();

  return (
    <>
      <HouseHeader />
      <Divider />

      <NumberGenerator />

      <TicketList
        tickets={[...tickets].sort((a) => (a.owner === 'player' ? -1 : 1))}
      />
    </>
  );
};
