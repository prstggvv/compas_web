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
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 0.61, 0.36, 1] as const },
  },
};

interface IHeaderData {
  className?: string;
}

export const Header = ({ className }: IHeaderData) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleBurgerClick = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleNavLinkClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

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

  return (
    <>
      <header
        ref={headerRef}
        className={classNames(cls.header, { [cls.scrolled]: scrolled }, [className ?? ''])}
      >
        <motion.div
          className={classNames(cls.container, {}, [])}
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.a
            href='#hero'
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className={classNames(cls.logo, {}, [])}
            aria-label='КОДД — на главную'
            variants={itemVariants}
          >
            <span className={classNames(cls.logoText, {}, [])}>КОДД</span>
          </motion.a>
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
    </>
  );
};
