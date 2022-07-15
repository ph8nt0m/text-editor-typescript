import React from 'react';

import { Text } from './Text';
import { Tooltip } from './Tooltip';

export const Mention = ({ isActive, label, tooltip, type }) => {
  return (
    <Tooltip tooltip={tooltip}>
      <Text
        bg={`mention.${type}`}
        borderRadius="pill"
        px={1}
        styles={[
          componentStyles.base,
          isActive ? componentStyles.active : null,
        ]}>
        {label}
      </Text>
    </Tooltip>
  );
};

const componentStyles = {
  base: {
    ':hover': {
      opacity: 0.8,
    },
  },
  active: {
    opacity: 0.7,
    ':hover': {
      opacity: 0.7,
    },
  },
};
