import { useState } from 'react';

export const useToggleFormat = (formats) => {
  const [enableFormat, setEnableFormat] = useState(formats.length > 0);

  const toggleFormat = () => setEnableFormat(!enableFormat);

  return [enableFormat, toggleFormat];
};
