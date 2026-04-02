import { ArrowRight, Building2, CarFront, Compass, Warehouse } from 'lucide-react';
import { motion } from 'framer-motion';
import cls from './Solutions.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import signsImg from '../../../../../shared/assets/images/photos/signs.jpg';
import markingsImg from '../../../../../shared/assets/images/photos/markings.jpg';
import nerovnostImg from '../../../../../shared/assets/images/photos/nerovnost.jpg';
import { MainPageTitle } from '../../../../../shared/ui/MainPageTitle';
import { fadeUp, fadeUpSoft, scaleFadeIn, VIEWPORT_ONCE } from '../../../../../shared/lib/motion';

interface ISolutionsProps {
  className?: string;
}

const cases = [
  {
    id: 'res-1',
    category: 'Жилой комплекс',
    Icon: Building2,
    title: 'ЖК «Северный»: порядок на придомовой территории',
    moment:
      'Схему согласовали с УК до заказа: так не пришлось переделывать разметку после первого же рейса сервиса.',
    text: 'Скомпоновали знаки и разметку так, чтобы жильцы и сервисный транспорт не пересекались по одной полосе. Согласовали схему с управляющей компанией и закрепили поставку и монтаж в одном графике.',
    image: signsImg,
    imageAlt: 'Дорожные знаки на придомовой территории',
    imageFirst: false,
  },
  {
    id: 'res-2',
    category: 'Логистика',
    Icon: Warehouse,
    title: 'Логистический хаб: безопасный разворот и разгрузка',
    moment:
      'Въезд не расширяли: за счёт схемы разметки и неровностей развели потоки в уже существующей геометрии.',
    text: 'Разделили потоки грузовиков и легкового транспорта, добавили предупредительную разметку и неровности на въезде. Снизили риск конфликтов на пике смены без расширения проезда.',
    image: markingsImg,
    imageAlt: 'Разметка на территории логистического объекта',
    imageFirst: true,
  },
  {
    id: 'res-3',
    category: 'Парковка',
    Icon: CarFront,
    title: 'Городская парковка: контроль скорости у пешеходов',
    moment:
      'Высоту и шаг неровностей подобрали так, чтобы спецтехника для обслуживания проезжала без «дребезга» кузова.',
    text: 'Установили искусственные неровности и зону знаков у перехода к ТЦ. Подобрали высоту и шаг под нормы, чтобы не мешать спецтехнике при обслуживании.',
    image: nerovnostImg,
    imageAlt: 'Искусственная неровность на въезде в парковку',
    imageFirst: false,
  },
] as const;

export const Solutions = ({ className }: ISolutionsProps) => {
  return (
    <section
      id="solutions"
      className={classNames(cls.section, {}, [className ?? ''])}
      aria-labelledby="solutions-title"
    >
      <div className={classNames(cls.container, {}, [])}>
        <motion.div
          className={classNames(cls.head, {}, [])}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUpSoft}
        >
          <MainPageTitle
            id="solutions-title"
            title="Наши решения"
            sectionLabel="Раздел 03"
            sectionDescription="Реализованные объекты и логика движения"
          />
        </motion.div>

        <motion.div
          className={classNames(cls.intro, {}, [])}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
        >
          <p className={classNames(cls.leadText, {}, [])}>
            Подбираем комплект знаков, разметки и элементов инфраструктуры под сценарий движения: от жилых кварталов до
            логистики и городских парковок. Ниже — примеры реализованных проектов.
          </p>
          <div className={classNames(cls.ctaWrap, {}, [])}>
            <a href="#catalog" className={classNames(cls.cta, {}, [])}>
              Весь каталог
              <ArrowRight className={classNames(cls.ctaIcon, {}, [])} strokeWidth={2} aria-hidden />
            </a>
          </div>
        </motion.div>

        <ul className={classNames(cls.list, {}, [])}>
          {cases.map((item) => {
            const Icon = item.Icon;
            return (
              <motion.li
                key={item.id}
                className={classNames(cls.row, {}, [
                  item.imageFirst ? cls.rowImageLeft : cls.rowImageRight,
                ])}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                variants={fadeUp}
              >
                <motion.div className={classNames(cls.textCol, {}, [])} variants={fadeUpSoft}>
                  <span className={classNames(cls.category, {}, [])}>
                    <Icon className={classNames(cls.categoryIcon, {}, [])} strokeWidth={2} aria-hidden />
                    {item.category}
                  </span>
                  <h3 className={classNames(cls.rowTitle, {}, [])}>{item.title}</h3>
                  <aside
                    className={classNames(cls.moment, {}, [])}
                    aria-labelledby={`${item.id}-moment-label`}
                  >
                    <div className={classNames(cls.momentMark, {}, [])} aria-hidden>
                      <Compass className={classNames(cls.momentMarkIcon, {}, [])} strokeWidth={1.75} />
                    </div>
                    <div className={classNames(cls.momentCopy, {}, [])}>
                      <span id={`${item.id}-moment-label`} className={classNames(cls.momentEyebrow, {}, [])}>
                        Интересный момент
                      </span>
                      <p className={classNames(cls.momentText, {}, [])}>{item.moment}</p>
                    </div>
                  </aside>
                  <p className={classNames(cls.rowText, {}, [])}>{item.text}</p>
                </motion.div>
                <motion.div className={classNames(cls.imageCol, {}, [])} variants={scaleFadeIn}>
                  <div className={classNames(cls.visual, {}, [])}>
                    <div className={classNames(cls.imageClip, {}, [])}>
                      <img
                        className={classNames(cls.photo, {}, [])}
                        src={item.image}
                        alt={item.imageAlt}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
