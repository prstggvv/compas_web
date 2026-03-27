import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import cls from './Header.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import BurgerButton from '../../../shared/ui/BurgerButton/BurgerButton';
import { scrollToSection } from '../../../shared/lib/scrollToSection/scrollToSection';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] as const },
  },
};

const navItems = [
  { id: 'about', label: 'О компании' },
  { id: 'services', label: 'Услуги' },
  { id: 'process', label: 'Процесс' },
  { id: 'projects', label: 'Проекты' },
] as const;

interface IHeaderData {
  className?: string;
}

const CompassGlyph = () => (
  <svg
    className={cls.logoIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" />
    <path
      fill="currentColor"
      stroke="none"
      d="M12 6 14.5 12 12 18 9.5 12z"
    />
  </svg>
);

export const Header = ({ className }: IHeaderData) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleBurgerClick = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleNavLinkClick = useCallback((sectionId: string) => {
    scrollToSection(sectionId);
    setMenuOpen(false);
  }, []);

  const handleAnchorClick =
    (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      handleNavLinkClick(sectionId);
    };

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setMenuOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleOverlayPointerDown = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleMobileNavPointerDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={classNames(cls.header, { [cls.scrolled]: scrolled }, [className ?? ''])}
      >
        <motion.div
          className={classNames(cls.container, {}, [])}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.a
            href="#hero"
            onClick={handleAnchorClick('hero')}
            className={classNames(cls.logo, {}, [])}
            aria-label="Компас — на главную"
            variants={itemVariants}
          >
            <span className={cls.logoMark}>
              <CompassGlyph />
            </span>
            <span className={classNames(cls.logoText, {}, [])}>КОМПАС</span>
          </motion.a>

          <nav className={cls.desktopNav} aria-label="Основная навигация">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cls.navLink}
                onClick={handleAnchorClick(item.id)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className={cls.navCta}
              onClick={handleAnchorClick('contact')}
            >
              Оставить заявку
            </a>
          </nav>

          <div className={cls.burgerPlaceholder} aria-hidden />
        </motion.div>
      </header>

      <div className={cls.burgerLayer}>
        <BurgerButton
          className={classNames(cls.button, {}, [])}
          menuOpen={menuOpen}
          handleBurgerClick={handleBurgerClick}
          handleKeyDown={handleKeyDown}
        />
      </div>

      <div
        className={classNames(cls.mobileOverlay, { [cls.mobileOverlayOpen]: menuOpen })}
        aria-hidden={!menuOpen}
        aria-modal={menuOpen ? true : undefined}
        role={menuOpen ? 'dialog' : undefined}
        onPointerDown={handleOverlayPointerDown}
      >
        <nav
          className={cls.mobileNav}
          aria-label="Мобильное меню"
          onPointerDown={handleMobileNavPointerDown}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cls.mobileLink}
              onClick={handleAnchorClick(item.id)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className={cls.mobileCta}
            onClick={handleAnchorClick('contact')}
          >
            Оставить заявку
          </a>
        </nav>
      </div>
    </>
  );
};
