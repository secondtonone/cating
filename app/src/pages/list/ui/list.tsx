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
    photos: [
      '/src/shared/ui/assets/photos/kit-1.jpeg',
      '/src/shared/ui/assets/photos/kit-2.jpeg',
      '/src/shared/ui/assets/photos/kit-3.jpeg',
    ],
  },
  {
    id: 'ad599ce15876',
    name: 'Pimple',
    age: 4,
    about: 'A true connoisseur of feline beauty and good company. Swipe right!',
    location: 'Meow City',
    zodiac: 'leo',
    photos: [
      '/src/shared/ui/assets/photos/pimp-1.jpeg',
      '/src/shared/ui/assets/photos/pimp-2.jpeg',
      '/src/shared/ui/assets/photos/pimp-3.jpeg',
    ],
  },
  {
    id: '5d462e2c',
    name: 'Oscar',
    age: 8,
    about: 'I love salmon and textured rugs.',
    location: 'Catland',
    zodiac: 'cancer',
    photos: [
      '/src/shared/ui/assets/photos/oscar-1.jpeg',
      '/src/shared/ui/assets/photos/oscar-2.jpeg',
      '/src/shared/ui/assets/photos/oscar-3.jpeg',
    ],
  },
];

export interface IListProps {}

export const List: FC<IListProps> = () => {
  const [list, setList] = useState<Person[]>(data);
  const width = window.innerWidth;

  const handler = () => {
    const newList = list.slice(0, -1);
    setList(newList);
  };

  const [props, api] = useSprings(list.length, (i: number) => ({
    tension: 500,
    friction: 120,
    clamp: true,
    precision: 0.0001,
    from: { 
      x: 0
    },
    onRest: (e) => {
      if (e.finished) {
        console.log('finish');
        handler();
      }
    },
  }), [list]);

  const buttonHandler = (dir: number, index: number) => {
    api.start((i) => {
      if (i !== index) {
        return;
      }

      return {
        x: width * dir,
        config: { friction: 120, tension: 500 },
      };
    });
  }


  const bind = useDrag(
    ({
      args: [index],
      down,
      movement: [mx],
      direction: [xDir]
    }) => {
      const dir = xDir > 0 ? 1 : -1;

      api.start((i) => {
        if (i !== index) return;
        if (Math.abs(mx) > width / 3) {
          return { x: width * dir };
        }
        const x = down ? Math.abs(mx) * dir : 0;
        return {
          x,
          config: { friction: 120, tension: 800 },
        };
      });
    }, {
      preventAxisScroll: 'y',
      axis: 'x' 
    }
  );

  useLayoutEffect(() => {
    if (list.length === 1) {
      setList([...data, ...list]);
    }
  }, [list]);

  return (
    <Box position="relative" style={{ width: '100vw' }}>
      {props.map(({ x }, index) => {
        const { id, ...bio } = list[index];
        return (
          <Box position="absolute" top="0" right="0" left="0">
            <animated.div key={id} {...bind(index)} style={{ x, touchAction: 'none' }} >
                <Card
                  {...bio}
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
