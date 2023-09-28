import { FC, useState } from 'react';
import { Flex, Grid } from '@radix-ui/themes';
import styled from '@emotion/styled';
import { rearrangeArray } from '@/shared';
import { useSpring, animated, config } from '@react-spring/web';

export interface IGalleryProps {
  onClick?: () => void;
  urls: string[];
}

export const Gallery: FC<IGalleryProps> = ({ onClick, urls }) => {
  const [photos, setOrder] = useState(urls);

  const [props, api] = useSpring(
    () => ({
      filter: 'blur(0)',
      ...config.gentle,
    }),
    []
  );

  const onClickHandler = () => {
    const rearrangedArray = rearrangeArray(photos);

    setOrder(rearrangedArray);
    api.start({
      from: { filter: 'blur(5px) grayscale(100%) opacity(0)' },
      to: { filter: 'blur(0) grayscale(0) opacity(1)' },
      config: config.gentle,
    });

    if (typeof onClick === 'function') onClick();
  };

  const [first, ...rest] = photos;

  return (
    <Grid
      columns="2"
      onClick={onClickHandler}
      width="100%"
      style={{ background: 'lightgray' }}
    >
      <Photo style={props}>
        <img src={first} />
      </Photo>
      <Flex direction="column">
        {rest.map((src, index) => (
          <PhotoWithBorder
            height="50%"
            src={src}
            withBottomBorder={!(index % 2)}
            key={src}
            style={props}
          />
        ))}
      </Flex>
    </Grid>
  );
};

const Photo = styled(animated.div)`
  width: 100%;
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background-color: lightgray;
  will-change: opacity;

  & img {
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
  }
`;

const PhotoWithBorder = styled(animated.div)<{
  src: string;
  height: string;
  withBottomBorder: boolean;
}>`
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center center;
  background-clip: content-box;
  background-size: cover;
  background-color: lightgray;
  will-change: opacity;
  width: 100%;
  position: relative;
  height: ${(props) => props.height};

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: var(--tg-theme-bg-color, var(--color-page-background));
  }

  &::before {
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
  }

  ${(props) =>
    props.withBottomBorder
      ? `&::after {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
  }`
      : ''}
`;
