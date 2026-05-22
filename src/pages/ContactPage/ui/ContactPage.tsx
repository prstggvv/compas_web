import cls from './ContactPage.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ContactPageHero } from '../../../components/MainComponents/ContactPageComponents/ContactPageHero';
import { ContactOverview } from '../../../components/MainComponents/ContactPageComponents/ContactOverview';
import { ContactFormSection } from '../../../components/MainComponents/ContactPageComponents/ContactFormSection';

interface IContactPageProps {
  className?: string;
}

const ContactPage = ({ className }: IContactPageProps) => {
  return (
    <main className={classNames(cls.page, {}, [className ?? ''])}>
      <ContactPageHero />
      <ContactOverview />
      <ContactFormSection />
    </main>
  );
};

export default ContactPage;
