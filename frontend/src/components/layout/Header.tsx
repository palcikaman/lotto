import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../../public/assets/favicon.svg';
import { NavItem } from './NavItem.tsx';

export const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
        <Stack direction="row" gap={1} alignItems="center">
          <img src={logo} alt="Lotto logo" style={{ height: 24 }} />
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
            Lottokeeper
          </Typography>
        </Stack>
      </Link>
      <Stack direction="row" justifyContent="end" gap={4} width="100%">
        <NavItem to="/player">Player</NavItem>
        <NavItem to="/house">House</NavItem>
        <NavItem to="/info">Info</NavItem>
      </Stack>
    </Toolbar>
  </AppBar>
);
