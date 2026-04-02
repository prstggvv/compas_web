import { motion } from 'framer-motion';
import cls from './ServicesProducts.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { GalleryCard } from '../../../../../shared/ui/GalleryCard';
import { MainPageTitle } from '../../../../../shared/ui/MainPageTitle';
import { SectionUnderlineLink } from '../../../../../shared/ui/SectionUnderlineLink';
import { featuredProductCategoryCards } from '../../../ProductPageComponents/ProductCatalog/ui/products';
import { createStaggerContainer, fadeUp, fadeUpSoft, itemReveal, VIEWPORT_ONCE } from '../../../../../shared/lib/motion';

interface IServicesProductsProps {
  className?: string;
}

export const ServicesProducts = ({ className }: IServicesProductsProps) => {
  return (
    <motion.section
      id="catalog"
      className={classNames(cls.section, {}, [className ?? ''])}
      aria-labelledby="catalog-title"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={createStaggerContainer(0.14)}
    >
      <div className={classNames(cls.container, {}, [])}>
        <motion.div className={classNames(cls.head, {}, [])} variants={fadeUpSoft}>
          <MainPageTitle
            id="catalog-title"
            title="Наша продукция"
            sectionLabel="Раздел 04"
            sectionDescription="Категории продукции и поставка"
          />
        </motion.div>

        <motion.div className={classNames(cls.intro, {}, [])} variants={fadeUp}>
          <p className={classNames(cls.leadText, {}, [])}>
            Компания КОМПАС поставляет продукцию для дорожной и городской инфраструктуры: от знаков и
            металлоконструкций до МАФ, ограждений и материалов для разметки.
          </p>
        </motion.div>

        <motion.div className={classNames(cls.afterIntro, {}, [])} variants={fadeUpSoft}>
          <SectionUnderlineLink to="/product" label="Все товары" />
        </motion.div>

        <motion.div className={classNames(cls.grid, {}, [])} variants={createStaggerContainer(0.12)}>
          {featuredProductCategoryCards.map((item) => (
            <motion.div key={item.id} variants={itemReveal}>
              <GalleryCard
                title={item.title}
                description={item.description}
                to={`/product/${item.id}`}
                image={item.image}
                ctaLabel="Открыть категорию"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
