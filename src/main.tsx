import React from 'react';
import ReactDOM from 'react-dom/client';
import { setDefaultOptions } from 'date-fns';
import { hu } from 'date-fns/locale';
import { router } from './router.tsx';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

setDefaultOptions({ locale: hu });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <CssBaseline />
  </React.StrictMode>
);
