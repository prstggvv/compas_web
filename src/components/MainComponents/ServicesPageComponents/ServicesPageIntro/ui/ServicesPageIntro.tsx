import { Link } from 'react-router-dom';
import cls from './ServicesPageIntro.module.css';
import Titles from '../../../../../shared/ui/Titles/Titles';
import { classNames } from '../../../../../shared/lib/classNames/classNames';

interface ServicesPageIntroProps {
  className?: string;
}

export const ServicesPageIntro = ({ className }: ServicesPageIntroProps) => {
  return (
    <section className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="services-page-title">
      <div className={classNames(cls.container, {}, [])}>
        <nav className={classNames(cls.breadcrumbs, {}, [])} aria-label="Хлебные крошки">
          <Link to="/" className={classNames(cls.breadcrumbLink, {}, [])}>
            Главная
          </Link>
          <span className={classNames(cls.breadcrumbDivider, {}, [])} aria-hidden>
            /
          </span>
          <span className={classNames(cls.breadcrumbCurrent, {}, [])}>Услуги</span>
        </nav>

        <Titles
          className={classNames(cls.titleBlock, {}, [])}
          title="Услуги"
          description="Полный цикл работ по дорожной инфраструктуре: от проектирования и аудита до производства, монтажа и сопровождения объекта."
          descriptionTone="muted"
          align="left"
          as="h1"
        />
      </div>
    </section>
  );
};
