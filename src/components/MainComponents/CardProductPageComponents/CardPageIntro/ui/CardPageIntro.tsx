import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import cls from './CardPageIntro.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';

interface CardPageIntroProps {
  className?: string;
  currentLabel: string;
  onBack: () => void;
}

export const CardPageIntro = ({ className, currentLabel, onBack }: CardPageIntroProps) => {
  return (
    <section className={classNames(cls.section, {}, [className ?? ''])} aria-label="Навигация по странице товара">
      <div className={classNames(cls.container, {}, [])}>
        <nav className={classNames(cls.breadcrumbs, {}, [])} aria-label="Хлебные крошки">
          <Link to="/" className={classNames(cls.breadcrumbLink, {}, [])}>
            Главная
          </Link>
          <span className={classNames(cls.breadcrumbDivider, {}, [])} aria-hidden>
            /
          </span>
          <Link to="/product" className={classNames(cls.breadcrumbLink, {}, [])}>
            Товары
          </Link>
          <span className={classNames(cls.breadcrumbDivider, {}, [])} aria-hidden>
            /
          </span>
          <span className={classNames(cls.breadcrumbCurrent, {}, [])}>{currentLabel}</span>
        </nav>

        <button type="button" className={classNames(cls.backButton, {}, [])} onClick={onBack}>
          <ChevronLeft className={classNames(cls.backIcon, {}, [])} strokeWidth={1.8} aria-hidden />
          <span>Назад к каталогу</span>
        </button>
      </div>
    </section>
  );
};
