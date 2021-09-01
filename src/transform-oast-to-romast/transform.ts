import * as OAST from '@src/oast-3.1'
import * as ROMAST from '@src/romast'
import * as OAST_IS from '@oast-utils/is'
import {
  example
, source
, quote
, text
, bold
, verbatim
, italic
, strikethrough
, underlined
, code
, newline
, tableRowGroup
} from '@romast-utils/builder'
import { CustomError, assert } from '@blackglory/errors'
import { isntUndefined } from '@blackglory/types'
import { findFootnote } from './find-footnote'

export class UnknownNodeError extends CustomError {}

export function transformDocument(root: OAST.Document): ROMAST.Document {
  return {
    type: 'document'
  , children: map(root.children, x => transformDocumentContent(x, root))
  }
}

function transformDocumentContent(node: OAST.DocumentContent, root: OAST.Document) {
  if (OAST_IS.isUniversalBlockContent(node)) return transformUniversalBlockContent(node, root)
  if (OAST_IS.isSection(node)) return transformSection(node, root)
  if (OAST_IS.isFootnote(node)) return transformFootnote(node, root)
  if (OAST_IS.isNewline(node)) return transformNewline(node, root)
  if (OAST_IS.isEmptyline(node)) return transformEmptyline(node, root)
  throw new UnknownNodeError()
}

function transformSectionContent(node: OAST.SectionContent, root: OAST.Document) {
  if (OAST_IS.isUniversalBlockContent(node)) return transformUniversalBlockContent(node, root)
  if (OAST_IS.isSection(node)) return transformSection(node, root)
  if (OAST_IS.isHeadline(node)) return undefined
  if (OAST_IS.isPlanning(node)) return transformPlanning(node, root)
  throw new UnknownNodeError()
}

function transformTableContents(nodes: OAST.TableContent[], root: OAST.Document) {
  const results: ROMAST.TableRowGroup[] = []

  let rowGroup: ROMAST.TableRowGroup = tableRowGroup([])
  for (const node of nodes) {
    if (OAST_IS.isTableRow(node)) {
      rowGroup.children.push(transformTableRow(node, root))
    } else if (OAST_IS.isTableRule(node)) {
      results.push(rowGroup)
      rowGroup = tableRowGroup([])
    } else {
      throw new UnknownNodeError()
    }
  }
  if (rowGroup.children.length > 0) {
    results.push(rowGroup)
  }

  return results
}

function transformTableRowContent(node: OAST.TableRowContent, root: OAST.Document) {
  if (OAST_IS.isTableCell(node)) return transformTableCell(node, root)
  if (OAST_IS.isTableColumnSeparator(node)) return transformTableColumnSeparator(node, root)
  throw new UnknownNodeError()
}

function transformTableColumnSeparator(node: OAST.TableColumnSeparator, root: OAST.Document): undefined {
  return undefined
}

function transformHeadlineContent(node: OAST.HeadlineContent, root: OAST.Document) {
  if (OAST_IS.isStars(node)) return transformStars(node, root)
  if (OAST_IS.isTodo(node)) return transformTodo(node, root)
  if (OAST_IS.isPriority(node)) return transformPriority(node, root)
  if (OAST_IS.isTags(node)) return transformTags(node, root)
  if (OAST_IS.isUniversalInlineContent(node)) return transformUniversalInlineContent(node, root)
  throw new UnknownNodeError()
}

function transformListContent(node: OAST.ListContent, root: OAST.Document) {
  if (OAST_IS.isList(node)) return transformList(node, root)
  if (OAST_IS.isListItem(node)) return transformListItem(node, root)
  throw new UnknownNodeError()
}

function transformListItemContent(node: OAST.ListItemContent, root: OAST.Document) {
  if (OAST_IS.isListItemBullet(node)) return transformListItemBullet(node, root)
  if (OAST_IS.isListItemTag(node)) return transformListItemTag(node, root)
  if (OAST_IS.isListItemCheckbox(node)) return transformListItemCheckbox(node, root)
  if (OAST_IS.isUniversalInlineContent(node)) return transformUniversalInlineContent(node, root)
  throw new UnknownNodeError()
}

function transformUniversalBlockContent(
  node: OAST.UniversalBlockContent
, root: OAST.Document
) {
  if (OAST_IS.isParagraph(node)) return transformParagraph(node, root)
  if (OAST_IS.isBlock(node)) return transformBlock(node, root)
  if (OAST_IS.isDrawer(node)) return transformDrawer(node, root)
  if (OAST_IS.isList(node)) return transformList(node, root)
  if (OAST_IS.isTable(node)) return transformTable(node, root)
  if (OAST_IS.isHorizontalRule(node)) return transformHorizontalRule(node, root)
  throw new UnknownNodeError()
}

