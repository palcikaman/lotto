import { Chip, Divider, Stack, Typography } from '@mui/material';
import { NumberChooser } from './components/NumberChooser.tsx';
import { TicketList } from '../../components/TicketList.tsx';
import { PlayerHeader } from './components/PlayerHeader.tsx';
import { useStore } from '../../config/store.ts';

export const Player = () => {
  const { tickets, winningNumbers } = useStore();

  return (
    <>
      <PlayerHeader />
      <Divider />

      {winningNumbers ? (
        <Stack margin="auto" alignItems="center">
          <Typography>Winning numbers</Typography>
          <Stack direction="row" gap={1}>
            {winningNumbers.map((number) => (
              <Chip
                key={number}
                label={number + 1}
                sx={{ height: 40, width: 40 }}
                color="primary"
              />
            ))}
          </Stack>
        </Stack>
      ) : (
        <NumberChooser />
      )}

      <TicketList
        tickets={tickets.filter((ticket) => ticket.owner === 'player')}
      />
    </>
  );
};
