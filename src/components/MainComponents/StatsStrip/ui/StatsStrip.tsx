import { useEffect, useRef, useState } from "react";
import cls from "./StatsStrip.module.css";
import { classNames } from "../../../../shared/lib/classNames/classNames";

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
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState<number[]>(() => stats.map(() => 0));

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) {
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
  }, [started]);

  return (
    <section ref={sectionRef} className={classNames(cls.section, {}, [className ?? ""])} aria-label="Ключевые показатели">
      <div className={classNames(cls.container, {}, [])}>
        <ul className={classNames(cls.statsGrid, {}, [])}>
          {stats.map((item, index) => (
            <li key={item.id} className={classNames(cls.statItem, {}, [])}>
              <div className={classNames(cls.value, {}, [])}>
                {values[index]}
                {item.suffix}
              </div>
              <p className={classNames(cls.label, {}, [])}>{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
