import { CardProductPageHero } from '../../../components/MainComponents/CardProductPageComponents/CardPageHero';
import { CardProductDescription } from '../../../components/MainComponents/CardProductPageComponents/CardProductDescription';
import { CardProductShowcase } from '../../../components/MainComponents/CardProductPageComponents/CardProductShowcase';
import cls from './CardPage.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import type { ProductCategoryContent } from '../../../components/MainComponents/ProductPageComponents/ProductCatalog/ui/products';
import { ProductCta } from '../../../components/MainComponents/ProductCta';

interface ICardPageProps {
  className?: string;
  product: ProductCategoryContent;
  activeImageId: string;
  onBack: () => void;
  onImageChange: (imageId: string) => void;
}

const CardPage = ({ className, product, activeImageId, onBack, onImageChange }: ICardPageProps) => {
  return (
    <main className={classNames(cls.page, {}, [className ?? ''])}>
      <CardProductPageHero currentLabel={product.title} onBack={onBack} />
      <CardProductShowcase product={product} activeImageId={activeImageId} onImageChange={onImageChange} />
      <CardProductDescription
        title={product.assortmentTitle}
        items={product.assortmentItems}
        paragraphs={product.paragraphs}
      />
      <ProductCta
        sectionId="card-product-page-cta"
        title="Нужна продукция под конкретный проект?"
        text="Поможем осуществляем поставки нестандартного оборудования и производим продукцию по индивидуальным чертежам заказчика."
        buttonLabel="Получить детальный расчет"
      />
    </main>
  );
};

export default CardPage;
