import { FC, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const RouterProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <BrowserRouter>
    <Suspense>{children}</Suspense>
  </BrowserRouter>
);
