import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import { Add, Casino, Close } from '@mui/icons-material';
import { LOTTO_LIMIT, TICKET_PRICE } from '../../../config/const.ts';
import { getRandomNumbers } from '../../../utils/functions.ts';
import { useStore } from '../../../config/store.ts';

export const NumberChooser = () => {
  const { player, addTicket } = useStore();

  const [error, setError] = useState<string | null>(null);

  const [newTicketOpen, setNewTicketOpen] = useState(false);

  const [numbers, setNumbers] = useState<number[]>([]);

  const handleClick = (number: number) => {
    if (numbers.includes(number)) {
      setNumbers(numbers.filter((item) => item !== number));
    } else if (numbers.length < 5) {
      setNumbers([...numbers, number].sort((a, b) => a - b));
    }
  };

  return (
    <>
      {error && (
        <Alert
          color="error"
          action={
            <Tooltip title="Close">
              <IconButton
                onClick={() => setError(null)}
                color="error"
                size="small"
              >
                <Close />
              </IconButton>
            </Tooltip>
          }
        >
          {error}
        </Alert>
      )}
      <Collapse in={newTicketOpen}>
        <Stack>
          <Box
            display="grid"
            gridTemplateColumns="repeat(10, 45px)"
            gap={2}
            marginX="auto"
            marginY={2}
          >
            {[...Array(LOTTO_LIMIT).keys()].map((value) => {
              const selected = numbers.includes(value);

              return (
                <IconButton
                  key={value}
                  onClick={() => handleClick(value)}
                  color="primary"
                  sx={(theme) => ({
                    border: '1px solid',
                    background: selected
                      ? theme.palette.primary.main
                      : undefined,
                    color: selected ? 'white' : undefined,
                    '&:hover': {
                      background: selected
                        ? theme.palette.primary.light
                        : undefined,
                    },
                  })}
                >
                  {value + 1}
                </IconButton>
              );
            })}

            <Tooltip title="Random">
              <IconButton
                onClick={() => setNumbers(getRandomNumbers())}
                color="primary"
              >
                <Casino />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Collapse>

      <Stack direction="row" justifyContent="center" gap={4}>
        {newTicketOpen ? (
          <>
            <Button
              onClick={() => {
                if (player.balance > TICKET_PRICE) {
                  addTicket({ numbers, created: new Date(), owner: 'player' });
                  setNumbers([]);
                  setError(null);
                } else {
                  setError('Not enough akçe');
                }
              }}
              disabled={numbers.length < 5}
              variant="contained"
            >
              Ok
            </Button>
            <Button
              onClick={() => {
                setNewTicketOpen(false);
                setNumbers([]);
                setError(null);
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setNewTicketOpen(true)} startIcon={<Add />}>
            ticket
          </Button>
        )}
      </Stack>
    </>
  );
};
