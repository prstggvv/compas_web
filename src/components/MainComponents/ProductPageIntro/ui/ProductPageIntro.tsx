import { Link } from 'react-router-dom';
import cls from './ProductPageIntro.module.css';
import Titles from '../../../../shared/ui/Titles/Titles';
import { classNames } from '../../../../shared/lib/classNames/classNames';

interface ProductPageIntroProps {
  className?: string;
}

export const ProductPageIntro = ({ className }: ProductPageIntroProps) => {
  return (
    <section className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="product-page-title">
      <div className={classNames(cls.container, {}, [])}>
        <nav className={classNames(cls.breadcrumbs, {}, [])} aria-label="Хлебные крошки">
          <Link to="/" className={classNames(cls.breadcrumbLink, {}, [])}>
            Главная
          </Link>
          <span className={classNames(cls.breadcrumbDivider, {}, [])} aria-hidden>
            /
          </span>
          <span className={classNames(cls.breadcrumbCurrent, {}, [])}>Товары</span>
        </nav>

        <Titles
          className={classNames(cls.titleBlock, {}, [])}
          title="Товары"
          description="Поставка продукции для дорожной и городской инфраструктуры. Комплексные решения для проектов любой сложности."
          descriptionTone="muted"
          align="left"
          as="h1"
        />
      </div>
    </section>
  );
};
