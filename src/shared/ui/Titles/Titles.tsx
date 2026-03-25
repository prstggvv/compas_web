import cls from './Titles.module.css';
import { classNames } from '../../lib/classNames/classNames';

interface ITitlesProps {
  className?: string;
  uptitle: string;
  title: string;
  dark: boolean;
}

const Titles = ({
  className,
  uptitle,
  title,
  dark,
}: ITitlesProps) => {
  return (
    <div className={classNames(cls.titles, {}, [className ?? ''])}>
      <h2 className={classNames(cls.subheading, {
        [cls.dark]: dark,
      }, [])}>{uptitle}</h2>
      <h3 className={classNames(cls.heading, {
        [cls.dark]: dark
      }, [])}>{title}</h3>
    </div>
  )
};

export default Titles;
