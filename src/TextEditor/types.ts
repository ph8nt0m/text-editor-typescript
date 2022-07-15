/**
 * The content AST supporting unified representation of advanced content features (e.g. Rich-text formatting, mentions).
 */
export type ContentAst = AnyNode[];

/**
 * A TextNode is a leaf node that represents text content.
 *
 * - Text content is what is meaningfully human-readable content.
 */
export interface TextNode {
  text: string;
}

/**
 * A MarkNode is a TextNode that includes optional mark-level formatting for the associated text content.
 */
export interface MarkNode extends TextNode {
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
}

/**
 * A BlockNode is a non-leaf node that contains other nodes as children.
 *
 * - Typical blocknodes include HTML block elements (e.g. `blockquote`, `h1`, `p`).
 * - Block nodes can be optionally aligned
 */
export interface BlockNode {
  type: BlockNodeType;
  children: AnyNode[];
  align?: BlockAlign;
}

/**
 * A MentionNode is a "BlockNode" representing a mention.
 *
 * - A MentionNode keeps track of the `Entity` that is being mentioned.  This `Entity` supports further usage to derive and use the entity based on its provided `id` and `type`.
 * - A MentionNode should always include a single-element TextNode reflecting the text content of that mention.
 */
export interface MentionNode {
  type: MentionNodeType;
  entity: Entity;
  children: [TextNode]; // should contain a single-element TextNode
}

// external interfaces
export interface Entity {
  id: Uuid;
  type: EntityType;
}

export type EntityType = 'user' | 'document';

// type aliases
export type BlockAlign = 'left' | 'center' | 'right' | 'justify';
export type BlockNodeType =
  | 'blockquote'
  | 'h1'
  | 'h2'
  | 'li'
  | 'ol'
  | 'p'
  | 'pre'
  | 'ul';
export type MentionNodeType = 'mention';
export type AnyNode = MarkNode | BlockNode | MentionNode;
export type Uuid = string;
