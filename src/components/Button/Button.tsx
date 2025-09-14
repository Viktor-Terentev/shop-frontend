import cn from 'classnames';
import Loader from 'components/Loader';
import Text from 'components/Text';
import React from 'react';

import css from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ className, loading, children = null, ...props }) => {
  return (
    <button
      {...props}
      className={cn(css.button, className, props.disabled && css.button_disabled)}
      disabled={props.disabled || loading}
    >
      {loading && <Loader size="s" className={css.button__loader} />}
      <Text className={css.button__text} tag="span" view="button">
        {children}
      </Text>
    </button>
  );
};

export default Button;
