import { PageHero } from '../../../../../shared/ui/PageHero';

interface ServicesPageHeroProps {
  className?: string;
}

export const ServicesPageHero = ({ className }: ServicesPageHeroProps) => {
  return (
    <PageHero
      className={className}
      breadcrumbs={[
        { label: 'Главная', to: '/' },
        { label: 'Услуги' },
      ]}
      title="Услуги"
      description="Полный цикл работ по дорожной инфраструктуре: от проектирования и аудита до производства, монтажа и сопровождения объекта."
    />
  );
};