function transformUniversalInlineContent(
  node: OAST.UniversalInlineContent
, root: OAST.Document
): ROMAST.UniversalInlineContent | undefined {
  if (OAST_IS.isText(node)) return transformText(node, root)
  if (OAST_IS.isLink(node)) return transformLink(node, root)
  if (OAST_IS.isFootnoteReference(node)) return transformFootnoteReference(node, root)
  if (OAST_IS.isNewline(node)) return transformNewline(node, root)
  if (OAST_IS.isEmptyline(node)) return transformEmptyline(node, root)
  throw new UnknownNodeError()
}

function transformSection(node: OAST.Section, root: OAST.Document): ROMAST.Section {
  const [headline, ...children] = node.children
  assert(OAST_IS.isHeadline(headline), 'The first element of children should be a headline')

  return {
    type: 'section'
  , level: node.level
  , headline: transformHeadline(headline, root)
  , children: map(children, x => transformSectionContent(x, root))
  }
}

function transformHeadline(
  node: OAST.Headline
, root: OAST.Document
): ROMAST.Headline {
  return {
    type: 'headline'
  , tags: node.tags ?? []
  , children: map(node.children, x => transformHeadlineContent(x, root))
  }
}

function transformFootnote(node: OAST.Footnote, root: OAST.Document): undefined {
  return undefined
}

function transformBlock(
  node: OAST.Block
, root: OAST.Document
): ROMAST.Example | ROMAST.Source | ROMAST.Example | ROMAST.Quote | undefined {
  switch (node.name.toLowerCase()) {
    case 'quote': return quote(node.value)
    case 'src': return source(node.params, node.value)
    case 'example': return example(node.params, node.value)
    default: return undefined
  }
}

function transformDrawer(node: OAST.Drawer, root: OAST.Document): ROMAST.Drawer {
  return {
    type: 'drawer'
  , name: node.name
  , children: map(node.children, x => transformDrawerContent(x, root))
  }
}

function transformDrawerContent(node: OAST.DrawerContent, root: OAST.Document) {
  if (OAST_IS.isDrawerBegin(node)) return transformDrawerBegin(node, root)
  if (OAST_IS.isDrawerEnd(node)) return transformDrawerEnd(node, root)
  if (OAST_IS.isUniversalInlineContent(node)) return transformUniversalInlineContent(node, root)
  throw new UnknownNodeError()
}

function transformDrawerBegin(
  node: OAST.DrawerBegin
, root: OAST.Document
): undefined {
  return undefined
}

function transformDrawerEnd(node: OAST.DrawerEnd, root: OAST.Document): undefined {
  return undefined
}

function transformPlanning(node: OAST.Planning, root: OAST.Document): undefined {
  return undefined
}

function transformList(node: OAST.List, root: OAST.Document): ROMAST.List {
  return {
    type: 'list'
  , indent: node.indent
  , ordered: node.ordered
  , children: map(node.children, x => transformListContent(x, root))
  }
}

function transformTable(node: OAST.Table, root: OAST.Document): ROMAST.Table {
  const tableContents = transformTableContents(node.children, root)
  if (tableContents.length <= 1) {
    return {
      type: 'table'
    , header: null
    , children: tableContents
    }
  } else {
    const [header, ...children] = tableContents
    return {
      type: 'table'
    , header
    , children
    }
  }
}

function transformTableRow(
  node: OAST.TableRow
, root: OAST.Document
): ROMAST.TableRow {
  return {
    type: 'tableRow'
  , children: map(node.children, x => transformTableRowContent(x, root))
  }
}

function transformTableCell(
  node: OAST.TableCell
, root: OAST.Document
): ROMAST.TableCell {
  return {
    type: 'tableCell'
  , children: map(node.children, x => transformUniversalInlineContent(x, root))
  }
}

function transformListItem(
  node: OAST.ListItem
, root: OAST.Document
): ROMAST.ListItem {
  const checkbox = node.children.find(OAST_IS.isListItemCheckbox)
  const checked = checkbox ? checkbox.checked : null
  return {
    type: 'listItem'
  , indent: node.indent
  , checked
  , term: node.tag ?? null
  , children: map(node.children, x => transformListItemContent(x, root))
  }
}

