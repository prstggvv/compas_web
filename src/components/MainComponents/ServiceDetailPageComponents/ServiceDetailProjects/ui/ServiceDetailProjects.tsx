import cls from './ServiceDetailProjects.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import type { ServiceProjectItem } from '../../../../../shared/lib/constants';

interface ServiceDetailProjectsProps {
  className?: string;
  items: ServiceProjectItem[];
}

export const ServiceDetailProjects = ({ className, items }: ServiceDetailProjectsProps) => {
  return (
    <section className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="service-projects-title">
      <div className={classNames(cls.container, {}, [])}>
        <h2 id="service-projects-title" className={classNames(cls.title, {}, [])}>
          Примеры работ
        </h2>

        <div className={classNames(cls.grid, {}, [])}>
          {items.map((item) => (
            <article key={item.id} className={classNames(cls.card, {}, [])}>
              <img className={classNames(cls.image, {}, [])} src={item.image} alt={item.imageAlt} loading="lazy" />
              <div className={classNames(cls.overlay, {}, [])}>
                <span className={classNames(cls.label, {}, [])}>{item.label}</span>
                <h3 className={classNames(cls.cardTitle, {}, [])}>{item.title}</h3>
                <p className={classNames(cls.cardText, {}, [])}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
