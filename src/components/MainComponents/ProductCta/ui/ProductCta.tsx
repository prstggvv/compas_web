import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import cls from './ProductCta.module.css';
import { classNames } from '../../../../shared/lib/classNames/classNames';

interface ProductCtaProps {
  className?: string;
}

export const ProductCta = ({ className }: ProductCtaProps) => {
  return (
    <section className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="product-cta-title">
      <div className={classNames(cls.container, {}, [])}>
        <h2 id="product-cta-title" className={classNames(cls.title, {}, [])}>
          Не нашли нужный товар?
        </h2>
        <p className={classNames(cls.text, {}, [])}>
          Мы осуществляем поставки нестандартного оборудования и производим продукцию по индивидуальным чертежам
          заказчика.
        </p>

        <motion.button
          type="button"
          className={classNames(cls.button, {}, [])}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <span>Получить подбор под проект</span>
          <ArrowRight className={classNames(cls.buttonIcon, {}, [])} strokeWidth={2} aria-hidden />
        </motion.button>
      </div>
    </section>
  );
};
