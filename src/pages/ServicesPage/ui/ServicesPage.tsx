import cls from './ServicesPage.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ProductCta } from '../../../components/MainComponents/ProductCta';
import { ServicesIntro } from '../../../components/MainComponents/ServicesPageComponents/ServicesIntro';
import { ServicesPageHero } from '../../../components/MainComponents/ServicesPageComponents/ServicesPageHero';

interface ServicesProps {
  className?: string;
}

const Services = ({ className }: ServicesProps) => {
  return (
    <main className={classNames(cls.page, {}, [className ?? ''])}>
      <ServicesPageHero />
      <ServicesIntro />
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
