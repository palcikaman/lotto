import { Ticket } from '../config/types.ts';
import { Chip, Divider, Stack, Tooltip, Typography } from '@mui/material';
import { format } from 'date-fns';
import { Casino, Person } from '@mui/icons-material';
import { useStore } from '../config/store.ts';

type TicketListProps = {
  tickets: Ticket[];
};

export const TicketList = ({ tickets }: TicketListProps) => {
  const { winningNumbers } = useStore();

  return (
    <Stack alignItems="center">
      {tickets.map((ticket) => (
        <Stack key={ticket.created.toString()} marginY={2} gap={1} width={250}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>{format(ticket.created, 'Pp')}</Typography>
            {ticket.owner === 'player' ? (
              <Tooltip title="Player">
                <Person color="primary" />
              </Tooltip>
            ) : (
              <Tooltip title="Generated">
                <Casino color="primary" />
              </Tooltip>
            )}
          </Stack>
          <Stack direction="row" justifyContent="space-between" gap={1}>
            {ticket.numbers.map((number) => (
              <Chip
                key={number}
                label={number + 1}
                sx={{ height: 40, width: 40 }}
                color={winningNumbers?.includes(number) ? 'success' : 'primary'}
              />
            ))}
          </Stack>
          <Divider />
        </Stack>
      ))}
    </Stack>
  );
};
