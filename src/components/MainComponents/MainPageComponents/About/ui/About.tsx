import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import cls from './About.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import objectImg from '../../../../../shared/assets/images/photos/object.jpg';
import { MainPageTitle } from '../../../../../shared/ui/MainPageTitle';
import { createStaggerContainer, MOTION_EASE, VIEWPORT_ONCE } from '../../../../../shared/lib/motion';

interface IAboutProps {
  className?: string;
  onOpenContactPopup?: () => void;
}

const keyFeatures = [
  {
    title: 'Устройство дорог, проездов, парковок',
    text: 'Строим и приводим в порядок дорожные покрытия под жилые, коммерческие и инфраструктурные объекты.',
  },
  {
    title: 'Монтаж барьерных и пешеходных ограждений',
    text: 'Устанавливаем системы безопасности и направляющие элементы под требования участка и трафика.',
  },
  {
    title: 'Установка дорожных знаков, ТОДД, светофоров',
    text: 'Подготавливаем и монтируем оборудование организации движения с учетом норм и схем.',
  },
  {
    title: 'Устройство тротуаров, велодорожек, съездов',
    text: 'Формируем безопасные пешеходные и транспортные связи вокруг объекта и внутри территории.',
  },
  {
    title: 'Благоустройство въездных групп и уличного освещения',
    text: 'Комплексно оформляем входные зоны и повышаем удобство эксплуатации пространства.',
  },
  {
    title: 'Производство и монтаж остановок, МАФ',
    text: 'Изготавливаем и устанавливаем остановочные павильоны и малые архитектурные формы.',
  },
  {
    title: 'Спортивные площадки',
    text: 'Обустраиваем функциональные площадки с покрытием, ограждениями и сопутствующей инфраструктурой.',
  },
  {
    title: 'Шумозащитные экраны при необходимости',
    text: 'Подбираем и монтируем решения для снижения шумовой нагрузки на прилегающие территории.',
  },
  {
    title: 'Проектирование ОДД',
    text: 'Разрабатываем схемы и документацию для организации дорожного движения под конкретную задачу.',
  },
] as const;

const aboutViewport = {
  ...VIEWPORT_ONCE,
  amount: 0.18,
} as const;

const aboutSectionStagger = createStaggerContainer(0.1, 0.04);
const aboutListStagger = createStaggerContainer(0.08, 0.06);

const aboutReveal = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: MOTION_EASE,
    },
  },
} as const;

const aboutRevealSoft = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: MOTION_EASE,
    },
  },
} as const;

const aboutImageReveal = {
  hidden: { opacity: 0, scale: 0.975, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: MOTION_EASE,
    },
  },
} as const;

export const About = ({ className, onOpenContactPopup }: IAboutProps) => {
  return (
    <motion.section
      id="about"
      className={classNames(cls.section, {}, [className ?? ''])}
      aria-labelledby="about-title"
      initial="hidden"
      whileInView="visible"
      viewport={aboutViewport}
      variants={aboutSectionStagger}
    >
      <div className={classNames(cls.container, {}, [])}>
        <motion.div className={classNames(cls.head, {}, [])} variants={aboutRevealSoft}>
          <MainPageTitle
            id="about-title"
            title="О компании"
            sectionLabel="Раздел 01"
            sectionDescription="Строительство, ОДД и благоустройство"
          />
        </motion.div>
        <div className={classNames(cls.introLayout, {}, [])}>
          <motion.div className={classNames(cls.copyColumn, {}, [])} variants={aboutReveal}>
            <motion.div className={classNames(cls.copyStack, {}, [])} variants={aboutListStagger}>
              <motion.p className={classNames(cls.primaryLead, {}, [])} variants={aboutRevealSoft}>
                «Компас» — это системный подход к созданию городской и транспортной инфраструктуры. Мы превращаем
                строительные площадки в готовую жизненную среду.
              </motion.p>
              <motion.p className={classNames(cls.secondaryLead, {}, [])} variants={aboutRevealSoft}>
                Как комплексный подрядчик, мы берем на себя полную ответственность за жизненный цикл проекта: от
                проектирования схем движения до финального благоустройства и установки малых архитектурных форм.
              </motion.p>
            </motion.div>

            <motion.button
              type="button"
              className={classNames(cls.ctaButton, {}, [])}
              variants={aboutRevealSoft}
              onClick={onOpenContactPopup}
            >
              Записаться
              <ArrowRight className={classNames(cls.ctaIcon, {}, [])} strokeWidth={2} />
            </motion.button>
          </motion.div>

          <motion.div className={classNames(cls.visualPanel, {}, [])} aria-hidden variants={aboutImageReveal}>
            <img
              src={objectImg}
              alt=""
              className={classNames(cls.visualImage, {}, [])}
              loading="lazy"
            />
          </motion.div>
        </div>

        <motion.div className={classNames(cls.featuresSection, {}, [])} variants={aboutReveal}>
          <div className={classNames(cls.featuresHeading, {}, [])}>
            <span className={classNames(cls.featuresIndex, {}, [])}>*</span>
            <h3 className={classNames(cls.featuresHeadingTitle, {}, [])}>Что мы предлагаем</h3>
          </div>

          <motion.ul className={classNames(cls.featuresGrid, {}, [])} variants={aboutListStagger}>
            {keyFeatures.map((feature, index) => (
              <motion.li key={feature.title} className={classNames(cls.featureCard, {}, [])} variants={aboutRevealSoft}>
                <div className={classNames(cls.featureHead, {}, [])}>
                  <h4 className={classNames(cls.featureTitle, {}, [])}>{feature.title}</h4>
                  <span className={classNames(cls.featureNumber, {}, [])}>
                    ({String(index + 1).padStart(2, '0')})
                  </span>
                </div>
                <p className={classNames(cls.featureText, {}, [])}>{feature.text}</p>
                <span className={classNames(cls.featureLine, {}, [])} aria-hidden />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.section>
  );
};
