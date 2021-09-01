// https://github.com/orgapp/orgajs/blob/orga@3.1.0/packages/orga/src/types.ts
// 注意, orga的types.ts并不是一份准确的AST定义.
// 它包含了会在后处理阶段被消耗掉, 并不最终作为AST输出的节点:
// - `keyword`
// - `block.begin`
// - `block.end`
// - `comment`
// - `footnote.inline.begin`
// - `footnote.inline.end`
// - `html`

import { Node, Parent } from 'unist'
export { Node, Parent } from 'unist'

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

export type DocumentContent =
| UniversalBlockContent
| Section
| Footnote
| Newline // 自orga v3.1.0开始出现
| EmptyLine // 自orga v3.1.0开始出现

export type SectionContent =
| UniversalBlockContent
| Section
| Headline
| Planning

export type TableContent = TableRow | TableRule

export type TableRowContent = TableColumnSeparator | TableCell

export type HeadlineContent =
| Stars
| Todo
| Priority
| Tags
| UniversalInlineContent

export type ListContent = List | ListItem

export type ListItemContent =
| ListItemBullet
| ListItemTag
| ListItemCheckbox
| UniversalInlineContent

export type LinkContent = 
| UniversalInlineContent
| Opening
| Closing
| LinkPath

export type PlanningContent = 
| PlanningKeyword
| PlanningTimestamp

export type FootnoteReferenceContent = 
| FootnoteLabel
| Opening
| Closing
| UniversalInlineContent

export type FootnoteContent =
| FootnoteLabel
| UniversalBlockContent

export type DrawerContent =
| DrawerBegin
| DrawerEnd
| UniversalInlineContent

export type UniversalBlockContent =
| Paragraph
| Block
| Drawer
| List
| Table
| HorizontalRule

export type UniversalInlineContent =
| Text
| Link
| FootnoteReference
| Newline
| EmptyLine

export interface Document extends Parent {
  type: 'document'
  properties: Record<string, string>
  children: DocumentContent[]
}

export interface Section extends Parent {
  type: 'section'
  level: number
  properties: Record<string, string>
  children: SectionContent[]
}

export interface Headline extends Parent {
  type: 'headline'
  level: number

  // 只有带有Todo节点时, 该属性为true
  actionable: boolean

  // 带有Priority节点的Headline特有的属性
  priority?: string

  // 带有Tag节点的Headline特有的属性
  tags?: string[]

  // See https://github.com/orgapp/orgajs/issues/110
  children: HeadlineContent[]
}

export interface Footnote extends Parent {
  type: 'footnote'
  label: string

  // See https://github.com/orgapp/orgajs/issues/110
  children: FootnoteContent[]
}

export interface FootnoteReference extends Parent {
  type: 'footnote.reference'
  label?: string
  children: FootnoteReferenceContent[]
}

export interface Block extends Node, Attributed {
  type: 'block'
  name: string
  params: string[]
  value: string
}

export interface Drawer extends Node, Parent {
  type: 'drawer'
  name: string
  value: string
  children: DrawerContent[]
}

export interface DrawerBegin {
  type: 'drawer.begin'
  name: string
}

export interface DrawerEnd {
  type: 'drawer.end'
}

export interface Planning extends Node, Parent {
  type: 'planning'
  keyword: string
  timestamp: Timestamp
  children: PlanningContent[]
}

export interface List extends Parent, Attributed {
  type: 'list'
  indent: number
  ordered: boolean
  children: ListContent[]
}

export interface ListItem extends Parent {
  type: 'list.item'
  indent: number

  // 正确的名称应该是`term`, 当节点有`term`时, 代表它是一个description list item
  // https://orgmode.org/manual/Plain-Lists.html
  tag?: string

  // See https://github.com/orgapp/orgajs/issues/110
  children: ListItemContent[]
}

export interface Table extends Parent, Attributed {
  type: 'table'
  children: TableContent[]
}

export interface TableRow extends Parent {
  type: 'table.row'
  children: TableRowContent[]
}

export interface TableCell extends Parent {
  type: 'table.cell'
  children: UniversalInlineContent[]
}

export interface TableRule extends Node {
  type: 'table.hr'
}

export interface TableColumnSeparator extends Node {
  type: 'table.columnSeparator'
}

export interface Paragraph extends Parent, Attributed {
  type: 'paragraph'
  children: UniversalInlineContent[]
}

export interface HorizontalRule extends Node {
  type: 'hr'
}

export interface Newline extends Node {
  type: 'newline'
}

export interface EmptyLine extends Node {
  type: 'emptyLine'
}

export interface Text extends Node {
  type: 'text'
  style?: 'bold'
        | 'verbatim'
        | 'italic'
        | 'strikeThrough'
        | 'underline'
        | 'code'
  value: string
}

export interface Link extends Parent {
  type: 'link'
  path: {
    protocol: string
    value: string
    search?: string | number
  }
  children: LinkContent[]
}

export interface LinkPath extends Node {
  type: 'link.path'
  protocol: string
  value: string
  search?: string | number
}

export interface Opening extends Node {
  type: 'opening'
  element: string
}

export interface Closing extends Node {
  type: 'closing'
  element: string
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

export interface Priority extends Node {
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

export interface ListItemTag extends Node {
  type: 'list.item.tag'
  value: string
}

export interface FootnoteLabel extends Node {
  type: 'footnote.label'
  label: string
}

export interface PlanningKeyword extends Node {
  type: 'planning.keyword'
  value: string
}

export interface PlanningTimestamp extends Node {
  type: 'planning.timestamp'
  value: Timestamp 
}
