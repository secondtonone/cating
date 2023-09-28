import { lazy, FC } from 'react';
import { Route, Routes } from 'react-router-dom';

const MatchMakePage = lazy(() => import('./matchmake'));

const Router: FC = () => (
  <Routes>
    <Route path="/" element={<MatchMakePage />} />
    <Route path="*" element={<MatchMakePage />} />
  </Routes>
);

export default Router;
