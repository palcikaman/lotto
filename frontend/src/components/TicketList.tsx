import { Ticket } from '../config/types.ts';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { Casino, Person } from '@mui/icons-material';
import { NumberList } from './NumberList.tsx';
import { useStore } from '../config/store.ts';
import { countNumbersIntersection } from '../utils/functions.ts';
import { Akce } from './Akce.tsx';

type TicketListProps = {
  tickets: Ticket[];
  showOwner?: boolean;
};

export const TicketList = ({ tickets, showOwner }: TicketListProps) => {
  const { results } = useStore();

  return (
    !!tickets.length && (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Numbers</TableCell>
              {results && <TableCell align="right">Prize</TableCell>}
              <TableCell align="right">Date</TableCell>
              {showOwner && <TableCell align="right">Owner</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket, index) => {
              const hitCount =
                results && countNumbersIntersection(ticket.numbers, results.winningNumbers);

              const prize =
                (hitCount === 2 || hitCount === 3 || hitCount === 4 || hitCount === 5) &&
                results?.prize[hitCount];

              return (
                // TODO unique ticket id
                <TableRow key={index}>
                  <TableCell>
                    <NumberList numbers={ticket.numbers} />
                  </TableCell>
                  {results && (
                    <TableCell align="right">{prize && <Akce value={prize} />}</TableCell>
                  )}
                  <TableCell align="right">
                    <Typography>{format(ticket.created, 'Pp')}</Typography>
                  </TableCell>
                  {showOwner && (
                    <TableCell align="right">
                      {ticket.owner === 'player' ? (
                        <Tooltip title="Player">
                          <Person color="primary" />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Generated">
                          <Casino color="primary" />
                        </Tooltip>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};
