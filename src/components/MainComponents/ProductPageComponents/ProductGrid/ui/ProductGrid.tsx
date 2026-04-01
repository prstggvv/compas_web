import { motion } from 'framer-motion';
import cls from './ProductGrid.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import type { ProductCategory, ProductCategoryId, ProductItem } from '../../../ProductCatalog/model/products';
import { ProductCard } from '../../ProductCard';

interface ProductGridProps {
  categories: ProductCategory[];
  activeCategory: ProductCategoryId;
  onCategoryChange: (categoryId: ProductCategoryId) => void;
  items: ProductItem[];
}

export const ProductGrid = ({ categories, activeCategory, onCategoryChange, items }: ProductGridProps) => {
  return (
    <div className={classNames(cls.content, {}, [])}>
      <div className={classNames(cls.tabs, {}, [])} role="tablist" aria-label="Категории товаров">
        {categories.map((category) => {
          const isActive = category.id === activeCategory;

          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={classNames(cls.tab, { [cls.tabActive]: isActive }, [])}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <p className={classNames(cls.count, {}, [])}>Показано: {items.length} позиций</p>

      <motion.div layout className={classNames(cls.grid, {}, [])}>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: index * 0.03 }}
          >
            <ProductCard item={item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
