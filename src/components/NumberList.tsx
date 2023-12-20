import { Chip, Stack } from '@mui/material';
import { useStore } from '../config/store.ts';

type NumberListProps = {
  numbers: number[];
};

export const NumberList = ({ numbers }: NumberListProps) => {
  const { results } = useStore();

  return (
    <Stack direction="row" gap={1}>
      {numbers.map((number) => (
        <Chip
          key={number}
          label={number + 1}
          sx={{ height: 40, width: 40 }}
          color={results?.winningNumbers.includes(number) ? 'success' : 'primary'}
        />
      ))}
    </Stack>
  );
};
