import type { LucideIcon } from 'lucide-react';
import { Building2, CalendarClock, Signpost, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import cls from './StatsStrip.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { VIEWPORT_DEEP } from '../../../../../shared/lib/motion';
import statImage from '../../../../../shared/assets/images/stats/stat.jpg';

interface IStatsStripProps {
  className?: string;
}

type StatItem = {
  id: string;
  target: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
};

const stats: StatItem[] = [
  { id: 'signs', target: 1000, suffix: '+', label: 'Установлено знаков', icon: Signpost },
  { id: 'objects', target: 200, suffix: '+', label: 'Сдано объектов', icon: Building2 },
  { id: 'years', target: 10, suffix: '', label: 'Лет опыта', icon: CalendarClock },
  { id: 'clients', target: 50, suffix: '+', label: 'Постоянных клиентов', icon: Users },
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
    <section
      ref={sectionRef}
      className={classNames(cls.section, {}, [className ?? ''])}
      aria-label="Ключевые показатели"
    >
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.layout, {}, [])}>
          <div className={classNames(cls.visual, {}, [])}>
            <img
              className={classNames(cls.visualImage, {}, [])}
              src={statImage}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className={classNames(cls.statsColumn, {}, [])}>
            <ul className={classNames(cls.statsList, {}, [])}>
              {stats.map((item, index) => (
                <li key={item.id} className={classNames(cls.statRow, {}, [])}>
                  <span className={classNames(cls.iconWrap, {}, [])} aria-hidden>
                    <item.icon className={classNames(cls.icon, {}, [])} strokeWidth={1.9} />
                  </span>
                  <div className={classNames(cls.statBody, {}, [])}>
                    <div className={classNames(cls.value, {}, [])}>
                      {values[index]}
                      {item.suffix}
                    </div>
                    <p className={classNames(cls.label, {}, [])}>{item.label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
