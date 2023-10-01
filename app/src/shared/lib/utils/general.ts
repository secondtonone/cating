import { CreateStyled } from '@emotion/styled';

export const shouldForwardProp: Parameters<CreateStyled>[1] = {
  shouldForwardProp: (propName: string) => !propName.startsWith('$'),
};
