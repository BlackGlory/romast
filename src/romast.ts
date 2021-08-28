export interface Node {
  type: string
}

export interface Parent {
  children: Node[]
}

export interface ParentOf<T extends Node[]> extends Parent {
  children: T
}

export type BlockNode =
| Document
| Section
| Headline
| Paragraph
| Example
| Source
| Quote
| List
| ListItem
| Table
| TableRowGroup
| TableRow
| TableCell
| HorizontalRule
| Drawer

export type InlineNode =
| Footnote
| InlineFootnote
| Link
| Text
| Bold
| Verbatim
| Italic
| Strikethrough
| Underlined
| Code
| Newline

export type DocumentContent =
| UniversalBlockContent
| Section

export type SectionContent =
| UniversalBlockContent
| Section

export type ListContent = List | ListItem

export type UniversalBlockContent =
| Paragraph
| Example
| Source
| Quote
| Drawer
| List
| Table
| HorizontalRule

export type UniversalInlineContent =
| Link
| Text
| Bold
| Verbatim
| Italic
| Strikethrough
| Underlined
| Code
| Footnote
| InlineFootnote
| Newline

export interface Document extends ParentOf<DocumentContent[]> {
  type: 'document'
}

export interface Section extends ParentOf<SectionContent[]> {
  type: 'section'
  level: number
  headline: Headline
}

export interface Headline extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'headline'
  tags: string[]
}

export interface Paragraph extends Node, ParentOf<UniversalInlineContent[]> {
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

export interface List extends Node, ParentOf<ListContent[]> {
  type: 'list'
  indent: number
  ordered: boolean
}

export interface ListItem extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'listItem'
  indent: number
  checked: boolean | null
  term: string | null
}

export interface Table extends Node, ParentOf<TableRowGroup[]> {
  type: 'table'
  header: TableRowGroup | null
}

export interface TableRowGroup extends Node, ParentOf<TableRow[]> {
  type: 'tableRowGroup'
}

export interface TableRow extends Node, ParentOf<TableCell[]> {
  type: 'tableRow'
}

export interface TableCell extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'tableCell'
}

export interface HorizontalRule extends Node {
  type: 'horizontalRule'
}

export interface Footnote extends Node, ParentOf<UniversalBlockContent[]> {
  type: 'footnote'
}

export interface InlineFootnote extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'inlineFootnote'
}

export interface Newline extends Node {
  type: 'newline'
}

export interface Drawer extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'drawer'
  name: string
}

export interface Link extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'link'
  protocol: 'internal' | string
  url: string
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
