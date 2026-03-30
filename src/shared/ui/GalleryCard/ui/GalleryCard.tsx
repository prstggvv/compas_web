import { ArrowUpRight } from 'lucide-react';
import cls from './GalleryCard.module.css';
import { classNames } from '../../../lib/classNames/classNames';

export interface IGalleryCardProps {
  title: string;
  description: string;
  href: string;
  image: string;
  ctaLabel?: string;
  className?: string;
}

export const GalleryCard = ({
  title,
  description,
  href,
  image,
  ctaLabel = 'Подробнее',
  className,
}: IGalleryCardProps) => {
  return (
    <a href={href} className={classNames(cls.card, {}, [className ?? ''])}>
      <img className={classNames(cls.image, {}, [])} src={image} alt={title} loading="lazy" />
      <div className={classNames(cls.fadeTop, {}, [])} aria-hidden />
      <div className={classNames(cls.fadeBottom, {}, [])} aria-hidden />

      <div className={classNames(cls.top, {}, [])}>
        <div className={classNames(cls.headings, {}, [])}>
          <h3 className={classNames(cls.cardTitle, {}, [])}>{title}</h3>
          <p className={classNames(cls.subtitle, {}, [])}>{description}</p>
        </div>
        <span className={classNames(cls.iconCircle, {}, [])} aria-hidden>
          <ArrowUpRight className={classNames(cls.icon, {}, [])} strokeWidth={2} />
        </span>
      </div>

      <div className={classNames(cls.ctaBar, {}, [])}>
        <span className={classNames(cls.ctaText, {}, [])}>{ctaLabel}</span>
      </div>
    </a>
  );
};
