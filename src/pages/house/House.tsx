import { useStore } from '../../config/store.ts';
import { Button, Divider } from '@mui/material';
import { TicketList } from '../../components/TicketList.tsx';
import { HouseHeader } from './components/HouseHeader.tsx';
import { NumberGenerator } from './components/NumberGenerator.tsx';
import { HouseResults } from './components/HouseResults.tsx';
import { useMemo, useState } from 'react';
import { countNumbersIntersection } from '../../utils/functions.ts';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

export const House = () => {
  const { tickets, results } = useStore();

  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC' | null>(null);

  const sortedTickets = useMemo(() => {
    const temp = [...tickets];
    if (results && sortDirection) {
      temp.sort((a, b) => {
        if (a.owner !== b.owner) {
          return a.owner === 'player' ? -1 : 1;
        }
        if (sortDirection) {
          return (
            (countNumbersIntersection(b.numbers, results.winningNumbers) -
              countNumbersIntersection(a.numbers, results.winningNumbers)) *
            (sortDirection === 'ASC' ? -1 : 1)
          );
        }
        return 0;
      });
    } else {
      temp.sort((a) => (a.owner === 'player' ? -1 : 1));
    }
    return temp;
  }, [sortDirection, tickets, results]);

  return (
    <>
      <HouseHeader />
      <Divider />

      {results ? (
        <>
          <HouseResults />
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
        </>
      ) : (
        <NumberGenerator />
      )}

      <TicketList tickets={sortedTickets} showOwner />
    </>
  );
};
