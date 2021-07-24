export interface Node {
  type: string
}

export interface ParentOf<T extends Node[]> {
  children: T
}

export interface Document extends ParentOf<BlockContent[]> {
  type: 'document'
}

export type BlockContent =
| Section
| Headline
| Paragraph
| Example
| Source
| Quote
| Drawer
| List
| Table
| HorizontalRule

export type InlineContent =
| Link
| Text
| Bold
| Verbatim
| Italic
| Strikethrough
| Underlined
| Code
| Footnote

export type TableContent = TableRow | TableHorizontalRule

export interface Section extends ParentOf<BlockContent[]> {
  type: 'section'
  level: number
}

export interface Headline extends Node, ParentOf<InlineContent[]> {
  type: 'headline'
  level: number
}

export interface Paragraph extends Node, ParentOf<InlineContent[]> {
  type: 'paragraph'
}

export interface Example extends Node {
  type: 'example'
  params: string[]
  value: string
}

export interface Source extends Node {
  type: 'source'
  params: string[]
  value: string
}

export interface Quote extends Node {
  type: 'quote'
  value: string
}

export interface List extends Node, ParentOf<Array<List | ListItem>> {
  type: 'list'
  indent: number
  ordered: boolean
}

export interface ListItem extends Node, ParentOf<InlineContent[]> {
  type: 'listItem'
  indent: number
  tag: string | null
}

export interface Table extends Node, ParentOf<TableContent[]> {
  type: 'table'
}

export interface TableRow extends Node, ParentOf<TableCell[]> {
  type: 'tableRow'
}

export interface TableCell extends Node, ParentOf<InlineContent[]> {
  type: 'tableCell'
}

export interface TableHorizontalRule extends Node {
  type: 'tableHorizontalRule'
}

export interface HorizontalRule extends Node {
  type: 'horizontalRule'
}

// https://orgmode.org/manual/Creating-Footnotes.html
export interface Footnote extends Node, ParentOf<Array<BlockContent | InlineContent>> {
  type: 'footnote'
}

// https://orgmode.org/manual/Drawers.html
export interface Drawer extends Node {
  type: 'drawer'
  name: string
  value: string
}

export interface Link extends Node {
  type: 'link'
  protocol: string
  description: string
  value: string
  search: string | number | null
}

export interface Text extends Node {
  type: 'text'
  value: string
}

export interface Bold extends Node {
  type: 'bold'
  value: string
}

export interface Verbatim extends Node {
  type: 'verbatim'
  value: string
}

export interface Italic extends Node {
  type: 'italic'
  value: string
}

export interface Strikethrough extends Node {
  type: 'strikethrough'
  value: string
}

export interface Underlined extends Node {
  type: 'underlined'
  value: string
}

export interface Code extends Node {
  type: 'code'
  value: string
}
