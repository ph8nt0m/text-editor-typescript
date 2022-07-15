import React, { memo, useCallback } from 'react';
import { Slate, Editable } from 'slate-react';

import { Layout } from '../ui';
import { ActionsBar } from './actions';
import { Element, Leaf, editor } from './editor';
import { FormatBar, handleFormatHotkey, useToggleFormat } from './format';
import { handleTriggerMention, MentionSuggestions } from './mention';
import { ContentAst } from './types';

/**
 * TODOs
 * - [HARD] support multiple mentions and triggers e.g. `@` (user), `#` (field), `:` (emoji)
 * - [HARD] update component signatures to use use `Option`-based interface and async `mentionResolvers`
 * - add types
 * - productionize
 */
export const TextEditor = memo(
  ({ formats = [], mentions = [], value, onChange, onPost }) => {
    const renderElement = useCallback(Element, []);
    const renderLeaf = useCallback(Leaf, []);
    const [enableFormat, toggleFormat] = useToggleFormat(formats);

    return (
      <Slate editor={editor} value={coerce(value)} onChange={onChange}>
        <Layout
          border="border"
          borderRadius="m"
          direction="column"
          p={2}
          spacing={2}>
          {enableFormat && <FormatBar formats={formats} />}
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some rich text…"
            spellCheck
            autoFocus
            onKeyDown={handleFormatHotkey(editor)}
          />
          <ActionsBar
            enableFormat={enableFormat}
            onMention={handleTriggerMention(editor)}
            onPost={onPost}
            onToggleFormat={toggleFormat}
          />
        </Layout>
        <MentionSuggestions mentions={mentions} />
      </Slate>
    );
  },
);

/**
 * Initializes a node if AST is empty, returns the provided AST otherwise.
 */
export const coerce = (ast: ContentAst): ContentAst => {
  if (ast.length === 0) {
    return [
      {
        type: 'p',
        children: [
          {
            text: '',
          },
        ],
      },
    ];
  } else {
    return ast;
  }
};
