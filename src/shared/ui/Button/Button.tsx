import cls from './Button.module.css';
import { classNames } from '../../lib/classNames/classNames';
import { motion } from 'framer-motion';

interface IButtonProps {
  className?: string;
  children: any;
  href: string;
}

const Button = ({
  className,
  children,
  href,
}: IButtonProps) => {
  return (
    <motion.a
      className={classNames(cls.button, {}, [className || ''])}
      href={href}
      initial={{ opacity: 0, y: 10 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      target='_blank'
    >
      {children}
    </motion.a>
  )
};

export default Button;
