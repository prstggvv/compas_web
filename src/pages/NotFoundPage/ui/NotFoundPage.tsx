import cls from './NotFoundPage.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';

interface INotFoundPageData {
  className?: string;
}

const NotFoundPage = ({ className }: INotFoundPageData) => {
  return (
    <main className={classNames(cls.content, {}, [className ?? ''])}>
      <div className={classNames(cls.codeRow, {}, [])}>
        <span className={classNames(cls.digit, {}, [])} aria-hidden>4</span>
        <div
          className={classNames(cls.signWrap, {}, [])}
          role="img"
          aria-label="Знак движение запрещено"
        >
          <span className={classNames(cls.noEntrySign, {}, [])} />
        </div>
        <span className={classNames(cls.digit, {}, [])} aria-hidden>4</span>
      </div>
      <p className={classNames(cls.subtitle, {}, [])}>
        Движение запрещено
      </p>
      <p className={classNames(cls.hint, {}, [])}>
        Страница не найдена
      </p>
      <Link
        to="/"
        className={classNames(cls.button, {}, [])}
      >
        На главную
      </Link>
    </main>
  );
};

export default NotFoundPage;
