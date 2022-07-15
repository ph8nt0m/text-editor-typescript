import { useEffect, useRef } from 'react';
import { Editor, Range } from 'slate';
import { ReactEditor } from 'slate-react';

import { insertMention } from './utils';

export const useMatchMention = ({ editor, setSearch, setTarget }) => {
  useEffect(() => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = Editor.before(editor, start, { unit: 'word' });
      const before = wordBefore && Editor.before(editor, wordBefore);
      const beforeRange = before && Editor.range(editor, before, start);
      const beforeText = beforeRange && Editor.string(editor, beforeRange);
      const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
      const after = Editor.after(editor, start);
      const afterRange = Editor.range(editor, start, after);
      const afterText = Editor.string(editor, afterRange);
      const afterMatch = afterText.match(/^(\s|$)/);

      if (beforeMatch && afterMatch) {
        setTarget(beforeRange);
        setSearch(beforeMatch[1]);
        return;
      }
    }
    setTarget(null);
  });
};

export const useNavigateMention = ({
  editor,
  index,
  suggestions,
  target,
  setIndex,
  setTarget,
}) => {
  useEffect(() => {
    const handleNavigateMention = (event) => {
      if (target) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            const prevIndex = index >= suggestions.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          case 'ArrowUp':
            event.preventDefault();
            const nextIndex = index <= 0 ? suggestions.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          case 'Tab':
          case 'Enter': {
            event.preventDefault();
            const entity = { id: suggestions[index], type: 'user' }; // TODO: derive from upstream
            insertMention(editor, target, suggestions[index], entity);
            setIndex(0);
            setTarget(null);
            break;
          }
          case 'Escape':
            event.preventDefault();
            setIndex(0);
            setTarget(null);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleNavigateMention);

    return () => {
      document.removeEventListener('keydown', handleNavigateMention);
    };
  }, [editor, index, suggestions, target, setIndex, setTarget]);
};

export const usePopover = ({ count, editor, index, search, target }) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (target && count > 0) {
      const element = popoverRef.current;
      if (element) {
        const domRange = ReactEditor.toDOMRange(editor, target);
        const rect = domRange.getBoundingClientRect();
        element.style.top = `${rect.top + window.pageYOffset + 24}px`;
        element.style.left = `${rect.left + window.pageXOffset}px`;
      }
    }
  }, [count, editor, index, popoverRef, search, target]);

  return popoverRef;
};
