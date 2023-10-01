import { FC } from 'react';
import {
  Card,
  selectors,
  events,
  gates,
  init as initPersons,
} from '@/entities';
import { DISABLED_BY_ANIM_ID } from '@/shared';
import { Box } from '@radix-ui/themes';
import { MatchSwipe } from '@/features';

initPersons();

const MatchMake: FC = () => {
  const list = selectors.usePersons();
  gates.usePersonsGate();

  return (
    <Box
      position="fixed"
      style={{ width: '300vw', height: '100vh', left: '-100%' }}
    >
      <MatchSwipe
        list={list}
        handler={events.removeLast}
        buttonBlockSelector={`button[${DISABLED_BY_ANIM_ID}]`}
      >
        {({ index, handler }) => (
          <Card
            {...list[index]}
            onClickLeft={() => handler(-1, index)}
            onClickRight={() => handler(1, index)}
          />
        )}
      </MatchSwipe>
    </Box>
  );
};

export default MatchMake;
