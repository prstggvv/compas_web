import { Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Main } from '../../pages/Main';
import { Services } from '../../pages/Services';
import { Preloader } from '../../shared/ui/Preloader/Preloader';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { Header } from '../Header';
import { ProductPage } from '../../pages/ProductPage';

const PageLoader = () => <Preloader isActive />;


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<><Header /><Outlet /></>}>
        <Route
          index
          element={
            <Suspense fallback={<PageLoader />}>
              <Main />
            </Suspense>
          }
        />
        <Route
          path="services"
          element={
            <Suspense fallback={<PageLoader />}>
              <Services />
            </Suspense>
          }
        />
        <Route
          path="product"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProductPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
