import cls from './Services.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ServicesIntro } from '../../../components/MainComponents/ServicesIntro';
import { ServicesProcess } from '../../../components/MainComponents/ServicesProcess';

interface ServicesProps {
  className?: string;
}

const Services = ({ className }: ServicesProps) => {
  return (
    <main className={classNames(cls.page, {}, [className ?? ''])}>
      <ServicesIntro />
      <ServicesProcess />
    </main>
  );
};

export default Services;
