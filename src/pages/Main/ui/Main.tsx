import { Hero } from "../../../components/MainComponents/Hero";
import { StatsStrip } from "../../../components/MainComponents/StatsStrip";
import { ServicesProducts } from "../../../components/MainComponents/ServicesProducts";
import { About } from "../../../components/MainComponents/About";
import { Solutions } from "../../../components/MainComponents/Solutions";
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
      <Solutions />
    </div>
  )
};

export default Main;
