import cls from './BurgerButton.module.css';
import { classNames } from '../../lib/classNames/classNames';

interface IBurgerButton {
  className?: string;
  menuOpen: boolean;
  handleBurgerClick: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
}

const BurgerButton = ({ 
  className,
  menuOpen,
  handleBurgerClick,
  handleKeyDown,
}: IBurgerButton) => {
  return (
    <button
      className={classNames(cls.burger, { [cls.open]: menuOpen }, [className || ''])}
      aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
      aria-expanded={menuOpen}
      aria-controls='mobile-nav'
      tabIndex={0}
      onClick={handleBurgerClick}
      onKeyDown={handleKeyDown}
      type='button'
    >
      <span
        className={classNames(cls.burgerLine, 
          { 
            [cls.line1]: true, 
            [cls.active]: menuOpen 
          }, [])} 
      />
      <span 
        className={classNames(cls.burgerLine, 
          {
            [cls.line2]: true, 
            [cls.active]: menuOpen 
          }, [])} 
      />
      <span
        className={classNames(cls.burgerLine, 
          { 
            [cls.line3]: true, 
            [cls.active]: menuOpen 
          }, [])} 
      />
    </button>
  );
};

export default BurgerButton;
