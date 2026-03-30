import cls from './Titles.module.css';
import { classNames } from '../../lib/classNames/classNames';

interface ITitlesProps {
  className?: string;
  uptitle: string;
  subtitle: string;
}

const Titles = ({
  className,
  uptitle,
  subtitle,
}: ITitlesProps) => {
  return (
    <div className={classNames(cls.head, {}, [className ?? ''])}>
      <h2
        className={classNames(cls.title, {}, [])}>
        {uptitle}
      </h2>
      <p className={classNames(cls.leadText, {}, [])}>
        {subtitle}
      </p>
    </div>
  )
};

export default Titles;
