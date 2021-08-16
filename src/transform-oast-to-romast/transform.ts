import * as OAST from '@src/oast-utils/oast-2.4'
import * as ROMAST from '@src/romast-utils/romast-1.0'
import * as OAST_IS from '@src/oast-utils/is'
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
} from '@src/romast-utils/builder'
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
  throw new UnknownNodeError()
}

function transformSectionContent(node: OAST.SectionContent, root: OAST.Document) {
  if (OAST_IS.isUniversalBlockContent(node)) return transformUniversalBlockContent(node, root)
  if (OAST_IS.isSection(node)) return transformSection(node, root)
  if (OAST_IS.isHeadline(node)) return undefined
  throw new UnknownNodeError()
}

function transformTableContent(
  node: OAST.TableContent
, root: OAST.Document
): ROMAST.TableContent {
  if (OAST_IS.isTableRow(node)) return transformTableRow(node, root)
  if (OAST_IS.isTableRule(node)) return transformTableRule(node, root)
  throw new UnknownNodeError()
}

function transformHeadlineContent(node: OAST.HeadlineContent, root: OAST.Document) {
  if (OAST_IS.isStars(node)) return transformStars(node, root)
  if (OAST_IS.isTodo(node)) return transformTodo(node, root)
  if (OAST_IS.isPriority(node)) return transformPriority(node, root)
  if (OAST_IS.isTags(node)) return transformTags(node, root)
  if (OAST_IS.isUniversalInlineContent(node)) return transformUniversalInlineContent(node, root)
  throw new UnknownNodeError()
}

function transformListItemContent(node: OAST.ListItemContent, root: OAST.Document) {
  if (OAST_IS.isListItemBullet(node)) return transformListItemBullet(node, root)
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
  if (OAST_IS.isPlanning(node)) return transformPlanning(node, root)
  if (OAST_IS.isList(node)) return transformList(node, root)
  if (OAST_IS.isTable(node)) return transformTable(node, root)
  if (OAST_IS.isHorizontalRule(node)) return transformHorizontalRule(node, root)
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
  , level: node.level
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
  , value: node.value
  }
}

function transformPlanning(node: OAST.Planning, root: OAST.Document): undefined {
  return undefined
}

function transformList(node: OAST.List, root: OAST.Document): ROMAST.List {
  return {
    type: 'list'
  , indent: node.indent
  , ordered: node.ordered
  , children: map(node.children, x => {
      if (OAST_IS.isList(x)) return transformList(x, root)
      if (OAST_IS.isListItem(x)) return transformListItem(x, root)
      throw new UnknownNodeError()
    })
  }
}

function transformTable(node: OAST.Table, root: OAST.Document): ROMAST.Table {
  return {
    type: 'table'
  , children: map(node.children, x => transformTableContent(x, root))
  }
}

function transformTableRow(
  node: OAST.TableRow
, root: OAST.Document
): ROMAST.TableRow {
  return {
    type: 'tableRow'
  , children: map(node.children, x => transformTableCell(x, root))
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

function transformUniversalInlineContent(
  node: OAST.UniversalInlineContent
, root: OAST.Document
): ROMAST.UniversalInlineContent | undefined {
  if (OAST_IS.isStyledText(node)) return transformStyledText(node, root)
  if (OAST_IS.isLink(node)) return transformLink(node, root)
  if (OAST_IS.isFootnoteReference(node)) return transformFootnoteReference(node, root)
  if (OAST_IS.isNewline(node)) return transformNewline(node, root)
  throw new UnknownNodeError()
}

function transformHorizontalRule(
  node: OAST.HorizontalRule
, root: OAST.Document
): ROMAST.HorizontalRule {
  return { type: 'horizontalRule' }
}

function transformNewline(node: OAST.Newline, root: OAST.Document): undefined {
  return undefined
}

function transformStyledText(node: OAST.StyledText, root: OAST.Document) {
  switch (node.type) {
    case 'text.plain': return text(node.value)
    case 'text.bold': return bold(node.value)
    case 'text.verbatim': return verbatim(node.value)
    case 'text.italic': return italic(node.value)
    case 'text.strikeThrough': return strikethrough(node.value)
    case 'text.underline': return underlined(node.value)
    case 'text.code': return code(node.value)
    default: throw new UnknownNodeError()
  }
}

function transformLink(node: OAST.Link, root: OAST.Document): ROMAST.Link {
  return {
    type: 'link'
  , description: node.description ?? null
  , protocol: node.protocol
  , value: node.value
  , search: node.search ?? null
  }
}

function transformFootnoteReference(
  node: OAST.FootnoteReference
, root: OAST.Document
): ROMAST.Footnote | ROMAST.InlineFootnote {
  if (node.children.length === 0) {
    const footnote = findFootnote(root, node.label)
    return {
      type: 'footnote'
    , children: map(
        footnote?.children ?? []
      , x => transformUniversalBlockContent(x, root)
      )
    }
  } else {
    return {
      type: 'inlineFootnote'
    , children: map(node.children, x => transformUniversalInlineContent(x, root))
    }
  }
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

function transformTableRule(
  node: OAST.TableRule
, root: OAST.Document
): ROMAST.TableHorizontalRule {
  return { type: 'tableHorizontalRule' }
}

function map<T, V>(arr: T[], fn: (x: T) => V | undefined): V[] {
  return arr
    .map(x => fn(x))
    .filter(isntUndefined)
}
