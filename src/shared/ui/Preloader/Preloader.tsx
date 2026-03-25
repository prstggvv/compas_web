import cls from './Preloader.module.css';
import { classNames } from '../../lib/classNames/classNames';

interface IPreloaderProps {
  isActive: boolean;
  className?: string;
}

export const Preloader = ({ isActive, className }: IPreloaderProps) => {
  return (
    <div
      className={classNames(cls.preloader, { [cls.preloaderActive]: isActive }, [className ?? ''])}
      role="status"
      aria-live="polite"
      aria-label="Загрузка"
    >
      <div className={classNames(cls.container, {}, [])}>
        <span className={classNames(cls.round, {}, [])} aria-hidden="true" />
      </div>
    </div>
  );
};
