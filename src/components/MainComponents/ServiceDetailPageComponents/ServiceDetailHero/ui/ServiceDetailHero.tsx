import { PageHero } from '../../../../../shared/ui/PageHero';

interface ServiceDetailPageHeroProps {
  className?: string;
  title: string;
  lead: string;
  onBack: () => void;
}

export const ServiceDetailPageHero = ({ className, title, lead, onBack }: ServiceDetailPageHeroProps) => {
  return (
    <PageHero
      className={className}
      variant="detail"
      divider
      ariaLabel={title}
      breadcrumbs={[
        { label: 'Главная', to: '/' },
        { label: 'Услуги', to: '/services' },
        { label: title },
      ]}
      backButtonLabel="Назад к услугам"
      onBack={onBack}
      title={title}
      description={lead}
    />
  );
};
