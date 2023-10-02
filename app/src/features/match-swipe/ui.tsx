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
  swipeEnabled?: boolean;
}

export const MatchSwipe: FC<IMatchSwipeProps> = ({
  list,
  handler,
  children,
  buttonBlockSelector,
  swipeEnabled = true,
}) => {
  const width = window.innerWidth;
  const velocityMultiplier = 3.5;

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
      if (i !== index) return;

      return {
        x: width * dir * velocityMultiplier,
      };
    });
  };

  const bind = useDrag(
    ({ args: [index], first, down, delta: [xDelta] }) => {
      buttonButtonState();

      if (first) {
        const dir = xDelta > 0 ? 1 : -1;

        api.start((i) => {
          if (i !== index) return;
          if (!down) {
            buttonButtonState.cancel();
            return { x: width * dir, immediate: true };
          }

          const x = down ? width * dir * velocityMultiplier : 0;

          return {
            x,
            tension: 800,
            friction: 100,
            clamp: true,
            precision: 0.0001,
          };
        });
      }
    },
    {
      preventAxisScroll: 'y',
      axis: 'x',
      enabled: swipeEnabled,
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
