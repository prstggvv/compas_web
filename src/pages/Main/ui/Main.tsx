import { Hero } from "../../../components/MainComponents/MainPageComponents/Hero";
import { ServicesOverview } from "../../../components/MainComponents/MainPageComponents/ServicesOverview";
import { StatsStrip } from "../../../components/MainComponents/MainPageComponents/StatsStrip";
import { ServicesProducts } from "../../../components/MainComponents/MainPageComponents/ServicesProducts";
import { About } from "../../../components/MainComponents/MainPageComponents/About";
import { Solutions } from "../../../components/MainComponents/MainPageComponents/Solutions";
import { classNames } from "../../../shared/lib/classNames/classNames";
import cls from './Main.module.css';

interface MainProps {
  className?: string;
}

const Main = ({ className }: MainProps) => {
  return (
    <div className={classNames(cls.main, {}, [className ?? ''])}>
      <Hero />
      <StatsStrip />
      <About />
      <ServicesProducts />
      <ServicesOverview />
      <Solutions />
    </div>
  )
};

export default Main;
