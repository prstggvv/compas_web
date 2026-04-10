import { Hero } from "../../../components/MainComponents/MainPageComponents/Hero";
import { ServicesOverview } from "../../../components/MainComponents/MainPageComponents/ServicesOverview";
import { StatsStrip } from "../../../components/MainComponents/MainPageComponents/StatsStrip";
import { ServicesProducts } from "../../../components/MainComponents/MainPageComponents/ServicesProducts";
import { About } from "../../../components/MainComponents/MainPageComponents/About";
import { ContactUsSection } from "../../../components/MainComponents/MainPageComponents/ContactUsSection";
import { Solutions } from "../../../components/MainComponents/MainPageComponents/Solutions";
import { classNames } from "../../../shared/lib/classNames/classNames";
import cls from './Main.module.css';

interface MainProps {
  className?: string;
  onOpenContactPopup?: () => void;
}

const Main = ({ className, onOpenContactPopup }: MainProps) => {
  return (
    <div className={classNames(cls.main, {}, [className ?? ''])}>
      <Hero onOpenContactPopup={onOpenContactPopup} />
      <StatsStrip />
      <About onOpenContactPopup={onOpenContactPopup} />
      <ServicesProducts />
      <ServicesOverview />
      <Solutions />
      <ContactUsSection onOpenContactPopup={onOpenContactPopup} />
    </div>
  )
};

export default Main;
