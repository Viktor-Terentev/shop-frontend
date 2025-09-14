import cn from 'classnames';
import * as React from 'react';

import css from './Text.module.scss';

export interface TextProps {
  className?: string;
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
  maxLines?: number;
}

const weightMap: Record<NonNullable<TextProps['weight']>, number> = {
  normal: 400,
  medium: 500,
  bold: 700,
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag = 'p',
  weight,
  children,
  color,
  maxLines,
  ...rest
}) => {
  const Tag = tag;

  const colorClass = color ? css[color] : undefined;
  const style: React.CSSProperties = {};
  if (weight) style.fontWeight = weightMap[weight];
  if (typeof maxLines === 'number') style.WebkitLineClamp = maxLines;

  return (
    <Tag
      className={cn(
        css.root,
        view && css[view],
        colorClass,
        typeof maxLines === 'number' && css.clamp,
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Text;
