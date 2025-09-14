import cn from 'classnames';
import React from 'react';

import css from './Loader.module.scss';

export interface LoaderProps {
  size?: 's' | 'm' | 'l';
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'l', className = '' }) => {
  return (
    <span className={cn(css.loaderWrapper, css[size], className)}>
      <span className={cn(css.loader, css[size])} />
    </span>
  );
};

export default Loader;
