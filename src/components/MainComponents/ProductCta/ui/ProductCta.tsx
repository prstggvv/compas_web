import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import cls from './ProductCta.module.css';
import { classNames } from '../../../../shared/lib/classNames/classNames';

interface ProductCtaProps {
  className?: string;
  title?: string;
  text?: string;
  buttonLabel?: string;
  sectionId?: string;
}

export const ProductCta = ({
  className,
  title = 'Не нашли нужный товар?',
  text = 'Мы осуществляем поставки нестандартного оборудования и производим продукцию по индивидуальным чертежам заказчика.',
  buttonLabel = 'Получить подбор под проект',
  sectionId = 'page-cta',
}: ProductCtaProps) => {
  const titleId = `${sectionId}-title`;

  return (
    <section className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby={titleId}>
      <div className={classNames(cls.container, {}, [])}>
        <h2 id={titleId} className={classNames(cls.title, {}, [])}>{title}</h2>
        <p className={classNames(cls.text, {}, [])}>{text}</p>

        <motion.button
          type="button"
          className={classNames(cls.button, {}, [])}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <span>{buttonLabel}</span>
          <ArrowRight className={classNames(cls.buttonIcon, {}, [])} strokeWidth={2} aria-hidden />
        </motion.button>
      </div>
    </section>
  );
};
