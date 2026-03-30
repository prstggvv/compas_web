import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import cls from './ServicesProcess.module.css';
import { classNames } from '../../../../shared/lib/classNames/classNames';

interface ServicesProcessProps {
  className?: string;
}

const steps = [
  {
    title: 'Заявка',
    text: 'Первичная консультация и сбор требований.',
    icon: 'request' as const,
  },
  {
    title: 'Проект',
    text: 'Инженерные изыскания и разработка схем.',
    icon: 'project' as const,
  },
  {
    title: 'Производство',
    text: 'Изготовление конструкций и подготовка к монтажу.',
    icon: 'production' as const,
  },
  {
    title: 'Монтаж',
    text: 'Установка на объекте и сдача работ.',
    icon: 'install' as const,
  },
] as const;

type StepIconType = (typeof steps)[number]['icon'];

const StepIcon = ({ type }: { type: StepIconType }) => {
  if (type === 'request') {
    return (
      <svg className={cls.stepIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M7 5h10v14H7z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9.5 9h5M9.5 12h5M9.5 15h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'project') {
    return (
      <svg className={cls.stepIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 7 17 17M17 7 7 17" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      </svg>
    );
  }

  if (type === 'production') {
    return (
      <svg className={cls.stepIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 18V9l5 3V9l5 3V6l6 4v8H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className={cls.stepIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 18V9.5L12 5v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 9h6v9h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export const ServicesProcess = ({ className }: ServicesProcessProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });

  return (
    <section
      ref={sectionRef}
      id="process"
      className={classNames(cls.section, {}, [className ?? ''])}
      aria-labelledby="services-process-title"
    >
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.head, {}, [])}>
          <h2 id="services-process-title" className={classNames(cls.title, {}, [])}>
            Как мы работаем
          </h2>
          <p className={classNames(cls.leadText, {}, [])}>Прозрачный процесс реализации вашего проекта</p>
        </div>

        <div className={classNames(cls.flow, {}, [])}>
          <svg className={cls.desktopTrack} viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden>
            <path d="M12.5 9.5H87.5" className={cls.trackBase} />
            <path d="M12.5 14.5H87.5" className={cls.trackBase} />
            <motion.path
              d="M12.5 9.5H87.5"
              className={cls.trackAccent}
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.path
              d="M12.5 14.5H87.5"
              className={cls.trackAccent}
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>

          <motion.div
            className={cls.trafficMark}
            initial={{ left: '12.5%', opacity: 0 }}
            animate={isInView ? { left: ['12.5%', '37.5%', '62.5%', '84%'], opacity: [0, 1, 1, 0] } : { left: '12.5%', opacity: 0 }}
            transition={{ duration: 3.2, delay: 0.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 }}
          />

          <div className={classNames(cls.stepsGrid, {}, [])}>
            {steps.map((step, index) => (
              <motion.article
                key={step.title}
                className={classNames(cls.step, {}, [])}
                initial={{ opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                transition={{ duration: 0.55, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className={cls.node}
                  animate={isInView ? { scale: [0.94, 1.04, 1] } : { scale: 0.94 }}
                  transition={{ duration: 0.5, delay: index * 0.14 + 0.1 }}
                >
                  <svg className={cls.nodeFrame} viewBox="0 0 80 80" fill="none" aria-hidden>
                    <circle cx="40" cy="40" r="28" className={cls.nodeCircle} />
                    <circle cx="40" cy="40" r="35" className={cls.nodeOuter} />
                  </svg>
                  <span className={cls.nodeIconWrap}>
                    <StepIcon type={step.icon} />
                  </span>
                </motion.div>

                <div className={classNames(cls.copy, {}, [])}>
                  <h3 className={classNames(cls.stepTitle, {}, [])}>{step.title}</h3>
                  <p className={classNames(cls.stepText, {}, [])}>{step.text}</p>
                </div>

                {index < steps.length - 1 ? (
                  <span className={cls.mobileArrow} aria-hidden>
                    <ArrowDown className={cls.arrowIcon} strokeWidth={1.8} />
                  </span>
                ) : null}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
