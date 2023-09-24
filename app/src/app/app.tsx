import { useEffect } from 'react';

import { useTelegram } from '@/shared';
import { List } from '@/pages';

const App = (): JSX.Element => {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
    tg.expand();

    document.addEventListener('touchmove', (event) => {
      event.preventDefault();
    });
  }, [])
  

  return (
    <List />
  );
};

export default App;
