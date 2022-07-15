import { Transforms } from 'slate';

export const insertMention = (editor, target, text, entity) => {
  Transforms.select(editor, target);
  const mention = {
    type: 'mention',
    entity,
    children: [{ text }],
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};
