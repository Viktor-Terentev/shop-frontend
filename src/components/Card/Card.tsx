import cn from 'classnames';
import React from 'react';

import Text from '../Text/Text';

import css from './Card.module.scss';

export interface CardProps {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={cn(css.card, className)} onClick={onClick}>
      <div className={css.card__header}>
        <img className={css['card__header-src']} src={image} alt="card" />
      </div>
      <div className={css.card__body}>
        {captionSlot && (
          <Text className={css.card__caption} view="p-14" weight="medium" color="secondary">
            {captionSlot}
          </Text>
        )}
        <Text view="p-20" weight="medium" color="primary" tag="h4" maxLines={2}>
          {title}
        </Text>
        <Text className={css.card__subtitle} view="p-16" color="secondary" maxLines={3}>
          {subtitle}
        </Text>
        <div className={css.card__footer}>
          {contentSlot && (
            <Text className={css.card__content} view="p-18" weight="bold" color="primary">
              {contentSlot}
            </Text>
          )}
          <div className={css.card__action}>{actionSlot}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
