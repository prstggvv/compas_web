import cls from './ProductPage.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ProductPageHero } from '../../../components/MainComponents/ProductPageComponents/ProductPageHero';
import { ProductCatalog } from '../../../components/MainComponents/ProductPageComponents/ProductCatalog';
import { ProductCta } from '../../../components/MainComponents/ProductCta';

interface IProductPageProps {
  className?: string;
  onOpenContactPopup?: () => void;
}

const ProductPage = ({ className, onOpenContactPopup }: IProductPageProps) => {
  return (
    <main className={classNames(cls.page, {}, [className ?? ''])}>
      <ProductPageHero />
      <ProductCatalog />
      <ProductCta
        sectionId="product-page-cta"
        title="Не нашли нужный товар?"
        text="Мы осуществляем поставки нестандартного оборудования и производим продукцию по индивидуальным чертежам заказчика."
        buttonLabel="Получить подбор под проект"
        onOpenContactPopup={onOpenContactPopup}
      />
    </main>
  )
}

export default ProductPage;
