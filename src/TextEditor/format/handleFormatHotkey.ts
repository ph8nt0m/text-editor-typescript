import isHotkey from 'is-hotkey';

import { FORMAT_HOTKEYS } from './constants';
import { toggleMark } from './utils';

export const handleFormatHotkey = (editor) => (event) => {
  Object.entries(FORMAT_HOTKEYS).forEach(([hotkey, mark]) => {
    if (isHotkey(hotkey, event)) {
      event.preventDefault();
      toggleMark(editor, mark);
    }
  });
};
