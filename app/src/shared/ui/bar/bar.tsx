import { FC } from 'react';
import { Button, Grid } from '@radix-ui/themes';
import Check from '@/shared/ui/assets/svg/check.svg?react';
import Close from '@/shared/ui/assets/svg/x.svg?react';

export interface IBarProps {
  onClickRight?: () => void;
  onClickLeft?: () => void;
}

export const Bar: FC<IBarProps> = ({ onClickRight, onClickLeft }) => {
  return (
    <Grid columns="2" gap="3" mt="4" mb="4" px="4">
      <Button
        size="4"
        color="red"
        variant="soft"
        radius="large"
        onClick={onClickLeft}
      >
        <Close />
      </Button>
      <Button
        size="4"
        color="blue"
        variant="soft"
        radius="large"
        onClick={onClickRight}
      >
        <Check />
      </Button>
    </Grid>
  );
};
