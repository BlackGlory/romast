// https://github.com/orgapp/orgajs/blob/v2.4.9/packages/orga/src/types.ts
// 注意, orga的types.ts并不是一份准确的AST定义.
// 它包含了会在后处理阶段被消耗掉, 并不最终作为AST输出的节点:
// - `list.item.tag`
// - `keyword`
// - `planning.keyword`
// - `planning.timestamp`
// - `block.begin`
// - `block.end`
// - `drawer.begin`
// - `drawer.end`
// - `comment`
// - `footnote.label`
// - `footnote.inline.begin`
// - `footnote.inline.end`
// - `table.columnSeparator`
// - `html`

import { Literal as UnistLiteral, Node, Parent } from 'unist'
export { Node, Parent } from 'unist'

// The original name is `Parent`, which is definitely a wrong name
interface Child {
  parent?: Parent
}

type Primitive = string | number | boolean

interface Attributes {
  [key: string]: Primitive | Record<string, Primitive>
}

interface Attributed {
  attributes: Attributes
}

interface Timestamp {
  date: Date
  end?: Date
}

interface Literal extends UnistLiteral {
  value: string
}

export type DocumentContent =
| UniversalBlockContent
| Section
| Footnote

export type SectionContent =
| UniversalBlockContent
| Section
| Headline
| Planning

export type TableContent = TableRow | TableRule

export type HeadlineContent =
| Stars
| Todo
| Priority
| Tags
| UniversalInlineContent

export type ListContent = List | ListItem

export type ListItemContent =
| ListItemBullet
| ListItemCheckbox
| UniversalInlineContent

export type UniversalInlineContent =
| StyledText
| Link
| FootnoteReference
| Newline

export type UniversalBlockContent =
| Paragraph
| Block
| Drawer
| List
| Table
| HorizontalRule

export interface Document extends Child, Parent {
  type: 'document'
  properties: Record<string, string>
  children: DocumentContent[]
}

export interface Section extends Child, Parent {
  type: 'section'
  level: number
  properties: Record<string, string>
  children: SectionContent[]
}

export interface Headline extends Child, Parent {
  type: 'headline'
  level: number

  // 只有带有Todo节点时, 该属性为true
  actionable: boolean

  // 带有Priority节点的Headline特有的属性
  priority?: string

  // 带有Tag节点的Headline特有的属性
  tags?: string[]

  content: string

  // See https://github.com/orgapp/orgajs/issues/110
  children: HeadlineContent[]
}

export interface Footnote extends Child, Parent {
  type: 'footnote'
  label: string

  // See https://github.com/orgapp/orgajs/issues/110
  children: UniversalBlockContent[]
}

export interface FootnoteReference extends Child, Parent {
  type: 'footnote.reference'
  label: string
  children: UniversalInlineContent[]
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
  children: ListContent[]
}

export interface ListItem extends Child, Parent {
  type: 'list.item'
  indent: number

  // 正确的名称应该是`term`, 当节点有`term`时, 代表它是一个description list item
  // https://orgmode.org/manual/Plain-Lists.html
  tag?: string

  // See https://github.com/orgapp/orgajs/issues/110
  children: ListItemContent[]
}

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
  children: UniversalInlineContent[]
}

export interface TableRule extends Node {
  type: 'table.hr'
}

export interface Paragraph extends Child, Parent, Attributed {
  type: 'paragraph'
  children: UniversalInlineContent[]
}

export interface HorizontalRule extends Node {
  type: 'hr'
}

export interface Newline extends Node {
  type: 'newline'
}

export interface StyledText extends Literal {
  type: 'text.plain'
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

export interface ListItemCheckbox extends Node {
  type: 'list.item.checkbox'
  checked: boolean
}

export interface ListItemBullet extends Node {
  type: 'list.item.bullet'
  ordered: boolean
  indent: number
}
