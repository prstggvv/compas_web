import cls from './Form.module.css';
import { classNames } from '../../lib/classNames/classNames';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export const Form = ({
  title,
  className,
  children,
  ...rest
}: FormProps) => {
  return (
    <form
      className={classNames(cls.form, {}, [className ?? ''])}
      noValidate
      {...rest}
    >
      {title && <h4 className={cls.formTitle}>{title}</h4>}
      {children}
    </form>
  );
};
