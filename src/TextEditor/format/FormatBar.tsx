import React, { memo } from 'react';

import { IconList } from '../../ui';
import { FormatIcon } from './FormatIcon';
import { FORMAT_CONFIGS } from './constants';

export const FormatBar = memo(({ formats }) => {
  return (
    <IconList>
      {formats.map((format) => (
        <FormatIcon key={format} format={format} {...FORMAT_CONFIGS[format]} />
      ))}
    </IconList>
  );
});
