import { PageHero } from "../../../../../shared/ui/PageHero";

interface ProductPageHeroProps {
  className?: string;
}

export const ProductPageHero = ({ className }: ProductPageHeroProps) => {
  return (
    <PageHero
      className={className}
      breadcrumbs={[
        { label: 'Главная', to: '/' },
        { label: 'Товары' },
      ]}
      title="Товары"
      description="Поставка продукции для дорожной и городской инфраструктуры. Комплексные решения для проектов любой сложности."
    />
  );
};
