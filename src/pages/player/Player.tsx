import { Button, Divider, Stack, Typography } from '@mui/material';
import { NumberChooser } from './components/NumberChooser.tsx';
import { TicketList } from '../../components/TicketList.tsx';
import { PlayerHeader } from './components/PlayerHeader.tsx';
import { useStore } from '../../config/store.ts';
import { NumberList } from '../../components/NumberList.tsx';
import { useMemo, useState } from 'react';
import { countNumbersIntersection } from '../../utils/functions.ts';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Akce } from '../../components/Akce.tsx';

export const Player = () => {
  const { tickets, results } = useStore();

  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC' | null>(null);

  const playerTickets = useMemo(() => {
    const temp = [...tickets.filter((ticket) => ticket.owner === 'player')];
    if (results && sortDirection) {
      temp.sort(
        (a, b) =>
          (countNumbersIntersection(b.numbers, results.winningNumbers) -
            countNumbersIntersection(a.numbers, results.winningNumbers)) *
          (sortDirection === 'ASC' ? -1 : 1)
      );
    } else {
      temp.sort((a, b) => a.created.getTime() - b.created.getTime());
    }
    return temp;
  }, [sortDirection, tickets, results]);

  return (
    <>
      <PlayerHeader />
      <Divider />

      {results ? (
        <Stack margin="auto" alignItems="center" gap={2}>
          <Typography>Winning numbers</Typography>
          <NumberList numbers={results.winningNumbers} />
          <Button
            onClick={() => setSortDirection(sortDirection === 'DESC' ? 'ASC' : 'DESC')}
            startIcon={
              sortDirection ? (
                sortDirection === 'ASC' ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )
              ) : undefined
            }
          >
            Sort
          </Button>
        </Stack>
      ) : (
        <NumberChooser />
      )}
      <TicketList tickets={playerTickets} />
      {results && (
        <Typography>
          Winnings: <Akce value={results?.prize.player} />
        </Typography>
      )}
    </>
  );
};
