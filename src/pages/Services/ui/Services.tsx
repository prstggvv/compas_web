import cls from './Services.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ServicesIntro } from '../../../components/MainComponents/ServicesIntro';

interface ServicesProps {
  className?: string;
}

const Services = ({ className }: ServicesProps) => {
  return (
    <main className={classNames(cls.page, {}, [className ?? ''])}>
      <ServicesIntro />
    </main>
  );
};

export default Services;
