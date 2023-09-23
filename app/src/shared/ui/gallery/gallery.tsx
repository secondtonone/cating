import { FC, useState } from 'react';
import { Flex, Grid } from '@radix-ui/themes';
import styled from '@emotion/styled';
import { rearrangeArray } from '@/shared';

export interface IGalleryProps {
  onClick?: () => void;
  urls: string[];
}

export const Gallery: FC<IGalleryProps> = ({ onClick, urls }) => {
  const [photos, setOrder] = useState(urls);

  const onClickHandler = () => {
    const rearrangedArray = rearrangeArray(photos);

    setOrder(rearrangedArray);

    if(typeof onClick === 'function') onClick();
  };

  const [first, ...rest] = photos;

  return (
    <Grid columns="2" onClick={onClickHandler} width="100%">
      <Flex>
        <Photo src={first} height="100%" />
      </Flex>
      <Flex direction="column">
        {rest.map((src, index) => (
          <PhotoWithBorder height="50%" key={src} src={src} withBottomBorder={!(index % 2)} />
        ))}
      </Flex>
    </Grid>
  );
};

const Photo = styled.div<{ src: string; height: string }>`
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  background-color: lightgray;
  width: 100%;
  position: relative;
  height: ${(props) => props.height};

  transition: background-image .2s ease-out;
  transform-origin: bottom;
`;

const PhotoWithBorder = styled(Photo)<{ withBottomBorder: boolean }>`
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

  ${(props) => props.withBottomBorder ?`&::after {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
  }`:''}
`;
