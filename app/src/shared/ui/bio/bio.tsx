import { FC } from 'react';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import Verified from '@/shared/ui/assets/svg/verified.svg?react';
import Pin from '@/shared/ui/assets/svg/pin.svg?react';
import Cancer from '@/shared/ui/assets/svg/cancer.svg?react';
import Gemini from '@/shared/ui/assets/svg/gemini.svg?react';
import Leo from '@/shared/ui/assets/svg/leo.svg?react';
import styled from '@emotion/styled';
import type { Person } from '@/shared';

const zodiacs = {
  cancer: <Cancer />,
  gemini: <Gemini />,
  leo: <Leo />,
} as const;

export interface IBioProps extends Omit<Person, 'photos' | 'id'> {}

export const Bio: FC<IBioProps> = ({ name, age, about, zodiac, location }) => {
  return (
    <Box pt="4" px="4">
      <Flex align="center" mb="2">
        <Heading size="6" weight="medium" mr="1">
          {name}, {age}
        </Heading>{' '}
        <Verified />
      </Flex>
      <Flex direction="row" align="center" mb="2">
        <Flex align="center" mr="4">
          <Pin />{' '}
          <Text size="2" ml="1">
            {location}
          </Text>
        </Flex>
        <Flex align="center">
          {zodiacs[zodiac]}{' '}
          <CustomText size="2" ml="1">
            {zodiac}
          </CustomText>
        </Flex>
      </Flex>
      <Box>
        <Text size="3">{about}</Text>
      </Box>
    </Box>
  );
};

const CustomText = styled(Text)`
  &::first-letter {
    text-transform: uppercase;
  }
`;
