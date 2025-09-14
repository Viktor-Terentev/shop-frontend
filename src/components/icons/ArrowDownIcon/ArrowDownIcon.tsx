import * as React from 'react';

import Icon, { type IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33569 8.74741L3.66442 7.25259L12.0001 14.662L20.3357 7.25259L21.6644 8.74741L12.0001 17.338L2.33569 8.74741Z"
        fill="currentColor"
        strokeWidth="2"
      />
    </Icon>
  );
};

export default ArrowDownIcon;
