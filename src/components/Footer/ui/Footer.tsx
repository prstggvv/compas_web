import { Compass, Send, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import cls from './Footer.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';

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
              <Compass className={classNames(cls.logoIcon, {}, [])} strokeWidth={2} aria-hidden />
              <span className={classNames(cls.logoText, {}, [])}>Компас</span>
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
                <a href="tel:88005553535" className={classNames(cls.contactLink, {}, [])}>
                  8 (800) 555-35-35
                </a>
              </li>
              <li>
                <a href="mailto:info@compass-dor.ru" className={classNames(cls.contactLink, {}, [])}>
                  info@compass-dor.ru
                </a>
              </li>
              <li className={classNames(cls.contactText, {}, [])}>г. Москва, ул. Дорожная, д. 12</li>
            </ul>
          </div>

          <div className={classNames(cls.column, {}, [])}>
            <h2 className={classNames(cls.columnTitle, {}, [])}>Соцсети</h2>
            <div className={classNames(cls.socials, {}, [])}>
              <a href="#" className={classNames(cls.socialLink, {}, [])} aria-label="Telegram">
                <Send className={classNames(cls.socialIcon, {}, [])} strokeWidth={1.8} />
              </a>
              <a href="#" className={classNames(cls.socialLink, {}, [])} aria-label="YouTube">
                <Youtube className={classNames(cls.socialIcon, {}, [])} strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </div>

        <div className={classNames(cls.bottom, {}, [])}>
          <span className={classNames(cls.copyright, {}, [])}>© 2025 ООО «Компас». Все права защищены.</span>
          <a href="#" className={classNames(cls.policyLink, {}, [])}>
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
};
