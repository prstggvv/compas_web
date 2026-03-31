import { ArrowRight } from 'lucide-react';
import cls from './About.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';

interface IAboutProps {
  className?: string;
}

const keyFeatures = [
  {
    title: 'Единый цикл работ',
    text: 'Производство, комплектация и монтаж в одной команде без потери сроков.',
  },
  {
    title: 'Контроль по ГОСТ',
    text: 'Материалы и схемы установки проверяются по нормам до выхода на объект.',
  },
  {
    title: 'Прозрачный план',
    text: 'Фиксируем этапы, сроки и статусы, чтобы проект был предсказуемым.',
  },
  {
    title: 'Сопровождение сдачи',
    text: 'Передаем документы и закрываем вопросы до финальной приемки объекта.',
  },
] as const;

export const About = ({ className }: IAboutProps) => {
  return (
    <section id="about" className={classNames(cls.section, {}, [className ?? ''])} aria-labelledby="about-title">
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.head, {}, [])}>
          <span className={classNames(cls.kicker, {}, [])}>О НАС</span>
          <h2 id="about-title" className={classNames(cls.title, {}, [])}>
            Мы закрываем задачи дорожной безопасности под ключ
          </h2>
        </div>

        <div className={classNames(cls.intro, {}, [])}>
          <p className={classNames(cls.leadText, {}, [])}>
            Компас - команда производства и монтажа дорожных знаков, искусственных неровностей и элементов
            инфраструктуры. Мы берем объект от первичной консультации до итоговой установки, чтобы вы получили
            прогнозируемый результат по срокам, качеству и документам.
          </p>
          <div className={classNames(cls.featuresPanel, {}, [])}>
            <span className={classNames(cls.featuresLabel, {}, [])}>
              <span className={classNames(cls.featuresDot, {}, [])} aria-hidden />
              КАК РЕШАЕМ ПРОБЛЕМЫ
            </span>
            <ul className={classNames(cls.featuresGrid, {}, [])}>
              {keyFeatures.map((feature) => (
                <li key={feature.title} className={classNames(cls.featureItem, {}, [])}>
                  <h3 className={classNames(cls.featureTitle, {}, [])}>{feature.title}</h3>
                  <p className={classNames(cls.featureText, {}, [])}>{feature.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <a href="#contact" className={classNames(cls.ctaButton, {}, [])}>
            Записаться
            <ArrowRight className={classNames(cls.ctaIcon, {}, [])} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
};
