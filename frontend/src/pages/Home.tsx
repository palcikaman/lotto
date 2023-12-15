import { useStore } from '../config/store.ts';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { NumberChooser } from './player/components/NumberChooser.tsx';
import { TicketList } from '../components/TicketList.tsx';
import { useState } from 'react';
import { getRandomNumbers } from '../utils/functions.ts';

export const Home = () => {
  const [open, setOpen] = useState(false);
  const [randomNumber, setRandomNumber] = useState('');

  const { player, house, tickets, setPlayerName, addTicket } = useStore();

  return (
    <>
      <TextField
        label="Name"
        value={player.name}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <Typography>{player.balance} Akcse</Typography>
      <Typography>{house.balance} Akcse</Typography>

      <Stack>
        {open ? (
          <NumberChooser
            onSubmit={(numbers) => {
              addTicket({ numbers, created: new Date(), owner: 'player' });
              setOpen(false);
            }}
          />
        ) : (
          <Button onClick={() => setOpen(true)}>New</Button>
        )}
      </Stack>

      <Stack>
        <TextField
          label="Tickets"
          value={randomNumber}
          onChange={(e) => setRandomNumber(e.target.value)}
        />
        <Button
          onClick={() => {
            const max = Number(randomNumber);
            for (let i = 0; i < max; i++) {
              addTicket({
                numbers: getRandomNumbers(),
                created: new Date(),
                owner: 'unknown',
              });
            }
          }}
        >
          Generate
        </Button>
      </Stack>

      <TicketList tickets={tickets} />
    </>
  );
};
