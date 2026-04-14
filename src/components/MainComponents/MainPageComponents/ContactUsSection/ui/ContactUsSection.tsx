import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import cls from './ContactUsSection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { MOTION_EASE, VIEWPORT_ONCE } from '../../../../../shared/lib/motion';

interface ContactUsSectionProps {
  className?: string;
  onOpenContactPopup?: () => void;
}

const sectionViewport = {
  ...VIEWPORT_ONCE,
  amount: 0.3,
} as const;

const sectionReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: MOTION_EASE,
    },
  },
} as const;

export const ContactUsSection = ({ className, onOpenContactPopup }: ContactUsSectionProps) => {
  return (
    <section className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="contact-us-title">
      <div className={classNames(cls.container, {}, [])}>
        <motion.div
          className={classNames(cls.inner, {}, [])}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionReveal}
        >
          <motion.h2
            id="contact-us-title"
            className={classNames(cls.title, {}, [])}
            variants={sectionReveal}
          >
            Появились вопросы?
          </motion.h2>

          <motion.button
            type="button"
            className={classNames(cls.ctaButton, {}, [])}
            onClick={onOpenContactPopup}
            variants={sectionReveal}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            Оставить заявку
            <ArrowRight className={classNames(cls.ctaIcon, {}, [])} strokeWidth={2} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
