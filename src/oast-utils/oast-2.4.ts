// https://github.com/orgapp/orgajs/blob/v2.4.9/packages/orga/src/types.ts

import { Literal as UnistLiteral, Node, Parent } from 'unist'
export { Node, Parent } from 'unist'

// Basic Types

// The original name is `Parent`, which is definitely a wrong name
export interface Child {
  parent?: Parent
}

export type Primitive = string | number | boolean

export interface Attributes {
  [key: string]: Primitive | Record<string, Primitive>
}

export interface Attributed {
  attributes: Attributes
}

export interface Timestamp {
  date: Date
  end?: Date
}

// Syntax Tree Nodes

export interface Document extends Child, Parent {
  type: 'document'
  properties: Record<string, string>
  children: TopLevelContent[]
}

export interface Section extends Child, Parent {
  type: 'section'
  level: number
  properties: Record<string, string>
  children: Content[]
}

export type TopLevelContent =
| Content
| Keyword
| Footnote

export type Content =
| Section
| Paragraph
| Block
| Drawer
| Planning
| List
| Table
| HorizontalRule
| Headline
| HTML

export interface Footnote extends Child, Parent {
  type: 'footnote'
  label: string

  // See https://github.com/orgapp/orgajs/issues/110
  children: Content[]
}

export interface Block extends Literal, Attributed {
  type: 'block'
  name: string
  params: string[]
  value: string
}

export interface Drawer extends Literal {
  type: 'drawer'
  name: string
  value: string
}

export interface Planning extends Node {
  type: 'planning'
  keyword: string
  timestamp: Timestamp
}

export interface List extends Child, Parent, Attributed {
  type: 'list'
  indent: number
  ordered: boolean
  children: Array<List | ListItem>
}

export type TableContent = TableRow | TableRule

export interface Table extends Child, Parent, Attributed {
  type: 'table'
  children: TableContent[]
}

export interface TableRow extends Child, Parent {
  type: 'table.row'
  children: TableCell[]
}

export interface TableCell extends Child, Parent {
  type: 'table.cell'
  children: PhrasingContent[]
}

export interface ListItem extends Child, Parent {
  type: 'list.item'
  indent: number
  tag?: string

  // See https://github.com/orgapp/orgajs/issues/110
  children: Array<ListItemBullet | PhrasingContent>
}

export interface Headline extends Child, Parent {
  type: 'headline'
  level: number
  keyword?: string
  actionable: boolean
  priority?: string
  content: string
  tags?: string[]

  // See https://github.com/orgapp/orgajs/issues/110
  children: Array<Token | PhrasingContent>
}

export interface Paragraph extends Child, Parent, Attributed {
  type: 'paragraph'
  children: PhrasingContent[]
}

interface Literal extends UnistLiteral {
  value: string
}

export interface HTML extends Literal {
  type: 'html'
}

// Tokens

export type Token =
| Keyword
| Todo
| Newline
| Stars
| Priority
| Tags
| PlanningKeyword
| PlanningTimestamp
| ListItemTag
| ListItemCheckbox
| ListItemBullet
| TableColumnSeparator
| FootnoteLabel
| FootnoteInlineBegin
| FootnoteReferenceEnd
| BlockBegin
| BlockEnd
| DrawerBegin
| DrawerEnd
| Comment

export type PhrasingContent =
| StyledText
| Link
| FootnoteReference
| Newline

export interface HorizontalRule extends Node {
  type: 'hr'
}

export interface Newline extends Node {
  type: 'newline'
}

export interface StyledText extends Literal {
  type:
  | 'text.plain'
  | 'text.bold'
  | 'text.verbatim'
  | 'text.italic'
  | 'text.strikeThrough'
  | 'text.underline'
  | 'text.code'
}

export interface Link extends Literal {
  type: 'link'
  protocol: string
  description?: string
  value: string
  search?: string | number
}

/**
 * A footnote reference, which is either:
 *
 * `[fn:LABEL]` - a plain footnote reference.
 *
 * `[fn:LABEL:DEFINITION]` - an inline footnote definition.
 *
 * `[fn::DEFINITION]` - an anonymous (inline) footnote definition.
 *
 * See https://orgmode.org/worg/dev/org-syntax.html#Footnote_References.
 *
 * If `label` is the empty string, then this is treated as an
 * anonymous footnote.
 *
 * If `children` is empty, then this is considered to not define a new
 * footnote (and in which case, `label` should not be the empty
 * string), if `children` is non-empty, then this is an inline
 * footnote definition.
 */
export interface FootnoteReference extends Child, Parent {
  type: 'footnote.reference'
  label: string
  children: PhrasingContent[]
}

export interface FootnoteInlineBegin extends Node {
  type: 'footnote.inline.begin'
  label: string
}

export interface FootnoteReferenceEnd extends Node {
  type: 'footnote.reference.end'
}

// headline tokens

export interface Stars extends Node {
  type: 'stars'
  level: number
}

export interface Todo extends Node {
  type: 'todo'
  keyword: string
  actionable: boolean
}

export interface Priority extends Literal {
  type: 'priority'
  value: string
}

export interface Tags extends Node {
  type: 'tags'
  tags: string[]
}

// block tokens

export interface BlockBegin extends Node {
  type: 'block.begin'
  name: string
  params: string[]
}

export interface BlockEnd extends Node {
  type: 'block.end'
  name: string
}

// drawer tokens

export interface DrawerBegin extends Node {
  type: 'drawer.begin'
  name: string
}

export interface DrawerEnd extends Node {
  type: 'drawer.end'
}

export interface Comment extends Literal {
  type: 'comment'
}

export interface Keyword extends Node {
  type: 'keyword'
  key: string
  value: string
}

export interface FootnoteLabel extends Node {
  type: 'footnote.label'
  label: string
}

export interface PlanningKeyword extends Literal {
  type: 'planning.keyword'
  value: string
}

export interface PlanningTimestamp extends UnistLiteral {
  type: 'planning.timestamp'
  value: Timestamp
}

export interface ListItemTag extends Literal {
  type: 'list.item.tag'
}

export interface ListItemCheckbox extends Node {
  type: 'list.item.checkbox'
  checked: boolean
}

export interface ListItemBullet extends Node {
  type: 'list.item.bullet'
  ordered: boolean
  indent: number
}

export interface TableRule extends Node {
  type: 'table.hr'
}

export interface TableColumnSeparator extends Node {
  type: 'table.columnSeparator'
}
