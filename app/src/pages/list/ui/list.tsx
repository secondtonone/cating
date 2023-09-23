import { FC, useLayoutEffect, useState } from 'react';
import { Card } from '@/entities';
import { Person } from '@/shared';
import { Box } from '@radix-ui/themes';
import { useSprings, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

const data: Person[] = [
  {
    id: 'b6c0',
    name: 'Kit',
    age: 5,
    about: `Joyful and fluffy cat, ready to find a kitten for shared playtime and lazy days by the windowsill. There's never a dull moment with me!`,
    location: 'New Home',
    zodiac: 'gemini',
    photos: ['./kit-1.jpeg', './kit-2.jpeg', './kit-3.jpeg'],
  },
  {
    id: 'ad599ce15876',
    name: 'Pimple',
    age: 4,
    about: 'A true connoisseur of feline beauty and good company. Swipe right!',
    location: 'Meow City',
    zodiac: 'leo',
    photos: ['./pimp-1.jpeg', './pimp-2.jpeg', './pimp-3.jpeg'],
  },
  {
    id: '5d462e2c',
    name: 'Oscar',
    age: 8,
    about: 'I love salmon and textured rugs.',
    location: 'Catland',
    zodiac: 'cancer',
    photos: ['./oscar-1.jpeg', './oscar-2.jpeg', './oscar-3.jpeg'],
  },
];

const changeButtonState = (isDisable?: boolean) => {
  const buttons = document.querySelectorAll('button[data-animated-disable]');

  buttons.forEach((button) => {
    if (isDisable) {
      button.setAttribute('disabled', '');
    } else {
      button.removeAttribute('disabled');
    }
  });
};

export interface IListProps {}

export const List: FC<IListProps> = () => {
  const [list, setList] = useState<Person[]>(data);
  const width = window.innerWidth;

  const handler = () => {
    const newList = list.slice(0, -1);
    setList(newList);
  };

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
          console.log('finish');
          handler();
          changeButtonState();
        }
      },
    }),
    [list]
  );

  const buttonHandler = (dir: number, index: number) => {
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
        if (!down) {
          return { x: width * dir, immediate: true };
        }
        changeButtonState(true);
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

  useLayoutEffect(() => {
    if (list.length === 1) {
      setList([...data, ...list]);
    }
  }, [list]);

  return (
    <Box
      position="fixed"
      style={{ width: '300vw', height: '100vh', left: '-100%' }}
    >
      {props.map(({ x }, index) => {
        const { id, ...bio } = list[index];
        return (
          <Box
            position="absolute"
            top="0"
            style={{ width: '100vw', left: '100vw' }}
          >
            <animated.div
              key={id}
              {...bind(index)}
              style={{ x, touchAction: 'none' }}
            >
              <Card
                {...bio}
                disabled={x.isAnimating}
                onClickLeft={() => buttonHandler(-1, index)}
                onClickRight={() => buttonHandler(1, index)}
              />
            </animated.div>
          </Box>
        );
      })}
    </Box>
  );
};
