import { useEffect } from 'react';

import { useTelegram } from '@/shared';
import Router from '@/pages';
import { RouterProvider } from './providers';

const App = (): JSX.Element => {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, []);

  return (
    <RouterProvider>
      <Router />
    </RouterProvider>
  );
};

export default App;
