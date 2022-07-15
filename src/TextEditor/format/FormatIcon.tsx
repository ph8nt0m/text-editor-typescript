import React from 'react';
import { useSlate } from 'slate-react';

import { Icon } from '../../ui';
import { testIsFormatActive, toggleFormat } from './utils';

export const FormatIcon = ({ icon, format, tooltip, type = 'mark' }) => {
  const editor = useSlate();

  const isActive = testIsFormatActive(editor, format, type);

  const handleClick = (event) => {
    event.preventDefault();
    toggleFormat(editor, format, type);
  };

  return (
    <Icon
      icon={icon}
      isActive={isActive}
      tooltip={tooltip}
      onClick={handleClick}
    />
  );
};
