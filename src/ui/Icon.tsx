import React from 'react';
import { Icon as UinixIcon } from 'uinix-ui';

import { Tooltip } from './Tooltip';

export const Icon = ({ icon, isActive = false, tooltip, onClick }) => {
  return (
    <Tooltip tooltip={tooltip}>
      <UinixIcon
        color={isActive ? 'active' : 'icon'}
        icon={icon}
        size="icon.s"
        onClick={onClick}
      />
    </Tooltip>
  );
};
