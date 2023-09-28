import { FC } from 'react';
import { Button, Grid } from '@radix-ui/themes';
import Check from '@/shared/ui/assets/svg/check.svg?react';
import Close from '@/shared/ui/assets/svg/x.svg?react';
import { DISABLED_BY_ANIM_ID } from '@/shared';

export interface IBarProps {
  disabled?: boolean;
  onClickRight?: () => void;
  onClickLeft?: () => void;
}

export const Bar: FC<IBarProps> = ({ onClickRight, onClickLeft, disabled }) => {
  const attributes = {
    [DISABLED_BY_ANIM_ID]: true,
  };

  return (
    <Grid columns="2" gap="3" mt="4" mb="4" px="4">
      <Button
        {...attributes}
        disabled={disabled}
        size="4"
        color="red"
        variant="soft"
        radius="large"
        onClick={onClickLeft}
      >
        <Close />
      </Button>
      <Button
        {...attributes}
        disabled={disabled}
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
