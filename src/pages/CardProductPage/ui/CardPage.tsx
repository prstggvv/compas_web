import { CardProductPageHero } from '../../../components/MainComponents/CardProductPageComponents/CardPageHero';
import { CardProductDescription } from '../../../components/MainComponents/CardProductPageComponents/CardProductDescription';
import { CardProductShowcase } from '../../../components/MainComponents/CardProductPageComponents/CardProductShowcase';
import type { CardProductContent } from '../model/cardProducts';
import cls from './CardPage.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';

interface ICardPageProps {
  className?: string;
  product: CardProductContent;
  activeImageId: string;
  onBack: () => void;
  onImageChange: (imageId: string) => void;
}

const CardPage = ({ className, product, activeImageId, onBack, onImageChange }: ICardPageProps) => {
  return (
    <main className={classNames(cls.page, {}, [className ?? ''])}>
      <CardProductPageHero currentLabel={product.title} onBack={onBack} />
      <CardProductShowcase product={product} activeImageId={activeImageId} onImageChange={onImageChange} />
      <CardProductDescription paragraphs={product.description} />
    </main>
  );
};

export default CardPage;
