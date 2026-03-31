import cls from './Services.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ProductCta } from '../../../components/MainComponents/ProductCta';
import { ServicesIntro } from '../../../components/MainComponents/ServicesPageComponents/ServicesIntro';
import { ServicesPageIntro } from '../../../components/MainComponents/ServicesPageComponents/ServicesPageIntro';
import { ServicesProcess } from '../../../components/MainComponents/ServicesPageComponents/ServicesProcess';

interface ServicesProps {
  className?: string;
}

const Services = ({ className }: ServicesProps) => {
  return (
    <main className={classNames(cls.page, {}, [className ?? ''])}>
      <ServicesPageIntro />
      <ServicesIntro />
      <ServicesProcess />
      <ProductCta
        sectionId="services-page-cta"
        title="Нужна комплексная услуга под объект?"
        text="Подберем состав работ, этапность, смету и сроки под ваш проект: от обследования и схем до производства и монтажа."
        buttonLabel="Обсудить проект"
      />
    </main>
  );
};

export default Services;
