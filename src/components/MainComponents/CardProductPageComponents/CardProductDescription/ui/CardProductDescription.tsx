import cls from './CardProductDescription.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';

interface CardProductDescriptionProps {
  className?: string;
  title?: string;
  paragraphs: string[];
}

export const CardProductDescription = ({
  className,
  title = 'Описание',
  paragraphs,
}: CardProductDescriptionProps) => {
  return (
    <section className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="card-product-description">
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.layout, {}, [])}>
          <h2 id="card-product-description" className={classNames(cls.title, {}, [])}>
            {title}
          </h2>

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
