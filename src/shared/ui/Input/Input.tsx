import cls from './Input.module.css';
import { classNames } from '../../lib/classNames/classNames';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  error?: string;
  className?: string;
}

export const Input = ({
  label,
  error,
  id,
  className,
  ...rest
}: InputProps) => {
  const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className={classNames(cls.root, {}, [className ?? ''])}>
      <label htmlFor={inputId} className={cls.label}>
        {label}
      </label>
      <input
        id={inputId}
        className={classNames(cls.input, { [cls.error]: Boolean(error) }, [])}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
      {error && (
        <span id={`${inputId}-error`} className={cls.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
