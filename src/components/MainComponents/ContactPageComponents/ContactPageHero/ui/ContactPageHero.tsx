import { PageHero } from '../../../../../shared/ui/PageHero';

interface ContactPageHeroProps {
  className?: string;
}

export const ContactPageHero = ({ className }: ContactPageHeroProps) => {
  return (
    <PageHero
      className={className}
      breadcrumbs={[
        { label: 'Главная', to: '/' },
        { label: 'Контакты' },
      ]}
      title="Контакты"
      description="Свяжитесь с нами по телефону, электронной почте или оставьте заявку. Обсудим проект, сроки и подходящее решение для объекта."
    />
  );
};
