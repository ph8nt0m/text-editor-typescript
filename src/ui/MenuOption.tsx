import React from 'react';

import { Box } from './Box';

const componentStyles = {
  base: {
    ':hover': {
      opacity: 0.3,
    },
  },
};

export const MenuOption = ({ isFocused, option, onClick }) => {
  return (
    <Box
      bg={isFocused ? 'background:active' : 'background'}
      styles={componentStyles.base}
      onClick={onClick}>
      {option.label}
    </Box>
  );
};
