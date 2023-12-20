import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <Stack alignItems="center" gap={4}>
      <Typography variant="h3">Lottokeeper</Typography>
      <Button component={Link} to="/player" variant="contained">
        play!
      </Button>
    </Stack>
  );
};
