import { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useState, type FormEvent } from 'react';
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
import { ContactPage } from '../../pages/ContactPage';
import { ContactPopup } from '../../shared/ui/ContactPopup';
import { useForm } from '../../shared/lib/hooks/useForm';
import type { ContactFormState } from '../../types';

const initialContactPopupValues: ContactFormState = {
  name: '',
  phone: '+7',
  email: '',
  company: '',
  message: '',
  agreement: true,
};

const ScrollManager = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

const CardProductRoute = ({ onOpenContactPopup }: { onOpenContactPopup?: () => void }) => {
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
      onOpenContactPopup={onOpenContactPopup}
    />
  );
};

const ServiceDetailRoute = ({ onOpenContactPopup }: { onOpenContactPopup?: () => void }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const service = useMemo(() => (id ? servicesContentById[id as keyof typeof servicesContentById] : undefined), [id]);

  if (!service) {
    return <NotFoundPage />;
  }

  return (
    <ServiceDetailPage
      service={service}
      onBack={() => navigate('/services')}
      onOpenContactPopup={onOpenContactPopup}
    />
  );
};


const AppRouter = () => {
  const location = useLocation();
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [isContactPopupSubmitted, setIsContactPopupSubmitted] = useState(false);
  const [contactPopupValues, setContactPopupValues] = useState<ContactFormState>(initialContactPopupValues);

  const { handleChange, handlePhoneChange } = useForm(contactPopupValues, setContactPopupValues);

  const canSubmitContactPopup = useMemo(
    () => contactPopupValues.name.trim().length > 1 && contactPopupValues.phone.replace(/\D/g, '').length >= 11,
    [contactPopupValues.name, contactPopupValues.phone]
  );

  const openContactPopup = useCallback(() => {
    setIsContactPopupSubmitted(false);
    setIsContactPopupOpen(true);
  }, []);

  const closeContactPopup = useCallback(() => {
    setIsContactPopupOpen(false);
    setIsContactPopupSubmitted(false);
    setContactPopupValues(initialContactPopupValues);
  }, []);

  const handleContactPopupSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmitContactPopup) {
      return;
    }

    setIsContactPopupSubmitted(true);
  }, [canSubmitContactPopup]);

  useEffect(() => {
    if (!isContactPopupOpen) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeContactPopup();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [closeContactPopup, isContactPopupOpen]);

  useEffect(() => {
    if (!isContactPopupSubmitted) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      closeContactPopup();
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [closeContactPopup, isContactPopupSubmitted]);

  useEffect(() => {
    if (isContactPopupOpen || isContactPopupSubmitted) {
      closeContactPopup();
    }
  }, [closeContactPopup, location.hash, location.pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <>
            <ScrollManager />
            <Header onOpenContactPopup={openContactPopup} />
            <Outlet />
            <Footer />
            <ContactPopup
              isOpen={isContactPopupOpen}
              values={contactPopupValues}
              canSubmit={canSubmitContactPopup}
              isSubmitted={isContactPopupSubmitted}
              onClose={closeContactPopup}
              onSubmit={handleContactPopupSubmit}
              onNameChange={(value) => handleChange('name', value)}
              onPhoneChange={handlePhoneChange}
            />
          </>
        )}
      >
        <Route
          index
          element={
            <Suspense fallback={<Preloader isActive={true} />}>
              <Main onOpenContactPopup={openContactPopup} />
            </Suspense>
          }
        />
        <Route
          path="services"
          element={
            <Suspense fallback={<Preloader isActive={true} />}>
              <Services onOpenContactPopup={openContactPopup} />
            </Suspense>
          }
        />
        <Route
          path="services/:id"
          element={
            <Suspense fallback={<Preloader isActive={true} />}>
              <ServiceDetailRoute onOpenContactPopup={openContactPopup} />
            </Suspense>
          }
        />
        <Route
          path="product"
          element={
            <Suspense fallback={<Preloader isActive={true} />}>
              <ProductPage onOpenContactPopup={openContactPopup} />
            </Suspense>
          }
        />
        <Route
          path="product/:id"
          element={
            <Suspense fallback={<Preloader isActive={true} />}>
              <CardProductRoute onOpenContactPopup={openContactPopup} />
            </Suspense>
          }
        />
        <Route
          path='contact'
          element={
            <Suspense fallback={<Preloader isActive={true} />}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
