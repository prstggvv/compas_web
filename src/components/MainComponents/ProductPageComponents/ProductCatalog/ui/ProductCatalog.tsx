import cls from './ProductCatalog.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { GalleryCard } from '../../../../../shared/ui/GalleryCard';
import { productCategoryCards } from './products';

interface ProductCatalogProps {
  className?: string;
}

export const ProductCatalog = ({ className }: ProductCatalogProps) => {
  return (
    <section className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="product-catalog-title">
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.grid, {}, [])}>
          {productCategoryCards.map((category) => (
            <GalleryCard
              key={category.id}
              title={category.title}
              description={category.description}
              image={category.image}
              to={`/product/${category.id}`}
              ctaLabel="Открыть категорию"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
