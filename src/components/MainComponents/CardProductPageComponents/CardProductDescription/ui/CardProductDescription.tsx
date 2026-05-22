import cls from './CardProductDescription.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';

interface CardProductDescriptionProps {
  className?: string;
  title?: string;
  accentLabel?: string;
  items: string[];
  paragraphs: string[];
}

export const CardProductDescription = ({
  className,
  title = 'В ассортименте',
  accentLabel = 'Список изделий',
  items,
  paragraphs,
}: CardProductDescriptionProps) => {
  return (
    <section className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="card-product-description">
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.layout, {}, [])}>
          <div className={classNames(cls.head, {}, [])}>
            <h2 id="card-product-description" className={classNames(cls.title, {}, [])}>
              {title}
            </h2>
            <span className={classNames(cls.accentLabel, {}, [])}>{accentLabel}</span>
          </div>

          <div className={classNames(cls.grid, {}, [])}>
            {items.map((item) => (
              <div key={item} className={classNames(cls.item, {}, [])}>
                <span className={classNames(cls.itemDot, {}, [])} aria-hidden />
                <span className={classNames(cls.itemText, {}, [])}>{item}</span>
              </div>
            ))}
          </div>

          <div className={classNames(cls.content, {}, [])}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className={classNames(cls.paragraph, {}, [])}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
