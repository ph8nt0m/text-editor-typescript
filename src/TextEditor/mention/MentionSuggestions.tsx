import React, { memo, useState } from 'react';
import { Range } from 'slate';
import { useSlate } from 'slate-react';

import { MenuOption, Portal } from '../../ui';
import { useMatchMention, useNavigateMention, usePopover } from './hooks';
import { insertMention } from './utils';

// TODO: Refactor to support async + options-based API
export const MentionSuggestions = memo(({ mentions }) => {
  const editor = useSlate();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [target, setTarget] = useState<Range | null>(null);

  const suggestions = (search
    ? mentions.filter((mention) =>
        mention.toLowerCase().startsWith(search.toLowerCase()),
      )
    : mentions
  ).slice(0, 10);

  const popoverRef = usePopover({
    count: suggestions.length,
    editor,
    index,
    search,
    target,
  });

  useNavigateMention({
    editor,
    index,
    suggestions,
    target,
    setIndex,
    setTarget,
  });

  useMatchMention({ editor, setSearch, setTarget });

  const handleSelectSuggestion = (suggestion) => () => {
    const entity = { id: suggestion, type: 'user' }; // TODO: derive this from upstream
    insertMention(editor, target, suggestion, entity);
  };

  if (!target || suggestions.length === 0) {
    return null;
  }

  return (
    <Portal>
      <div
        ref={popoverRef}
        style={{
          top: '-9999px',
          left: '-9999px',
          position: 'absolute',
          zIndex: 1,
          padding: '3px',
          background: 'white',
          borderRadius: '4px',
          boxShadow: '0 1px 5px rgba(0,0,0,.2)',
        }}>
        {suggestions.map((suggestion, i) => (
          <MenuOption
            key={suggestion}
            isFocused={i === index}
            option={{ label: suggestion, value: suggestion }}
            onClick={handleSelectSuggestion(suggestion)}
          />
        ))}
      </div>
    </Portal>
  );
});
