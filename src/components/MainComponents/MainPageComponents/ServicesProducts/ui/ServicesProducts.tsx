import { useMemo } from 'react';
import cls from './ServicesProducts.module.css';
import { productItems } from '../../../ProductCatalog/model/products';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { GalleryCard } from '../../../../../shared/ui/GalleryCard';
import { SectionUnderlineLink } from '../../../../../shared/ui/SectionUnderlineLink';

interface IServicesProductsProps {
  className?: string;
}

export const ServicesProducts = ({ className }: IServicesProductsProps) => {
  const items = useMemo(() => {
    const shuffled = [...productItems];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }

    return shuffled.slice(0, 3);
  }, []);

  return (
    <section id="catalog" className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="catalog-title">
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.head, {}, [])}>
          <span className={classNames(cls.kicker, {}, [])}>Товары</span>
          <h2 id="catalog-title" className={classNames(cls.title, {}, [])}>
            Товары и продукция
          </h2>
        </div>

        <div className={classNames(cls.intro, {}, [])}>
          <p className={classNames(cls.leadText, {}, [])}>
            Производим и монтируем знаки, разметку, искусственные неровности и изделия из пластика. Выберите
            направление или перейдите в полный каталог.
          </p>
        </div>

        <div className={classNames(cls.afterIntro, {}, [])}>
          <SectionUnderlineLink to="/product" label="Все услуги" />
        </div>

        <div className={classNames(cls.grid, {}, [])}>
          {items.map((item) => (
            <GalleryCard
              key={item.id}
              title={item.name}
              description={item.description}
              to={`/product/${item.id}`}
              image={item.image}
              ctaLabel="Подробнее"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
