import cls from './About.module.css';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import TeamPhoto from '../../../../shared/assets/images/photos/1222222.jpg';
import FactoryPhoto from '../../../../shared/assets/images/photos/done.jpg';

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
          </a>
        </div>

        <div className={classNames(cls.cardsGrid, {}, [])}>
          <article className={classNames(cls.photoCard, {}, [])}>
            <img className={classNames(cls.photoImage, {}, [])} src={TeamPhoto} alt="Команда на объекте" loading="lazy" />
            <div className={classNames(cls.overlay, {}, [])}>
              <h3 className={classNames(cls.cardTitle, {}, [])}>Решение 01</h3>
              <p className={classNames(cls.cardText, {}, [])}>Один подрядчик на весь цикл работ без разрывов.</p>
            </div>
          </article>

          <article className={classNames(cls.textCardDark, {}, [])}>
            <h3 className={classNames(cls.cardTitle, {}, [])}>Решение 02</h3>
            <p className={classNames(cls.cardText, {}, [])}>
              Формируем спецификацию под условия объекта и контролируем соответствие ГОСТ.
            </p>
          </article>

          <article className={classNames(cls.textCardLight, {}, [])}>
            <h3 className={classNames(cls.cardTitle, {}, [])}>Решение 03</h3>
            <p className={classNames(cls.cardText, {}, [])}>
              Согласовываем этапы заранее и даем прозрачный план поставки и монтажа.
            </p>
          </article>

          <article className={classNames(cls.textCardLight, {}, [])}>
            <h3 className={classNames(cls.cardTitle, {}, [])}>Решение 04</h3>
            <p className={classNames(cls.cardText, {}, [])}>
              Вы получаете комплект документов и сопровождение до сдачи объекта.
            </p>
          </article>

          <article className={classNames(cls.photoCard, {}, [])}>
            <img
              className={classNames(cls.photoImage, {}, [])}
              src={FactoryPhoto}
              alt="Производство дорожных элементов"
              loading="lazy"
            />
            <div className={classNames(cls.overlay, {}, [])}>
              <h3 className={classNames(cls.cardTitle, {}, [])}>Решение 05</h3>
              <p className={classNames(cls.cardText, {}, [])}>Собственное производство сокращает сроки поставки.</p>
            </div>
          </article>

          <article className={classNames(cls.photoCard, {}, [])}>
            <img
              className={classNames(cls.photoImage, {}, [])}
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
              alt="Проверка готовности перед монтажом"
              loading="lazy"
            />
            <div className={classNames(cls.overlay, {}, [])}>
              <h3 className={classNames(cls.cardTitle, {}, [])}>Решение 06</h3>
              <p className={classNames(cls.cardText, {}, [])}>Финальная проверка качества перед установкой.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
