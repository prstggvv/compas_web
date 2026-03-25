import { useState } from 'react';
import { motion } from 'framer-motion';
import cls from './Hero.module.css';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import LogoSvg from '../../../../shared/assets/images/icons/logo.svg';

interface IHeroProps {
  className?: string;
}

const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    (e.currentTarget as HTMLButtonElement).click();
  }
};

export const Hero = ({ className }: IHeroProps) => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <motion.section
      id='hero'
      className={classNames(cls.section, {}, [className ?? ''])}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={classNames(cls.container, {}, [])}>
        <motion.div
          className={classNames(cls.block, {}, [])}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <motion.div
            className={classNames(cls.heroLogoWrap, {}, [])}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img src={LogoSvg} alt="КОДД" className={classNames(cls.heroLogo, {}, [])} />
          </motion.div>
          <h1 className={classNames(cls.titles, {}, [])}>
            <motion.span
              className={classNames(cls.span, {}, [cls.spanMain])}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
            >
              Обустройство дорожной инфраструктуры
            </motion.span>
            <motion.div
              className={classNames(cls.ctaBlock, {}, [])}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            >
              <button
                type="button"
                className={classNames(cls.ctaLink, {}, [])}
                tabIndex={0}
                aria-label="Оставить заявку"
                onKeyDown={handleKeyDown}
                onClick={() => setFormOpen(true)}
              >
                <span className={classNames(cls.ctaText, {}, [])}>Оставить заявку</span>
                <span className={classNames(cls.ctaArrow, {}, [])} aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14M7 12l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              <span className={classNames(cls.spanAccent, {}, [])}>
                под ключ без срывов и переделок
              </span>
            </motion.div>
          </h1>
          <motion.div
            className={classNames(cls.content, {}, [])}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
          >
            <p className={classNames(cls.text, {}, [])}>
              Работаем в реальных условиях трафика. Сроки, безопасность и качество под полным контролем.
            </p>
            <ul className={classNames(cls.cards, {}, [])}>
              <li className={classNames(cls.card, {}, [])}>
                <h2 className={classNames(cls.heading, {}, [])}>8000</h2>
                <p className={classNames(cls.subtitle, {}, [])}>Установлено знаков по Крыму</p>
              </li>
              <li className={classNames(cls.card, {}, [])}>
                <h2 className={classNames(cls.heading, {}, [])}>+500 тн.</h2>
                <p className={classNames(cls.subtitle, {}, [])}>Смонтировано металлоконструкции</p>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
