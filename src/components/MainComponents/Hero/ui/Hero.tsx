import cls from './Hero.module.css';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { scrollToSection } from '../../../../shared/lib/scrollToSection/scrollToSection';

interface IHeroProps {
  className?: string;
}

const handleSectionLinkClick =
  (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

const CarIcon = () => (
  <svg
    className={classNames(cls.signBlueIcon, {}, [])}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    className={classNames(cls.btnPrimaryIcon, {}, [])}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    aria-hidden
  >
    <path d="m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z" />
  </svg>
);

export const Hero = ({ className }: IHeroProps) => {
  return (
    <section
      id="hero"
      className={classNames(cls.section, {}, ['heroPerspective', className ?? ''])}
      aria-labelledby="hero-title"
    >
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.glow, {}, [])} aria-hidden />

        <div className={classNames(cls.roadPlane, {}, [])} aria-hidden>
          <div className={classNames(cls.roadLines, {}, [])} />
        </div>

        <div className={classNames(cls.signLeft, {}, [])} aria-hidden>
          <div className={classNames(cls.signRound, {}, [])}>
            <div className={classNames(cls.signArrow, {}, [])} />
          </div>
        </div>
        <div className={classNames(cls.signRight, {}, [])} aria-hidden>
          <div className={classNames(cls.signBlue, {}, [])}>
            <CarIcon />
          </div>
        </div>

        <div className={classNames(cls.content, {}, [])}>

          <h1 id="hero-title" className={classNames(cls.title, {}, [])}>
            <span className={classNames(cls.titleText, {}, [])}>КОМПАС</span>
          </h1>
          <div className={classNames(cls.buttonsLower, {}, [])}>
            <ul className={classNames(cls.actions, {}, [])}>
              <li className={classNames(cls.actionItem, {}, [])}>
                <a
                  href="#contact"
                  className={classNames(cls.btnPrimary, {}, [])}
                  onClick={handleSectionLinkClick('contact')}
                  aria-label="Оставить заявку — перейти к форме связи"
                >
                  Оставить заявку
                  <ArrowRightIcon />
                </a>
              </li>
              <li className={classNames(cls.actionItem, {}, [])}>
                <a
                  href="#projects"
                  className={classNames(cls.btnGhost, {}, [])}
                  onClick={handleSectionLinkClick('projects')}
                  aria-label="Наши проекты"
                >
                  Наши проекты
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
