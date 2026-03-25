import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Main } from '../../pages/Main';
import { Preloader } from '../../shared/ui/Preloader/Preloader';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { Header } from '../Header';

const PageLoader = () => <Preloader isActive />;

const MainWithTransition = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
  >
    <Main />
  </motion.div>
);

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<><Header /><Outlet /></>}>
        <Route
          index
          element={
            <Suspense fallback={<PageLoader />}>
              <MainWithTransition />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
