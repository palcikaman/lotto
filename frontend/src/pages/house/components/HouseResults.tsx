import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { NumberList } from '../../../components/NumberList.tsx';
import { useStore } from '../../../config/store.ts';
import { HIT_COUNT_KEYS, HIT_COUNT_TITLES } from '../../../config/types.ts';
import { Akce } from '../../../components/Akce.tsx';
import { TICKET_PRICE } from '../../../config/const.ts';

export const HouseResults = () => {
  const { results, tickets } = useStore();

  return (
    results && (
      <Stack margin="auto" alignItems="center" gap={2}>
        <Typography>Winning numbers</Typography>
        <NumberList numbers={results.winningNumbers} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Numbers</TableCell>
                <TableCell align="right">Tickets</TableCell>
                <TableCell align="right">Prize</TableCell>
                <TableCell align="right">Total payment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {HIT_COUNT_KEYS.map((key) => (
                <TableRow key={key}>
                  <TableCell>{HIT_COUNT_TITLES[key]}</TableCell>
                  <TableCell align="right">{results.hitCounts.total[key]}</TableCell>
                  <TableCell align="right">
                    <Akce value={key !== 'losing' ? results.prize[key] : 0} />
                  </TableCell>
                  <TableCell align="right">
                    <Akce
                      value={
                        results.hitCounts.total[key] * (key !== 'losing' ? results.prize[key] : 0)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell align="right">{tickets.length}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                  <Akce value={results.prize.total} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography>
          Income: <Akce value={tickets.length * TICKET_PRICE} />
        </Typography>
        <Typography>
          Profit: <Akce value={tickets.length * TICKET_PRICE - results.prize.total} />
        </Typography>
      </Stack>
    )
  );
};
