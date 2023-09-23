import { FC } from 'react';
import { Flex } from '@radix-ui/themes';

import { Bar, Gallery, Bio, Person, IBarProps } from '@/shared';
import styled from '@emotion/styled';

export interface ICardProps extends Omit<Person, 'id'>, IBarProps {}

export const Card: FC<ICardProps> = ({photos, onClickRight, onClickLeft, disabled, ...bio}) => {
  return (
    <CardContainer direction="column">
      <Flex grow="1" shrink="0">
        <Gallery urls={photos} />
      </Flex>
      <Flex grow="0">
        <Bio
          {...bio}
        />
      </Flex>
      <Bar disabled={disabled} onClickRight={onClickRight} onClickLeft={onClickLeft} />
    </CardContainer>
  );
};

const CardContainer = styled(Flex)`
  background: var(--tg-theme-bg-color, var(--color-page-background));
  height: 100vh;
  width: 100%;
  touch-action: none;
`;
