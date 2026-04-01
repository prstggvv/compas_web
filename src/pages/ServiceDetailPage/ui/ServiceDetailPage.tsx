import { ProductCta } from '../../../components/MainComponents/ProductCta';
import { ServiceDetailPageHero } from '../../../components/MainComponents/ServiceDetailPageComponents/ServiceDetailHero';
import { ServiceDetailProjects } from '../../../components/MainComponents/ServiceDetailPageComponents/ServiceDetailProjects';
import { ServiceDetailScope } from '../../../components/MainComponents/ServiceDetailPageComponents/ServiceDetailScope';
import { ServicesProcess } from '../../../components/MainComponents/ServicesPageComponents/ServicesProcess';
import cls from './ServiceDetailPage.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import type { ServiceContent } from '../../../shared/lib/constants';

interface ServiceDetailPageProps {
  className?: string;
  service: ServiceContent;
  onBack: () => void;
}

const ServiceDetailPage = ({ className, service, onBack }: ServiceDetailPageProps) => {
  return (
    <main className={classNames(cls.page, {}, [className ?? ''])}>
      <ServiceDetailPageHero
        title={service.title}
        lead={service.heroLead}
        onBack={onBack}
      />
      <ServiceDetailScope
        title={service.sectionTitle}
        items={service.workItems}
        image={service.workImage}
        imageAlt={service.workImageAlt}
      />
      <ServicesProcess
        title={service.processTitle}
        leadText={service.processLead}
        steps={service.processSteps}
      />
      <ServiceDetailProjects items={service.projects} />
      <ProductCta
        title="Получите расчет проекта"
        text="Оставьте заявку на бесплатную консультацию и предварительную оценку стоимости объекта. Мы свяжемся с вами и предложим оптимальное решение под ваш проект."
        buttonLabel="Оставить заявку"
        sectionId={`service-cta-${service.id}`}
      />
    </main>
  );
};

export default ServiceDetailPage;
