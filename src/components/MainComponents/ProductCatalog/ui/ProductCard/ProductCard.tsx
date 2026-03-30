import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import cls from './ProductCard.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import type { ProductItem } from '../../model/products';

interface ProductCardProps {
  item: ProductItem;
}

export const ProductCard = ({ item }: ProductCardProps) => {
  return (
    <motion.article
      className={classNames(cls.card, {}, [])}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className={classNames(cls.imageWrap, {}, [])}>
        <img className={classNames(cls.image, {}, [])} src={item.image} alt={item.name} loading="lazy" />
      </div>

      <div className={classNames(cls.body, {}, [])}>
        <p className={classNames(cls.category, {}, [])}>{item.categoryLabel}</p>
        <h3 className={classNames(cls.title, {}, [])}>{item.name}</h3>
        <p className={classNames(cls.description, {}, [])}>{item.description}</p>

        <motion.button
          type="button"
          className={classNames(cls.button, {}, [])}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <span>Запросить КП</span>
          <ArrowRight className={classNames(cls.buttonIcon, {}, [])} strokeWidth={2} aria-hidden />
        </motion.button>
      </div>
    </motion.article>
  );
};
