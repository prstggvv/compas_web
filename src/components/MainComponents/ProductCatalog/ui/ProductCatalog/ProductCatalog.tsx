import { useMemo, useState } from 'react';
import cls from './ProductCatalog.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import {
  productCategories,
  productFilterGroups,
  productItems,
  type ProductCategoryId,
} from '../../model/products';
import { ProductFilters } from '../ProductFilters/ProductFilters';
import { ProductGrid } from '../ProductGrid/ProductGrid';

interface ProductCatalogProps {
  className?: string;
}

type FilterState = {
  type: string[];
  application: string[];
};

type ExpandedState = Record<'type' | 'application', boolean>;

const initialExpandedState: ExpandedState = {
  type: true,
  application: true,
};

export const ProductCatalog = ({ className }: ProductCatalogProps) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategoryId>('all');
  const [filters, setFilters] = useState<FilterState>({ type: [], application: [] });
  const [expanded, setExpanded] = useState<ExpandedState>(initialExpandedState);

  const filteredItems = useMemo(() => {
    return productItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesType = filters.type.length === 0 || filters.type.includes(item.type);
      const matchesApplication = filters.application.length === 0 || filters.application.includes(item.application);

      return matchesCategory && matchesType && matchesApplication;
    });
  }, [activeCategory, filters]);

  const handleCategoryChange = (categoryId: ProductCategoryId) => {
    setActiveCategory(categoryId);
  };

  const handleToggleGroup = (groupId: keyof ExpandedState) => {
    setExpanded((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleToggleOption = (groupId: keyof FilterState, option: string) => {
    setFilters((prev) => ({
      ...prev,
      [groupId]: prev[groupId].includes(option)
        ? prev[groupId].filter((item) => item !== option)
        : [...prev[groupId], option],
    }));
  };

  const handleReset = () => {
    setFilters({ type: [], application: [] });
    setActiveCategory('all');
  };

  return (
    <section className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="product-catalog-title">
      <div className={classNames(cls.container, {}, [])}>
        <h2 id="product-catalog-title" className={cls.visuallyHidden}>
          Каталог товаров
        </h2>

        <div className={classNames(cls.layout, {}, [])}>
          <ProductFilters
            groups={productFilterGroups}
            expanded={expanded}
            selectedFilters={filters}
            onToggleGroup={handleToggleGroup}
            onToggleOption={handleToggleOption}
            onReset={handleReset}
          />

          <ProductGrid
            categories={productCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            items={filteredItems}
          />
        </div>
      </div>
    </section>
  );
};
