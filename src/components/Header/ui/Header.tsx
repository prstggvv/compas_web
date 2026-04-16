import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cls from './Header.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import BurgerButton from '../../../shared/ui/BurgerButton/BurgerButton';
import { scrollToSection } from '../../../shared/lib/scrollToSection/scrollToSection';
import LogoIconSvg from '../../../shared/assets/images/icons/logo.svg';

interface NavItem {
  id: string;
  label: string;
  description: string;
  type: 'route' | 'section';
  to?: string;
  sectionId?: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Главная', description: 'Главная страница компании', type: 'route', to: '/' },
  { id: 'services', label: 'Услуги', description: 'Проектирование, монтаж и производство', type: 'route', to: '/services' },
  { id: 'products', label: 'Товары', description: 'Категории продукции и поставки', type: 'route', to: '/product' },
  { id: 'contact', label: 'Контакты', description: 'Телефон, почта и обратная связь', type: 'route', to: '/contact' },
];

interface IHeaderData {
  className?: string;
  onOpenContactPopup?: () => void;
}

export const Header = ({ className, onOpenContactPopup }: IHeaderData) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleBurgerClick = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleHomeClick = useCallback(() => {
    if (location.pathname === '/') {
      window.history.replaceState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      navigate('/');
    }
    setMenuOpen(false);
  }, [location.pathname, navigate]);

  const handleSectionNavigation = useCallback(
    (sectionId: string) => {
      if (location.pathname === '/') {
        window.history.replaceState(null, '', `/#${sectionId}`);
        scrollToSection(sectionId);
      } else {
        navigate(`/#${sectionId}`);
      }
      setMenuOpen(false);
    },
    [location.pathname, navigate],
  );

  const handleMenuItemClick = useCallback(
    (item: NavItem) => {
      if (item.type === 'route') {
        if (item.to === '/') {
          handleHomeClick();
        } else if (item.to) {
          navigate(item.to);
          setMenuOpen(false);
        }
        return;
      }

      if (item.sectionId) {
        handleSectionNavigation(item.sectionId);
      }
    },
    [handleHomeClick, handleSectionNavigation, navigate],
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.replace('#', '');
      const timer = window.setTimeout(() => {
        scrollToSection(sectionId);
      }, 60);

      return () => window.clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = menuOpen ? 'hidden' : '';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <>
      <header className={classNames(cls.header, {}, [className ?? ''])}>
        <div className={classNames(cls.container, {}, [])}>
          <Link to="/" className={classNames(cls.logo, {}, [])} aria-label="Компас — на главную">
            <img
              className={classNames(cls.logoIcon, {}, [])}
              src={LogoIconSvg}
              alt='Компас - логотип'
            />
          </Link>

          <div className={classNames(cls.actions, {}, [])}>
            <div className={classNames(cls.contacts, {}, [])}>
              <a href="tel:88005553535" className={classNames(cls.contactLink, {}, [])}>
                8 (800) 555-35-35
              </a>
              <a href="mailto:info@compass-dor.ru" className={classNames(cls.contactLink, {}, [])}>
                info@compass-dor.ru
              </a>
            </div>

            <BurgerButton
              className={classNames(cls.burgerButton, {}, [])}
              menuOpen={menuOpen}
              handleBurgerClick={handleBurgerClick}
              handleKeyDown={handleKeyDown}
              controlsId="header-menu"
              variant="light"
            />
          </div>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id="header-menu"
              className={classNames(cls.menuPanel, {}, [])}
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className={classNames(cls.menuContainer, {}, [])}>
                <div className={classNames(cls.menuLayout, {}, [])}>
                  <nav className={classNames(cls.menuNav, {}, [])} aria-label="Основное меню">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        type="button"
                        className={classNames(cls.menuItem, {}, [])}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.24, delay: index * 0.04 }}
                        onClick={() => handleMenuItemClick(item)}
                      >
                        <span className={classNames(cls.menuItemTitle, {}, [])}>{item.label}</span>
                        <span className={classNames(cls.menuItemDescription, {}, [])}>{item.description}</span>
                      </motion.button>
                    ))}
                  </nav>

                  <motion.div
                    className={classNames(cls.menuAside, {}, [])}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.28, delay: 0.08 }}
                  >
                    <p className={classNames(cls.menuEyebrow, {}, [])}>Навигация и связь</p>
                    <p className={classNames(cls.menuText, {}, [])}>
                      Комплексные решения для дорожной инфраструктуры, организации движения и городской среды.
                    </p>

                    <div className={classNames(cls.menuContacts, {}, [])}>
                      <a href="tel:88005553535" className={classNames(cls.menuContactLink, {}, [])}>
                        8 (800) 555-35-35
                      </a>
                      <a href="mailto:info@compass-dor.ru" className={classNames(cls.menuContactLink, {}, [])}>
                        info@compass-dor.ru
                      </a>
                      <span className={classNames(cls.menuContactText, {}, [])}>г. Москва, ул. Дорожная, д. 12</span>
                    </div>

                    <button
                      type="button"
                      className={classNames(cls.menuCta, {}, [])}
                      onClick={() => {
                        if (onOpenContactPopup) {
                          onOpenContactPopup();
                        } else {
                          navigate('/contact');
                        }
                        setMenuOpen(false);
                      }}
                    >
                      Оставить заявку
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className={classNames(cls.overlay, {}, [])}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={() => setMenuOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};
