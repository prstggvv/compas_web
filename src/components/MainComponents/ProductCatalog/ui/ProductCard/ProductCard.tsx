import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import cls from './ProductCard.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import type { ProductItem } from '../../model/products';

interface ProductCardProps {
  item: ProductItem;
}

export const ProductCard = ({ item }: ProductCardProps) => {
  return (
    <article className={classNames(cls.card, {}, [])}>
      <Link to={`/product/${item.id}`} className={classNames(cls.cardLink, {}, [])} aria-label={`Открыть карточку товара: ${item.name}`}>
        <figure className={classNames(cls.figure, {}, [])}>
          <img className={classNames(cls.image, {}, [])} src={item.image} alt={item.name} loading="lazy" />
        </figure>

        <div className={classNames(cls.content, {}, [])}>
          <header className={classNames(cls.header, {}, [])}>
            <p className={classNames(cls.category, {}, [])}>{item.categoryLabel}</p>
            <h3 className={classNames(cls.title, {}, [])}>{item.name}</h3>
          </header>

          <p className={classNames(cls.description, {}, [])}>{item.description}</p>

          <footer className={classNames(cls.footer, {}, [])}>
            <span className={classNames(cls.button, {}, [])}>
              <span>Запросить КП</span>
              <ArrowRight className={classNames(cls.buttonIcon, {}, [])} strokeWidth={1.5} aria-hidden />
            </span>
          </footer>
        </div>
      </Link>
    </article>
  );
};
