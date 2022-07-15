import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

export const handleTriggerMention = (editor) => () => {
  if (!editor.selection) {
    Transforms.select(editor, Editor.end(editor, []));
  }
  editor.insertText('@');
  ReactEditor.focus(editor);
};
