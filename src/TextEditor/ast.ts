import _ from 'lodash';

import { AnyNode, ContentAst, Entity } from './types';

// example AST helper, implementors to figure out non-imperative and immuatable implementation.
const visit = (nodes: AnyNode[], cb: (node: AnyNode) => void) => {
  nodes.forEach((node) => {
    cb(node);
    if (node.children) {
      visit(node.children, cb);
    }
  });
};

/**
 * Serializes the AST to a simple string
 */
export const serialize = (ast: ContentAst): string => {
  let string = '';
  visit(ast, (node) => {
    const text = node.text || '';
    // if BlockNode, append newline etc.
    string += text;
  });
  return string;
};

/**
 * Serializes the AST to a HTML string
 */
export const serializeHtml = (ast: ContentAst): string => {
  // implement a custom HTML serializer by checking out example in: https://docs.slatejs.org/concepts/10-serializing#html0
  // The following is just a placeholder example (not functional), you should loop over nodes and decide what to do.  Be mindful of carefully escaping and sanitizing HTML.
  let html = '';
  visit(ast, (node) => {
    const text = node.text || '';
    const tag = node.type;
    if (tag) {
      html += `<${tag}>${text}</${tag}>`;
    } else {
      html += text;
    }
  });
  return html;
};

/**
 * Extracts mentioned entities from the AST.
 */
export const extractMentions = (ast: ContentAst): Entity[] => {
  const mentions: Entity[] = [];
  visit(ast, (node) => {
    if (node.type === 'mention') {
      console.log(node);
      mentions.push(node.entity);
    }
  });
  return _.uniqWith(mentions, _.isEqual);
};

/**
 * Validates the AST.
 * Returns the AST if no errors found, throws otherwise.
 */
export const validate = (ast: ContentAst): ContentAst => {
  // Basic idea is to loop over nodes, make assertions on the interface of nodes to check for required attributes or warn against unsupported attributes.
  // Validation can be implemented against the `ContentAst` interfaces (which support static validation but not runtime validation checks, which is what this method is aimed to provide)
  return ast; // TODO
};
