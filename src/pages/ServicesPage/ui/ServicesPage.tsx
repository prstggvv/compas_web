import cls from './ServicesPage.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ProductCta } from '../../../components/MainComponents/ProductCta';
import { ServicesIntro } from '../../../components/MainComponents/ServicesPageComponents/ServicesIntro';
import { ServicesPageHero } from '../../../components/MainComponents/ServicesPageComponents/ServicesPageHero';
import { ServiceDetailAdvantages } from '../../../components/MainComponents/ServiceDetailPageComponents/ServiceDetailAdvantages';

interface ServicesProps {
  className?: string;
  onOpenContactPopup?: () => void;
}

const Services = ({ className, onOpenContactPopup }: ServicesProps) => {
  return (
    <main className={classNames(cls.page, {}, [className ?? ''])}>
      <ServicesPageHero />
      <ServicesIntro />
      <ServiceDetailAdvantages />
      <ProductCta
        sectionId="services-page-cta"
        title="Нужна комплексная услуга под объект?"
        text="Подберем состав работ, этапность, смету и сроки под ваш проект: от обследования и схем до производства и монтажа."
        buttonLabel="Обсудить проект"
        onOpenContactPopup={onOpenContactPopup}
      />
    </main>
  );
};

export default Services;
