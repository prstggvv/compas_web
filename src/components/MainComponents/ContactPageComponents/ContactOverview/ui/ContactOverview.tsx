import { motion } from 'framer-motion';
import cls from './ContactOverview.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { fadeUp, fadeUpSoft, scaleFadeIn, VIEWPORT_ONCE } from '../../../../../shared/lib/motion';

interface ContactOverviewProps {
  className?: string;
}

interface ContactItem {
  label: string;
  value: string;
  isLink: boolean;
  href?: string;
  underlined?: boolean;
}

const contactItems: ContactItem[] = [
  {
    label: 'Телефон',
    value: '8 (800) 555-35-35',
    href: 'tel:88005553535',
    isLink: true,
  },
  {
    label: 'Электронная почта',
    value: 'info@compass-dor.ru',
    href: 'mailto:info@compass-dor.ru',
    isLink: true,
    underlined: true,
  },
  {
    label: 'Офис',
    value: 'г. Москва, БЦ «Основа»\nПресненская наб., 12',
    isLink: false,
  },
  {
    label: 'Режим работы',
    value: 'Пн-Пт - 09:00-18:00',
    isLink: false,
  },
] as const;

export const ContactOverview = ({ className }: ContactOverviewProps) => {
  return (
    <motion.section
      className={classNames(cls.section, {}, [className ?? ''])}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={fadeUp}
    >
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.layout, {}, [])}>
          <motion.div className={classNames(cls.infoColumn, {}, [])} variants={fadeUpSoft}>
            <div className={classNames(cls.infoStack, {}, [])}>
              {contactItems.map((item) => (
                <div key={item.label} className={classNames(cls.infoItem, {}, [])}>
                  <span className={classNames(cls.label, {}, [])}>{item.label}</span>
                  {item.isLink ? (
                    <a
                      href={item.href}
                      className={classNames(cls.linkValue, { [cls.linkValueUnderlined]: Boolean(item.underlined) }, [])}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className={classNames(cls.textValue, {}, [])}>
                      {item.value.split('\n').map((line) => (
                        <span key={line} className={classNames(cls.textLine, {}, [])}>
                          {line}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className={classNames(cls.mapColumn, {}, [])} variants={scaleFadeIn}>
            <div className={classNames(cls.mapWrap, {}, [])}>
              <div className={classNames(cls.mapMeta, {}, [])} aria-hidden>
                <div className={classNames(cls.mapMetaRow, {}, [])}>
                  <span>55.7492 N</span>
                  <span>37.5376 E</span>
                </div>
                <div className={classNames(cls.mapMetaRow, {}, [])}>
                  <span>GRID_REF: MSK_C</span>
                  <span>V.104.22</span>
                </div>
              </div>

              <iframe
                className={classNames(cls.mapFrame, {}, [])}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.4304851216335!2d37.534888877239334!3d55.749216091910245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54bd3866299b9%3A0x6e25679901777d12!2z0J_RgNC10YHQvdC10L3RgdC60LDRjyDQvdCw0LEuLCAxMiwg0JzQvtGB0LrQstCwLCAxMjMxMTI!5e0!3m2!1sru!2sru!4v1700000000000!5m2!1sru!2sru"
                title="Офис Компас на карте"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className={classNames(cls.mapBadge, {}, [])}>
                <span className={classNames(cls.mapBadgeDot, {}, [])} aria-hidden />
                <span className={classNames(cls.mapBadgeText, {}, [])}>Active Node</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
