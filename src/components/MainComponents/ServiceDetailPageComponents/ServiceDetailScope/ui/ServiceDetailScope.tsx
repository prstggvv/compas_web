import cls from './ServiceDetailScope.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import type { ServiceWorkItem } from '../../../../../shared/lib/constants';

interface ServiceDetailScopeProps {
  className?: string;
  title: string;
  items: ServiceWorkItem[];
  image: string;
  imageAlt: string;
}

export const ServiceDetailScope = ({
  className,
  title,
  items,
  image,
  imageAlt,
}: ServiceDetailScopeProps) => {
  return (
    <section className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="service-scope-title">
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.grid, {}, [])}>
          <div className={classNames(cls.copy, {}, [])}>
            <h2 id="service-scope-title" className={classNames(cls.title, {}, [])}>
              {title}
            </h2>

            <div className={classNames(cls.list, {}, [])}>
              {items.map((item) => (
                <article key={item.title} className={classNames(cls.item, {}, [])}>
                  <h3 className={classNames(cls.itemTitle, {}, [])}>{item.title}</h3>
                  <p className={classNames(cls.itemText, {}, [])}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className={classNames(cls.mediaWrap, {}, [])}>
            <img className={classNames(cls.image, {}, [])} src={image} alt={imageAlt} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};
