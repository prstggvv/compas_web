import cls from './ServicesProducts.module.css';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { GalleryCard } from '../../../../shared/ui/GalleryCard';
import { SectionUnderlineLink } from '../../../../shared/ui/SectionUnderlineLink';
import signsImg from '../../../../shared/assets/images/photos/signs.jpg';
import markingsImg from '../../../../shared/assets/images/photos/markings.jpg';
import nerovnostImg from '../../../../shared/assets/images/photos/nerovnost.jpg';

interface IServicesProductsProps {
  className?: string;
}

const items = [
  {
    id: 'signs',
    title: 'Дорожные знаки',
    description: 'Производство и монтаж по ГОСТ',
    href: '#contact',
    image: signsImg,
  },
  {
    id: 'markings',
    title: 'Разметка и пластик',
    description: 'Организация движения на объекте',
    href: '#contact',
    image: markingsImg,
  },
  {
    id: 'speed',
    title: 'Искусственные неровности',
    description: 'Безопасность на въездах и парковках',
    href: '#contact',
    image: nerovnostImg,
  },
] as const;

export const ServicesProducts = ({ className }: IServicesProductsProps) => {
  return (
    <section id="catalog" className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="catalog-title">
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.head, {}, [])}>
          <span className={classNames(cls.kicker, {}, [])}>Товары</span>
          <h2 id="catalog-title" className={classNames(cls.title, {}, [])}>
            Товары и продукция
          </h2>
        </div>

        <div className={classNames(cls.intro, {}, [])}>
          <p className={classNames(cls.leadText, {}, [])}>
            Производим и монтируем знаки, разметку, искусственные неровности и изделия из пластика. Выберите
            направление или перейдите в полный каталог.
          </p>
        </div>

        <div className={classNames(cls.afterIntro, {}, [])}>
          <SectionUnderlineLink to="/product" label="Все услуги" />
        </div>

        <div className={classNames(cls.grid, {}, [])}>
          {items.map((item) => (
            <GalleryCard
              key={item.id}
              title={item.title}
              description={item.description}
              href={item.href}
              image={item.image}
              ctaLabel="Подробнее"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
