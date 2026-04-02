import { useEffect, useRef, useState } from "react";
import { motion, useInView } from 'framer-motion';
import cls from "./StatsStrip.module.css";
import { classNames } from "../../../../../shared/lib/classNames/classNames";
import { createStaggerContainer, itemReveal, VIEWPORT_DEEP } from '../../../../../shared/lib/motion';

interface IStatsStripProps {
  className?: string;
}

type StatItem = {
  id: string;
  target: number;
  suffix: string;
  label: string;
};

const stats: StatItem[] = [
  { id: "signs", target: 1000, suffix: "+", label: "Установлено знаков" },
  { id: "objects", target: 200, suffix: "+", label: "Сдано объектов" },
  { id: "years", target: 10, suffix: "", label: "Лет опыта" },
  { id: "clients", target: 50, suffix: "+", label: "Постоянных клиентов" },
];

const DURATION_MS = 1600;

export const StatsStrip = ({ className }: IStatsStripProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, VIEWPORT_DEEP);
  const [values, setValues] = useState<number[]>(() => stats.map(() => 0));

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValues(stats.map((item) => Math.round(item.target * eased)));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView]);

  return (
    <motion.section
      ref={sectionRef}
      className={classNames(cls.section, {}, [className ?? ""])}
      aria-label="Ключевые показатели"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_DEEP}
      variants={itemReveal}
    >
      <div className={classNames(cls.container, {}, [])}>
        <motion.ul
          className={classNames(cls.statsGrid, {}, [])}
          variants={createStaggerContainer(0.12)}
        >
          {stats.map((item, index) => (
            <motion.li key={item.id} className={classNames(cls.statItem, {}, [])} variants={itemReveal}>
              <div className={classNames(cls.value, {}, [])}>
                {values[index]}
                {item.suffix}
              </div>
              <p className={classNames(cls.label, {}, [])}>{item.label}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
};
