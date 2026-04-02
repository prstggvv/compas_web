import { motion } from 'framer-motion';
import cls from './ProductCta.module.css';
import { classNames } from '../../../../shared/lib/classNames/classNames';

interface ProductCtaProps {
  className?: string;
  title?: string;
  text?: string;
  buttonLabel?: string;
  sectionId?: string;
  onOpenContactPopup?: () => void;
}

export const ProductCta = ({
  className,
  title = 'Не нашли нужный товар?',
  text = 'Мы осуществляем поставки нестандартного оборудования и производим продукцию по индивидуальным чертежам заказчика.',
  buttonLabel = 'Оставить заявку',
  sectionId = 'page-cta',
  onOpenContactPopup,
}: ProductCtaProps) => {
  const titleId = `${sectionId}-title`;

  return (
    <section className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby={titleId}>
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.panel, {}, [])}>
          <div className={classNames(cls.copy, {}, [])}>
            <h2 id={titleId} className={classNames(cls.title, {}, [])}>{title}</h2>
            <p className={classNames(cls.text, {}, [])}>{text}</p>
          </div>

          <motion.button
            type="button"
            className={classNames(cls.button, {}, [])}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={onOpenContactPopup}
          >
            <span>{buttonLabel}</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
