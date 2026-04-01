import { ArrowRight } from 'lucide-react';
import cls from './About.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import objectImg from '../../../../../shared/assets/images/photos/object.jpg';
import { MainPageTitle } from '../../../../../shared/ui/MainPageTitle';

interface IAboutProps {
  className?: string;
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

export const About = ({ className }: IAboutProps) => {
  return (
    <section id="about" className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="about-title">
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.head, {}, [])}>
          <MainPageTitle
            id="about-title"
            title="О компании"
            sectionLabel="Раздел 01"
            sectionDescription="Строительство, ОДД и благоустройство"
          />
        </div>
        <div className={classNames(cls.introLayout, {}, [])}>
          <div className={classNames(cls.copyColumn, {}, [])}>
            <div className={classNames(cls.copyStack, {}, [])}>
              <p className={classNames(cls.primaryLead, {}, [])}>
                «Компас» — это системный подход к созданию городской и транспортной инфраструктуры. Мы превращаем
                строительные площадки в готовую жизненную среду.
              </p>
              <p className={classNames(cls.secondaryLead, {}, [])}>
                Как комплексный подрядчик, мы берем на себя полную ответственность за жизненный цикл проекта: от
                проектирования схем движения до финального благоустройства и установки малых архитектурных форм.
              </p>
            </div>

            <a href="#contact" className={classNames(cls.ctaButton, {}, [])}>
              Записаться
              <ArrowRight className={classNames(cls.ctaIcon, {}, [])} strokeWidth={2} />
            </a>
          </div>

          <div className={classNames(cls.visualPanel, {}, [])} aria-hidden>
            <img
              src={objectImg}
              alt=""
              className={classNames(cls.visualImage, {}, [])}
              loading="lazy"
            />
          </div>
        </div>

        <div className={classNames(cls.featuresSection, {}, [])}>
          <div className={classNames(cls.featuresHeading, {}, [])}>
            <span className={classNames(cls.featuresIndex, {}, [])}>*</span>
            <h3 className={classNames(cls.featuresHeadingTitle, {}, [])}>Что мы предлагаем</h3>
          </div>

          <ul className={classNames(cls.featuresGrid, {}, [])}>
            {keyFeatures.map((feature, index) => (
              <li key={feature.title} className={classNames(cls.featureCard, {}, [])}>
                <div className={classNames(cls.featureHead, {}, [])}>
                  <h4 className={classNames(cls.featureTitle, {}, [])}>{feature.title}</h4>
                  <span className={classNames(cls.featureNumber, {}, [])}>
                    ({String(index + 1).padStart(2, '0')})
                  </span>
                </div>
                <p className={classNames(cls.featureText, {}, [])}>{feature.text}</p>
                <span className={classNames(cls.featureLine, {}, [])} aria-hidden />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
