import { PropsWithChildren } from 'react';
import { Header } from './Header.tsx';
import { Container, Stack } from '@mui/material';

export const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    <Container maxWidth="md" sx={(theme) => ({ marginTop: theme.spacing(2) })}>
      <Stack marginX="auto" gap={2}>
        {children}
      </Stack>
    </Container>
  </>
);
