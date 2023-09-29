import { FC, useCallback } from 'react';
import debounce from 'lodash.debounce';
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

  const buttonButtonState = useCallback(
    debounce(() => {
      if (buttonBlockSelector) changeButtonState(true, buttonBlockSelector);
    }, 500),
    [buttonBlockSelector]
  );

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
          if (buttonBlockSelector) {
            buttonButtonState.cancel();
            changeButtonState(false, buttonBlockSelector);
          }
        }
      },
    }),
    [list]
  );

  const buttonHandler = (dir: -1 | 1, index: number) => {
    buttonButtonState.cancel();
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

      buttonButtonState();

      api.start((i) => {
        if (i !== index) return;
        if (!down) {
          buttonButtonState.cancel();
          return { x: width * dir, immediate: true };
        }

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
