import cls from './ServicesProducts.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { GalleryCard } from '../../../../../shared/ui/GalleryCard';
import { MainPageTitle } from '../../../../../shared/ui/MainPageTitle';
import { SectionUnderlineLink } from '../../../../../shared/ui/SectionUnderlineLink';
import { featuredProductCategoryCards } from '../../../ProductPageComponents/ProductCatalog/ui/products';

interface IServicesProductsProps {
  className?: string;
}

export const ServicesProducts = ({ className }: IServicesProductsProps) => {
  return (
    <section id="catalog" className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="catalog-title">
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.head, {}, [])}>
          <MainPageTitle
            id="catalog-title"
            title="Наша продукция"
            sectionLabel="Раздел 04"
            sectionDescription="Категории продукции и поставка"
          />
        </div>

        <div className={classNames(cls.intro, {}, [])}>
          <p className={classNames(cls.leadText, {}, [])}>
            Компания КОМПАС поставляет продукцию для дорожной и городской инфраструктуры: от знаков и
            металлоконструкций до МАФ, ограждений и материалов для разметки.
          </p>
        </div>

        <div className={classNames(cls.afterIntro, {}, [])}>
          <SectionUnderlineLink to="/product" label="Все товары" />
        </div>

        <div className={classNames(cls.grid, {}, [])}>
          {featuredProductCategoryCards.map((item) => (
            <GalleryCard
              key={item.id}
              title={item.title}
              description={item.description}
              to={`/product/${item.id}`}
              image={item.image}
              ctaLabel="Открыть категорию"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
