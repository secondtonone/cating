import { FC } from 'react';
import type { Person } from '@/shared';
import { Box } from '@radix-ui/themes';
import { useSprings, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { changeButtonState } from './lib';

export interface IMatchSwipeProps {
  list: Array<Person>;
  handler: () => void;
  children: (props: {
    index: number;
    handler: (dir: -1 | 1, index: number) => void;
  }) => React.ReactNode;
  buttonBlockSelector?: string;
}

export const MatchSwipe: FC<IMatchSwipeProps> = ({
  list,
  handler,
  children,
  buttonBlockSelector,
}) => {
  const width = window.innerWidth;

  const [props, api] = useSprings(
    list.length,
    (i: number) => ({
      tension: 800,
      friction: 100,
      clamp: true,
      precision: 0.0001,
      loop: false,
      from: {
        x: 0,
      },
      onRest: (e) => {
        if (e.finished) {
          if (typeof handler === 'function') handler();
          if (buttonBlockSelector)
            changeButtonState(false, buttonBlockSelector);
        }
      },
    }),
    [list]
  );

  const buttonHandler = (dir: -1 | 1, index: number) => {
    api.start((i) => {
      if (i !== index) {
        return;
      }

      return {
        x: width * dir * 5,
      };
    });
  };

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir] }) => {
      const dir = xDir > 0 ? 1 : -1;

      api.start((i) => {
        if (i !== index) return;
        if (!down) return { x: width * dir, immediate: true };
        if (buttonBlockSelector) changeButtonState(true, buttonBlockSelector);

        const x = down ? Math.abs(mx) * dir * 5 : 0;

        return {
          x,
        };
      });
    },
    {
      preventAxisScroll: 'y',
      axis: 'x',
    }
  );

  return (
    <>
      {props.map(({ x }, index) => {
        const { id } = list[index];
        return (
          <Box
            key={id}
            position="absolute"
            top="0"
            style={{ width: '100vw', left: '100vw' }}
          >
            <animated.div {...bind(index)} style={{ x, touchAction: 'none' }}>
              {children({ index, handler: buttonHandler })}
            </animated.div>
          </Box>
        );
      })}
    </>
  );
};
