import { ArrowRight } from 'lucide-react';
import cls from './CardProductShowcase.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import type { ProductCategoryContent } from '../../../ProductPageComponents/ProductCatalog/ui/products';

interface CardProductShowcaseProps {
  className?: string;
  product: ProductCategoryContent;
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
  const previewImages = product.gallery.filter((image) => image.id !== activeImage.id).slice(0, 2);

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
              {previewImages.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  className={classNames(cls.thumbButton, {}, [])}
                  onClick={() => onImageChange(image.id)}
                  aria-label={`Показать изображение: ${image.alt}`}
                >
                  <img className={classNames(cls.thumbImage, {}, [])} src={image.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <aside className={classNames(cls.content, {}, [])}>
            <div className={classNames(cls.panel, {}, [])}>
              <p className={classNames(cls.category, {}, [])}>{product.label}</p>
              <h1 id="card-product-title" className={classNames(cls.title, {}, [])}>
                {product.title}
              </h1>
              <h2 className={classNames(cls.specHeading, {}, [])}>Спецификация категории</h2>
              <p className={classNames(cls.lead, {}, [])}>{product.lead}</p>

              <dl className={classNames(cls.specs, {}, [])}>
                {product.specs.map((spec) => (
                  <div key={spec.label} className={classNames(cls.specRow, {}, [])}>
                    <dt className={classNames(cls.specLabel, {}, [])}>{spec.label}</dt>
                    <dd className={classNames(cls.specValue, {}, [])}>{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <ul className={classNames(cls.statuses, {}, [])} aria-label="Преимущества поставки">
                {product.statuses.map((status) => (
                  <li key={status.id} className={classNames(cls.statusItem, {}, [])}>
                    {status.label}
                  </li>
                ))}
              </ul>

              <div className={classNames(cls.actions, {}, [])}>
                <button type="button" className={classNames(cls.primaryButton, {}, [])}>
                  <span>Запросить КП</span>
                  <ArrowRight className={classNames(cls.buttonIcon, {}, [])} strokeWidth={1.8} aria-hidden />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
