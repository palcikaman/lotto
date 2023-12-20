import { IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { useStore } from '../../../config/store.ts';
import { useState } from 'react';
import { Cancel, Done, Edit } from '@mui/icons-material';
import { Akce } from '../../../components/Akce.tsx';

export const PlayerHeader = () => {
  const { player, setPlayerName } = useStore();

  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(player.name);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" alignItems="center" gap={1}>
        {editingName ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setPlayerName(name);
              setEditingName(false);
            }}
          >
            <TextField
              // label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="standard"
              autoFocus
              InputProps={{
                endAdornment: (
                  <>
                    <Tooltip title="Save">
                      <IconButton type="submit">
                        <Done />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                      <IconButton onClick={() => setEditingName(false)}>
                        <Cancel />
                      </IconButton>
                    </Tooltip>
                  </>
                ),
              }}
            />
          </form>
        ) : (
          <>
            <Typography>{player.name}</Typography>
            <Tooltip title="Edit">
              <IconButton onClick={() => setEditingName(true)} size="small">
                <Edit />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>
      <Typography>
        Balance: <Akce value={player.balance} />
      </Typography>
    </Stack>
  );
};
