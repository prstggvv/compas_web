import { ArrowRight } from 'lucide-react';
import cls from './ServicesIntro.module.css';
import { classNames } from '../../../../shared/lib/classNames/classNames';

interface ServicesIntroProps {
  className?: string;
}

type ServiceVariant = 'installation' | 'design' | 'metal' | 'tooling';

const serviceItems = [
  {
    title: 'Строительно-монтажные работы',
    text: 'Профессиональная установка дорожных знаков, барьерных ограждений и нанесение разметки любой сложности.',
    variant: 'installation' as const,
  },
  {
    title: 'Проектирование и аудит',
    text: 'Разработка комплексных схем организации дорожного движения и аудит безопасности транспортных узлов.',
    variant: 'design' as const,
  },
  {
    title: 'Металлообработка',
    text: 'Резка, сварка, гибка и изготовление конструкций под требования конкретного объекта.',
    variant: 'metal' as const,
  },
  {
    title: 'Оснастка и пресс-формы',
    text: 'Производство технологической оснастки и пресс-форм под серийные изделия и индивидуальные задачи.',
    variant: 'tooling' as const,
  },
] as const;

const ServiceIcon = ({ variant }: { variant: ServiceVariant }) => {
  if (variant === 'installation') {
    return (
      <svg className={cls.serviceIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M6 19.5V9.5L12 4.5v15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 8h6v11.5h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 14h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === 'design') {
    return (
      <svg className={cls.serviceIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 17 16.5 5.5 19 8 7.5 19.5H5V17z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12.5 8.5 16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === 'metal') {
    return (
      <svg className={cls.serviceIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 8v8a2 2 0 0 0 2 2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 18v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={cls.serviceIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="5" width="14" height="14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export const ServicesIntro = ({ className }: ServicesIntroProps) => {
  return (
    <section id="services" className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="services-title">
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.head, {}, [])}>
          <span className={classNames(cls.kicker, {}, [])}>ЭКСПЕРТИЗА</span>
          <h1 id="services-title" className={classNames(cls.title, {}, [])}>
            Услуги
          </h1>
        </div>

        <div className={classNames(cls.intro, {}, [])}>
          <p className={classNames(cls.leadText, {}, [])}>
            Мы предлагаем полный цикл работ по обустройству дорожной инфраструктуры и организации дорожного движения —
            от проектирования до монтажа и обслуживания.
          </p>
        </div>

        <div className={classNames(cls.servicesList, {}, [])}>
          {serviceItems.map((item) => (
            <article key={item.title} className={classNames(cls.serviceRow, {}, [])}>
              <div className={classNames(cls.serviceIconWrap, {}, [])}>
                <ServiceIcon variant={item.variant} />
              </div>

              <div className={classNames(cls.serviceContent, {}, [])}>
                <h2 className={classNames(cls.serviceTitle, {}, [])}>{item.title}</h2>
                <p className={classNames(cls.serviceText, {}, [])}>{item.text}</p>
              </div>

              <span className={classNames(cls.serviceArrow, {}, [])} aria-hidden>
                <ArrowRight className={classNames(cls.serviceArrowIcon, {}, [])} strokeWidth={2} />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
