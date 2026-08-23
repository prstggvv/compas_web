import { Link } from 'react-router-dom';
import cls from './Footer.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import LogoIconSvg from '../../../shared/assets/images/icons/logo.svg';

interface FooterProps {
  className?: string;
}

const navigationItems = [
  { label: 'Услуги', to: '/services' },
  { label: 'Товары', to: '/product' },
  { label: 'Контакты', to: '/contact' },
] as const;


export const Footer = ({ className }: FooterProps) => {
  return (
    <footer id="contact" className={classNames(cls.footer, {}, [className ?? ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.grid, {}, [])}>
          <div className={classNames(cls.brandColumn, {}, [])}>
            <Link to="/" className={classNames(cls.logo, {}, [])} aria-label="Компас — на главную">
              <img
                className={classNames(cls.logoIcon, {}, [])}
                src={LogoIconSvg}
                alt='Компас - логотип'
              />
            </Link>

            <p className={classNames(cls.brandText, {}, [])}>
              Дорожная инфраструктура
              <br />
              и организация движения
            </p>
          </div>

          <div className={classNames(cls.column, {}, [])}>
            <h2 className={classNames(cls.columnTitle, {}, [])}>Навигация</h2>
            <ul className={classNames(cls.linkList, {}, [])}>
              {navigationItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={classNames(cls.navLink, {}, [])}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={classNames(cls.column, {}, [])}>
            <h2 className={classNames(cls.columnTitle, {}, [])}>Контакты</h2>
            <ul className={classNames(cls.contactList, {}, [])}>
              <li>
                <a href="tel:+79119950349" className={classNames(cls.contactLink, {}, [])}>
                  +7 (911) 995 03 49
                </a>
              </li>
              <li>
                <a href="mailto:kompaskrim@mail.ru" className={classNames(cls.contactLink, {}, [])}>
                  kompaskrim@mail.ru
                </a>
              </li>
              <li className={classNames(cls.contactText, {}, [])}>г. Симферополь, просп. Победы, 109А</li>
            </ul>
          </div>

          <div className={classNames(cls.column, {}, [])}>
            <h2 className={classNames(cls.columnTitle, {}, [])}>Соцсети</h2>
            <div className={classNames(cls.socials, {}, [])}>
              <a target='_blank' href="https://vk.com/oookompass" className={classNames(cls.socialLink, {}, [])} aria-label="YouTube">
                <div className={classNames(cls.socialIcon, {}, [cls.vk])}></div>
              </a>
            </div>
          </div>
        </div>

        <div className={classNames(cls.bottom, {}, [])}>
          <span className={classNames(cls.copyright, {}, [])}>© 2025 ООО «Компас». Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
};