function transformParagraph(
  node: OAST.Paragraph
, root: OAST.Document
): ROMAST.Paragraph {
  return {
    type: 'paragraph'
  , children: map(node.children, x => transformUniversalInlineContent(x, root))
  }
}

function transformHorizontalRule(
  node: OAST.HorizontalRule
, root: OAST.Document
): ROMAST.HorizontalRule {
  return { type: 'horizontalRule' }
}

function transformNewline(node: OAST.Newline, root: OAST.Document): ROMAST.Newline {
  return newline()
}

function transformEmptyline(node: OAST.Emptyline, root: OAST.Document): undefined {
  return undefined
}

function transformText(node: OAST.Text, root: OAST.Document) {
  switch (node.style) {
    case undefined: return text(node.value)
    case 'bold': return bold(node.value)
    case 'verbatim': return verbatim(node.value)
    case 'italic': return italic(node.value)
    case 'strikeThrough': return strikethrough(node.value)
    case 'underline': return underlined(node.value)
    case 'code': return code(node.value)
    default: throw new UnknownNodeError()
  }
}

function transformLink(node: OAST.Link, root: OAST.Document): ROMAST.Link {
  return {
    type: 'link'
  , protocol: node.path.protocol
  , url: node.path.value
  , children: map(node.children, x => transformLinkContent(x, root))
  }
}

function transformLinkContent(node: OAST.LinkContent, root: OAST.Document) {
  if (OAST_IS.isOpening(node)) return transformOpening(node, root)
  if (OAST_IS.isClosing(node)) return transformClosing(node, root)
  if (OAST_IS.isLinkPath(node)) return transformLinkPath(node, root)
  if (OAST_IS.isUniversalInlineContent(node)) return transformUniversalInlineContent(node, root)
  throw new UnknownNodeError()
}

function transformLinkPath(node: OAST.LinkPath, root: OAST.Document): undefined {
  return undefined
}

function transformFootnoteReference(
  node: OAST.FootnoteReference
, root: OAST.Document
): ROMAST.Footnote | ROMAST.InlineFootnote {
  if (node.label) {
    const footnote = findFootnote(root, node.label)
    return {
      type: 'footnote'
    , children: map(
        footnote?.children ?? []
      , x => transformFootnoteContent(x, root)
      )
    }
  } else {
    return {
      type: 'inlineFootnote'
    , children: map(node.children, x => transformFootnoteReferenceContent(x, root))
    }
  }
}

function transformFootnoteContent(
  node: OAST.FootnoteContent
, root: OAST.Document
) {
  if (OAST_IS.isFootnoteLabel(node)) return transformFootnoteLabel(node, root)
  if (OAST_IS.isUniversalBlockContent(node)) return transformUniversalBlockContent(node, root)
  throw new UnknownNodeError()
}

function transformOpening(node: OAST.Opening, root: OAST.Document): undefined {
  return undefined
}

function transformClosing(node: OAST.Closing, root: OAST.Document): undefined {
  return undefined
}

function transformFootnoteReferenceContent(
  node: OAST.FootnoteReferenceContent
, root: OAST.Document
) {
  if (OAST_IS.isFootnoteLabel(node)) return transformFootnoteLabel(node, root)
  if (OAST_IS.isOpening(node)) return transformOpening(node, root)
  if (OAST_IS.isClosing(node)) return transformClosing(node, root)
  if (OAST_IS.isUniversalInlineContent(node)) return transformUniversalInlineContent(node, root)
}

function transformFootnoteLabel(
  node: OAST.FootnoteLabel
, root: OAST.Document
): undefined {
  return undefined
}

function transformStars(node: OAST.Stars, root: OAST.Document): undefined {
  return undefined
}

function transformTodo(node: OAST.Todo, root: OAST.Document): undefined {
  return undefined
}

function transformPriority(node: OAST.Priority, root: OAST.Document): undefined {
  return undefined
}

function transformTags(node: OAST.Tags, root: OAST.Document): undefined {
  return undefined
}

function transformListItemCheckbox(
  node: OAST.ListItemCheckbox
, root: OAST.Document
): undefined {
  return undefined
}

function transformListItemBullet(
  node: OAST.ListItemBullet
, root: OAST.Document
): undefined {
  return undefined
}

function transformListItemTag(
  node: OAST.ListItemTag
, root: OAST.Document
): undefined {
  return undefined
}

function map<T, V>(arr: T[], fn: (x: T) => V | undefined): V[] {
  return arr
    .map(x => fn(x))
    .filter(isntUndefined)
}
