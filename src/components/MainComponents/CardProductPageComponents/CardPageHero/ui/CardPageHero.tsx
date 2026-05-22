import { PageHero } from '../../../../../shared/ui/PageHero';

interface CardProductPageHeroProps {
  className?: string;
  currentLabel: string;
  onBack: () => void;
}

export const CardProductPageHero = ({ className, currentLabel, onBack }: CardProductPageHeroProps) => {
  return (
    <PageHero
      className={className}
      variant="compact"
      ariaLabel="Навигация по странице товара"
      breadcrumbs={[
        { label: 'Главная', to: '/' },
        { label: 'Товары', to: '/product' },
        { label: currentLabel },
      ]}
      backButtonLabel="Назад к каталогу"
      onBack={onBack}
    />
  );
};
