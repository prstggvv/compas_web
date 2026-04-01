import cls from './ProductPage.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ProductPageHero } from '../../../components/MainComponents/ProductPageHero';
import { ProductCatalog } from '../../../components/MainComponents/ProductCatalog';
import { ProductCta } from '../../../components/MainComponents/ProductCta';

interface IProductPageProps {
  className?: string;
}

const ProductPage = ({ className }: IProductPageProps) => {
  return (
    <main className={classNames(cls.page, {}, [className ?? ''])}>
      <ProductPageHero />
      <ProductCatalog />
      <ProductCta
        sectionId="product-page-cta"
        title="Не нашли нужный товар?"
        text="Мы осуществляем поставки нестандартного оборудования и производим продукцию по индивидуальным чертежам заказчика."
        buttonLabel="Получить подбор под проект"
      />
    </main>
  )
}

export default ProductPage;
