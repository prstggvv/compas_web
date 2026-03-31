import { ArrowRight, Download } from 'lucide-react';
import cls from './CardProductShowcase.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import type { CardProductContent } from '../../../../../pages/CardProductPage/model/cardProducts';

interface CardProductShowcaseProps {
  className?: string;
  product: CardProductContent;
  activeImageId: string;
  onImageChange: (imageId: string) => void;
}

export const CardProductShowcase = ({
  className,
  product,
  activeImageId,
  onImageChange,
}: CardProductShowcaseProps) => {
  const activeImage =
    product.gallery.find((image) => image.id === activeImageId) ?? product.gallery[0];

  return (
    <section className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="card-product-title">
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.layout, {}, [])}>
          <div className={classNames(cls.galleryColumn, {}, [])}>
            <figure className={classNames(cls.mainMedia, {}, [])}>
              <img
                className={classNames(cls.mainImage, {}, [])}
                src={activeImage.src}
                alt={activeImage.alt}
                loading="eager"
              />
              <figcaption className={classNames(cls.articleBadge, {}, [])}>Арт: {product.article}</figcaption>
            </figure>

            <div className={classNames(cls.thumbGrid, {}, [])} aria-label="Галерея товара">
              {product.gallery.map((image) => {
                const isActive = image.id === activeImageId;

                return (
                  <button
                    key={image.id}
                    type="button"
                    className={classNames(cls.thumbButton, { [cls.thumbButtonActive]: isActive }, [])}
                    onClick={() => onImageChange(image.id)}
                    aria-label={`Показать изображение: ${image.alt}`}
                    aria-pressed={isActive}
                  >
                    <img className={classNames(cls.thumbImage, {}, [])} src={image.src} alt="" loading="lazy" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className={classNames(cls.content, {}, [])}>
            <p className={classNames(cls.category, {}, [])}>{product.categoryLabel}</p>
            <h1 id="card-product-title" className={classNames(cls.title, {}, [])}>
              {product.title}
            </h1>
            <p className={classNames(cls.lead, {}, [])}>{product.lead}</p>

            <dl className={classNames(cls.specs, {}, [])}>
              {product.specs.map((spec) => (
                <div key={spec.label} className={classNames(cls.specRow, {}, [])}>
                  <dt className={classNames(cls.specLabel, {}, [])}>{spec.label}</dt>
                  <dd className={classNames(cls.specValue, {}, [])}>{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className={classNames(cls.actions, {}, [])}>
              <button type="button" className={classNames(cls.primaryButton, {}, [])}>
                <span>Запросить КП</span>
                <ArrowRight className={classNames(cls.buttonIcon, {}, [])} strokeWidth={1.8} aria-hidden />
              </button>
              <button type="button" className={classNames(cls.secondaryButton, {}, [])}>
                <Download className={classNames(cls.buttonIcon, {}, [])} strokeWidth={1.8} aria-hidden />
                <span>Тех. лист PDF</span>
              </button>
            </div>

            <ul className={classNames(cls.statuses, {}, [])} aria-label="Преимущества поставки">
              {product.statuses.map((status) => (
                <li key={status.id} className={classNames(cls.statusItem, {}, [])}>
                  {status.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
