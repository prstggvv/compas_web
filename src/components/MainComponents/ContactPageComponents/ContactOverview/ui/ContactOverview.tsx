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
    value: '+7 (911) 995 03 49',
    href: 'tel:+79119950349',
    isLink: true,
  },
  {
    label: 'Электронная почта',
    value: 'kompaskrim@mail.ru',
    href: 'mailto:kompaskrim@mail.ru',
    isLink: true,
    underlined: true,
  },
  {
    label: 'Офис',
    value: 'г. Симферополь, просп. Победы, 109А',
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
                src="https://yandex.com/map-widget/v1/?ll=34.127123%2C44.965759&mode=whatshere&utm_source=share&whatshere%5Bpoint%5D=34.127123%2C44.965758&whatshere%5Bzoom%5D=17&z=16"
                title="Офис Компас на карте"
                loading="lazy"
                allowFullScreen
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
