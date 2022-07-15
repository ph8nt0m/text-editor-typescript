import { Editor, Element, Transforms } from 'slate';

import { LIST_TYPES, TEXT_ALIGN_TYPES } from './constants';

const getBlockType = (format) =>
  TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type';

export const testIsBlock = (type) => type === 'block';

export const testIsMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const testIsBlockActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) {
    return false;
  } else {
    const blockType = getBlockType(format);
    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          n[blockType] === format,
      }),
    );
    return !!match;
  }
};

export const testIsFormatActive = (editor, format, type) => {
  const isBlock = testIsBlock(type);
  const test = isBlock ? testIsBlockActive : testIsMarkActive;
  return test(editor, format);
};

export const toggleFormat = (editor, format, type) => {
  const isBlock = testIsBlock(type);
  const toggle = isBlock ? toggleBlock : toggleMark;
  toggle(editor, format);
};

export const toggleMark = (editor, format) => {
  const isActive = testIsFormatActive(editor, format, 'mark');

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const toggleBlock = (editor, format) => {
  const isActive = testIsFormatActive(editor, format, 'block');
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<Element>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'p' : isList ? 'li' : format,
    };
  }
  Transforms.setNodes<Element>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};
