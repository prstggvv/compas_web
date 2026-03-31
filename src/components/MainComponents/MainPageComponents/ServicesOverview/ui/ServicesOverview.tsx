import { ArrowRight, DraftingCompass, Factory, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';
import cls from './ServicesOverview.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { SectionUnderlineLink } from '../../../../../shared/ui/SectionUnderlineLink';

interface ServicesOverviewProps {
  className?: string;
}

const services = [
  {
    id: 'construction',
    title: 'Строительно-монтажные работы',
    description: 'Профессиональная установка дорожных знаков, барьерных ограждений и нанесение разметки.',
    to: '/services/construction',
    Icon: Hammer,
  },
  {
    id: 'design',
    title: 'Проектирование и аудит',
    description: 'Разработка комплексных схем организации дорожного движения (ПОДД) и аудит текущей инфраструктуры объектов.',
    to: '/services/design',
    Icon: DraftingCompass,
  },
  {
    id: 'metal',
    title: 'Металлообработка',
    description: 'Резка, сварка, гибка и изготовление конструкций под требования конкретного объекта.',
    to: '/services/metal',
    Icon: Factory,
  },
] as const;

export const ServicesOverview = ({ className }: ServicesOverviewProps) => {
  return (
    <section
      id="services-overview"
      className={classNames(cls.section, {}, [className ?? ''])}
      aria-labelledby="services-overview-title"
    >
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.head, {}, [])}>
          <span className={classNames(cls.kicker, {}, [])}>Услуги</span>
          <h2 id="services-overview-title" className={classNames(cls.title, {}, [])}>
            Что мы делаем
          </h2>
        </div>

        <div className={classNames(cls.intro, {}, [])}>
          <p className={classNames(cls.leadText, {}, [])}>
            От проектирования и обследования до производства, монтажа и выпуска оснастки под конкретные задачи
            объекта.
          </p>
        </div>

        <div className={classNames(cls.afterIntro, {}, [])}>
          <SectionUnderlineLink to="/services" label="Все услуги" />
        </div>

        <div className={classNames(cls.grid, {}, [])}>
          {services.map((service) => {
            const Icon = service.Icon;

            return (
              <Link key={service.id} to={service.to} className={classNames(cls.card, {}, [])}>
                <article className={classNames(cls.cardInner, {}, [])}>
                  <div className={classNames(cls.iconWrap, {}, [])}>
                    <Icon className={classNames(cls.icon, {}, [])} strokeWidth={1.6} aria-hidden />
                  </div>

                  <h3 className={classNames(cls.cardTitle, {}, [])}>{service.title}</h3>
                  <p className={classNames(cls.cardText, {}, [])}>{service.description}</p>

                  <div className={classNames(cls.cardLink, {}, [])}>
                    <span>Подробнее</span>
                    <ArrowRight className={classNames(cls.cardLinkIcon, {}, [])} strokeWidth={2} aria-hidden />
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
