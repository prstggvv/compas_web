import cls from './ProductPage.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ProductPageIntro } from '../../../components/MainComponents/ProductPageIntro';
import { ProductCatalog } from '../../../components/MainComponents/ProductCatalog';
import { ProductCta } from '../../../components/MainComponents/ProductCta';

interface IProductPageProps {
  className?: string;
}

const ProductPage = ({ className }: IProductPageProps) => {
  return (
    <main className={classNames(cls.page, {}, [className ?? ''])}>
      <ProductPageIntro />
      <ProductCatalog />
      <ProductCta />
    </main>
  )
}

export default ProductPage;
