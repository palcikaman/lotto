import { Button, Chip, Stack, Typography } from '@mui/material';
import { useStore } from '../../../config/store.ts';
import { getRandomNumbers } from '../../../utils/functions.ts';

export const HouseHeader = () => {
  const { house, winningNumbers, setWinningNumbers } = useStore();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      {winningNumbers ? (
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
      ) : (
        <Button onClick={() => setWinningNumbers(getRandomNumbers())}>
          start
        </Button>
      )}
      <Typography>
        Balance: <strong>{house.balance}</strong> akçe
      </Typography>
    </Stack>
  );
};
