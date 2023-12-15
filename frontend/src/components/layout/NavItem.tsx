import { NavLink, NavLinkProps } from 'react-router-dom';
import { styled } from '@mui/material';

const StyledNavlink = styled(NavLink)({
  color: 'white',
  textDecoration: 'none',
  '&.active': {
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
});

export const NavItem = ({ children, ...props }: NavLinkProps) => (
  <StyledNavlink
    {...props}
    className={({ isActive }) => (isActive ? 'active' : '')}
  >
    {children}
  </StyledNavlink>
);
