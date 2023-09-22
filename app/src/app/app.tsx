import { useEffect } from 'react';

import { useTelegram } from '@/shared';
import { List } from '@/pages';

const App = (): JSX.Element => {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, [])
  

  return (
    <List />
  );
};

export default App;
