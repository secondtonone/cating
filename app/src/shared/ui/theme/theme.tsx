import { FC } from 'react';
import { Theme } from '@radix-ui/themes';
import { useTelegram } from '@/shared';

interface ICustomThemeProps {
  children: React.ReactNode
}

const CustomTheme: FC<ICustomThemeProps> = ({ children }) => {
  const { scheme } = useTelegram();
  
  return (
    <Theme appearance={ scheme }>
      {children}
    </Theme>
  );
};

export default CustomTheme;
