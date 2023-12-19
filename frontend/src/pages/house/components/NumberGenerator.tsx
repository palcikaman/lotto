import { Alert, Button, Collapse, IconButton, Stack, TextField, Tooltip } from '@mui/material';
import { getRandomNumbers } from '../../../utils/functions.ts';
import { useState } from 'react';
import { useStore } from '../../../config/store.ts';
import { Add, Close } from '@mui/icons-material';

export const NumberGenerator = () => {
  const { addTicket } = useStore();

  const [newTicketOpen, setNewTicketOpen] = useState(false);

  const [ticketCount, setTicketCount] = useState('');

  const [error, setError] = useState<string | null>(null);

  return (
    <>
      {error && (
        <Alert
          color="error"
          action={
            <Tooltip title="Close">
              <IconButton onClick={() => setError(null)} color="error" size="small">
                <Close />
              </IconButton>
            </Tooltip>
          }
        >
          {error}
        </Alert>
      )}
      <Collapse in={newTicketOpen}>
        <Stack
          component="form"
          onSubmit={(event) => {
            event.preventDefault();

            const max = Number(ticketCount);
            if (max) {
              for (let i = 0; i < max; i++) {
                addTicket({
                  numbers: getRandomNumbers(),
                  created: new Date(),
                  owner: 'unknown',
                });
              }
              setTicketCount('');
              setError(null);
              setNewTicketOpen(false);
            } else {
              setError('Number needed');
            }
          }}
          alignItems="center"
          gap={2}
        >
          <TextField
            label="Ticket count"
            value={ticketCount}
            onChange={(e) => setTicketCount(e.target.value)}
            variant="standard"
          />
          <Stack direction="row" justifyContent="center" gap={2}>
            <Button type="submit">Generate</Button>
            <Button
              onClick={() => {
                setNewTicketOpen(false);
                setTicketCount('');
                setError(null);
              }}
            >
              Close
            </Button>
          </Stack>
        </Stack>
      </Collapse>

      {!newTicketOpen && (
        <Stack alignItems="center">
          <Button onClick={() => setNewTicketOpen(true)} startIcon={<Add />}>
            ticket
          </Button>
        </Stack>
      )}
    </>
  );
};
