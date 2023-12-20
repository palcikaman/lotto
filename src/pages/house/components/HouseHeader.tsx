import { Button, Stack, Typography } from '@mui/material';
import { useStore } from '../../../config/store.ts';
import { getRandomNumbers } from '../../../utils/functions.ts';
import { Akce } from '../../../components/Akce.tsx';

export const HouseHeader = () => {
  const { house, results, generateResults, newRound, reset } = useStore();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
        {results ? (
          <Button onClick={() => newRound()} variant="contained">
            new round
          </Button>
        ) : (
          <Button onClick={() => generateResults(getRandomNumbers())} variant="contained">
            draw
          </Button>
        )}
        <Button onClick={() => reset()} color="error">
          new game
        </Button>
      </Stack>
      <Typography>
        Balance: <Akce value={house.balance} />
      </Typography>
    </Stack>
  );
};
