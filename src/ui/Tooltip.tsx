import React, { memo } from 'react';
import 'tippy.js/dist/tippy.css';

import Tippy from '@tippyjs/react';

export const Tooltip = memo(({ children, tooltip }) => {
  if (!tooltip) {
    return children;
  }

  return (
    <Tippy interactive animation={false} content={tooltip}>
      <span>{children}</span>
    </Tippy>
  );
});
