import cls from './MainPageTitle.module.css';
import { classNames } from '../../../lib/classNames/classNames';

interface MainPageTitleProps {
  className?: string;
  id?: string;
  title: string;
  sectionLabel?: string;
  sectionDescription?: string;
  as?: 'h1' | 'h2';
}

export const MainPageTitle = ({
  className,
  id,
  title,
  sectionLabel,
  sectionDescription,
  as = 'h2',
}: MainPageTitleProps) => {
  const TitleTag = as;

  return (
    <div className={classNames(cls.wrap, {}, [className ?? ''])}>
      <TitleTag id={id} className={classNames(cls.title, {}, [])}>
        {title}
      </TitleTag>

      {(sectionLabel || sectionDescription) ? (
        <div className={classNames(cls.meta, {}, [])}>
          {sectionLabel ? <span className={classNames(cls.sectionLabel, {}, [])}>{sectionLabel}</span> : null}
          {sectionDescription ? (
            <span className={classNames(cls.sectionDescription, {}, [])}>{sectionDescription}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
