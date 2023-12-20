import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Layout } from './components/layout/Layout.tsx';
import { Home } from './pages/Home.tsx';
import { Player } from './pages/player/Player.tsx';
import { House } from './pages/house/House.tsx';
import { Info } from './pages/Info.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert } from '@mui/material';

export const router = createBrowserRouter(
  [
    {
      path: '/',

      element: (
        <ErrorBoundary
          FallbackComponent={() => <Alert color="error">Error</Alert>}
          onError={(error) => console.error(error)}
        >
          <Layout>
            <Outlet />
          </Layout>
        </ErrorBoundary>
      ),
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/player',
          element: <Player />,
        },
        {
          path: '/house',
          element: <House />,
        },
        {
          path: '/info',
          element: <Info />,
        },
      ],
    },
  ],
  { basename: '/lotto' }
);
