import { Suspense, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Routes, Route, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Main } from '../../pages/Main';
import { Services } from '../../pages/ServicesPage';
import { Preloader } from '../../shared/ui/Preloader/Preloader';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { ProductPage } from '../../pages/ProductPage';
import { CardPageAsync as CardPage } from '../../pages/CardProductPage';
import { ServiceDetailPageAsync as ServiceDetailPage } from '../../pages/ServiceDetailPage';
import { servicesContentById } from '../../shared/lib/constants';
import { productCategoryContentById, type ProductCategoryId } from '../../components/MainComponents/ProductPageComponents/ProductCatalog/ui/products';

const PageLoader = () => <Preloader isActive />;

const ScrollManager = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

const CardProductRoute = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const product = useMemo(() => (id ? productCategoryContentById[id as ProductCategoryId] : undefined), [id]);
  const [activeImageId, setActiveImageId] = useState(product?.gallery[0]?.id ?? '');

  useEffect(() => {
    setActiveImageId(product?.gallery[0]?.id ?? '');
  }, [product]);

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <CardPage
      product={product}
      activeImageId={activeImageId}
      onBack={() => navigate('/product')}
      onImageChange={setActiveImageId}
    />
  );
};

const ServiceDetailRoute = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const service = useMemo(() => (id ? servicesContentById[id as keyof typeof servicesContentById] : undefined), [id]);

  if (!service) {
    return <NotFoundPage />;
  }

  return <ServiceDetailPage service={service} onBack={() => navigate('/services')} />;
};


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<><ScrollManager /><Header /><Outlet /><Footer /></>}>
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
          path="services/:id"
          element={
            <Suspense fallback={<PageLoader />}>
              <ServiceDetailRoute />
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
        <Route
          path="product/:id"
          element={
            <Suspense fallback={<PageLoader />}>
              <CardProductRoute />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
