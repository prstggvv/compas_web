import { forwardRef, type HTMLAttributes } from 'react';
import cls from './CarouselViewport.module.css';
import { classNames } from '../../lib/classNames/classNames';

type CarouselViewportProps = HTMLAttributes<HTMLDivElement>;

export const CarouselViewport = forwardRef<HTMLDivElement, CarouselViewportProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div ref={ref} className={classNames(cls.viewport, {}, [className ?? ''])} {...rest}>
        {children}
      </div>
    );
  }
);

CarouselViewport.displayName = 'CarouselViewport';
