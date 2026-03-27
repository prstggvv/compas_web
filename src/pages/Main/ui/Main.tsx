import { Hero } from "../../../components/MainComponents/Hero";
import { About } from "../../../components/MainComponents/About";
import { classNames } from "../../../shared/lib/classNames/classNames";
import cls from './Main.module.css';

interface MainProps {
  className?: string;
}

const Main = ({ className }: MainProps) => {
  return (
    <div className={classNames(cls.main, {}, [className ?? ''])}>
      <Hero />
      <About />
    </div>
  )
};

export default Main;
