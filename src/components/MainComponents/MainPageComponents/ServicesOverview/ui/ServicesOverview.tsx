import { ArrowRight, DraftingCompass, Factory, Hammer, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import cls from './ServicesOverview.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { servicesContent } from '../../../../../shared/lib/constants';
import { SectionUnderlineLink } from '../../../../../shared/ui/SectionUnderlineLink';
import { MainPageTitle } from '../../../../../shared/ui/MainPageTitle';

interface ServicesOverviewProps {
  className?: string;
}

const serviceIcons = {
  installation: Hammer,
  design: DraftingCompass,
  metal: Factory,
  tooling: Settings2,
} as const;

export const ServicesOverview = ({ className }: ServicesOverviewProps) => {
  return (
    <section
      id="services-overview"
      className={classNames(cls.section, {}, [className ?? ''])}
      aria-labelledby="services-overview-title"
    >
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.head, {}, [])}>
          <MainPageTitle
            id="services-overview-title"
            title="Наши услуги"
            sectionLabel="Раздел 02"
            sectionDescription="Проектирование, производство и монтаж"
          />
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
          {servicesContent.slice(0, 3).map((service) => {
            const Icon = serviceIcons[service.iconKey];

            return (
              <Link key={service.id} to={service.href} className={classNames(cls.card, {}, [])}>
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
