import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import cls from './ServicesIntro.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { servicesContent, type ServiceIconKey } from '../../../../../shared/lib/constants';

interface ServicesIntroProps {
  className?: string;
}

const ServiceIcon = ({ variant }: { variant: ServiceIconKey }) => {
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
    <section
      id="services"
      className={classNames(cls.section, {}, [className ?? ''])}
      aria-labelledby="services-list-title"
    >
      <div className={classNames(cls.container, {}, [])}>
        <h2 id="services-list-title" className={classNames(cls.visuallyHidden, {}, [])}>
          Каталог услуг
        </h2>

        <div className={classNames(cls.servicesList, {}, [])}>
          {servicesContent.map((item) => (
            <Link key={item.id} to={item.href} className={classNames(cls.serviceRow, {}, [])}>
              <span className={classNames(cls.serviceLine, {}, [])} aria-hidden />
              <div className={classNames(cls.serviceIconWrap, {}, [])}>
                <ServiceIcon variant={item.iconKey} />
              </div>

              <div className={classNames(cls.serviceContent, {}, [])}>
                <h2 className={classNames(cls.serviceTitle, {}, [])}>{item.title}</h2>
                <p className={classNames(cls.serviceText, {}, [])}>{item.description}</p>
              </div>

              <span className={classNames(cls.serviceArrow, {}, [])} aria-hidden>
                <ArrowRight className={classNames(cls.serviceArrowIcon, {}, [])} strokeWidth={2} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
