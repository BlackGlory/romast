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
  , children: map(root.children, x => transformTopLevelContent(x, root))
  }
}

function transformTopLevelContent(node: OAST.TopLevelContent, root: OAST.Document) {
  if (OAST_IS.isContent(node)) return transformContent(node, root)
  if (OAST_IS.isKeyword(node)) return transformKeyword(node, root)
  if (OAST_IS.isFootnote(node)) return transformFootnote(node, root)
  throw new UnknownNodeError()
}

function transformContent(node: OAST.Content, root: OAST.Document) {
  if (OAST_IS.isSection(node)) return transformSection(node, root)
  if (OAST_IS.isParagraph(node)) return transformParagraph(node, root)
  if (OAST_IS.isBlock(node)) return transformBlock(node, root)
  if (OAST_IS.isDrawer(node)) return transformDrawer(node, root)
  if (OAST_IS.isPlanning(node)) return transformPlanning(node, root)
  if (OAST_IS.isList(node)) return transformList(node, root)
  if (OAST_IS.isTable(node)) return transformTable(node, root)
  if (OAST_IS.isHorizontalRule(node)) return transformHorizontalRule(node, root)
  if (OAST_IS.isHeadline(node)) return undefined
  if (OAST_IS.isHTML(node)) return transformHTML(node, root)
  throw new UnknownNodeError()
}

function transformSection(node: OAST.Section, root: OAST.Document): ROMAST.Section {
  const [headline, ...children] = node.children
  assert(OAST_IS.isHeadline(headline), 'The first element of children should be a headline')

  return {
    type: 'section'
  , level: node.level
  , headline: transformHeadline(headline, root)
  , children: map(children, x => transformContent(x, root))
  }
}

function transformHeadline(
  node: OAST.Headline
, root: OAST.Document
): ROMAST.Headline {
  return {
    type: 'headline'
  , level: node.level
  , children: map(node.children, x => {
      if (OAST_IS.isToken(x)) return transformToken(x, root)
      if (OAST_IS.isPhrasingContent(x)) return transformPhrasingContent(x, root)
      throw new UnknownNodeError()
    })
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

function transformTableContent(
  node: OAST.TableContent
, root: OAST.Document
): ROMAST.TableContent {
  if (OAST_IS.isTableRow(node)) return transformTableRow(node, root)
  if (OAST_IS.isTableRule(node)) return transformTableRule(node, root)
  throw new UnknownNodeError()
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
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformListItem(
  node: OAST.ListItem
, root: OAST.Document
): ROMAST.ListItem {
  return {
    type: 'listItem'
  , indent: node.indent
  , term: node.tag ?? null
  , children: map(node.children, x => {
      if (OAST_IS.isListItemBullet(x)) return transformListItemBullet(x, root)
      if (OAST_IS.isPhrasingContent(x)) return transformPhrasingContent(x, root)
      throw new UnknownNodeError()
    })
  }
}

function transformParagraph(
  node: OAST.Paragraph
, root: OAST.Document
): ROMAST.Paragraph {
  return {
    type: 'paragraph'
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformHTML(node: OAST.HTML, root: OAST.Document): undefined {
  return undefined
}

function transformToken(node: OAST.Token, root: OAST.Document) {
  if (OAST_IS.isKeyword(node)) return transformKeyword(node, root)
  if (OAST_IS.isTodo(node)) return transformTodo(node, root)
  if (OAST_IS.isNewline(node)) return transformNewline(node, root)
  if (OAST_IS.isStars(node)) return transformStars(node, root)
  if (OAST_IS.isPriority(node)) return transformPriority(node, root)
  if (OAST_IS.isTags(node)) return transformTags(node, root)
  if (OAST_IS.isPlanningKeyword(node)) return transformPlanningKeyword(node, root)
  if (OAST_IS.isPlanningTimestamp(node)) return transformPlanningTimestamp(node, root)
  if (OAST_IS.isTableColumnSeparator(node)) return transformTableColumnSeparator(node, root)
  if (OAST_IS.isPhrasingContent(node)) return transformPhrasingContent(node, root)
  if (OAST_IS.isFootnoteLabel(node)) return transformFootnoteLabel(node, root)
  if (OAST_IS.isFootnoteInlineBegin(node)) return transformFootnoteInlineBegin(node, root)
  if (OAST_IS.isFootnoteReferenceEnd(node)) return transformFootnoteReferenceEnd(node, root)
  if (OAST_IS.isBlockBegin(node)) return transformBlockBegin(node, root)
  if (OAST_IS.isBlockEnd(node)) return transformBlockEnd(node, root)
  if (OAST_IS.isDrawerBegin(node)) return transformDrawerBegin(node, root)
  if (OAST_IS.isDrawerEnd(node)) return transformDrawerEnd(node, root)
  if (OAST_IS.isComment(node)) return transformComment(node, root)
  throw new UnknownNodeError()
}

function transformPhrasingContent(
  node: OAST.PhrasingContent
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
): ROMAST.Footnote {
  if (node.label.trim() === '') {
    // no label, so it must has children

    return {
      type: 'footnote'
    , children: map(node.children, x => transformPhrasingContent(x, root))
    }
  } else {
    if (node.children.length === 0) {
      // has label, no children, it is the most common type

      const footnote = findFootnote(root, node.label)
      return {
        type: 'footnote'
      , children: map(footnote?.children ?? [], x => transformContent(x, root))
      }
    } else {
      // has label, but also has children, concat them

      const footnote = findFootnote(root, node.label)
      return {
        type: 'footnote'
      , children: [
          ...map(node.children, x => transformPhrasingContent(x, root))
        , ...map(footnote?.children ?? [], x => transformContent(x, root))
        ]
      }
    }
  }
}

function transformFootnoteInlineBegin(
  node: OAST.FootnoteInlineBegin
, root: OAST.Document
): undefined {
  return undefined
}

function transformFootnoteReferenceEnd(
  node: OAST.FootnoteReferenceEnd
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

function transformBlockBegin(node: OAST.BlockBegin, root: OAST.Document): undefined {
  return undefined
}

function transformBlockEnd(node: OAST.BlockEnd, root: OAST.Document): undefined {
  return undefined
}

function transformDrawerBegin(node: OAST.DrawerBegin, root: OAST.Document): undefined {
  return undefined
}

function transformDrawerEnd(node: OAST.DrawerEnd, root: OAST.Document): undefined {
  return undefined
}

function transformComment(node: OAST.Comment, root: OAST.Document): undefined {
  return undefined
}

function transformKeyword(node: OAST.Keyword, root: OAST.Document): undefined {
  return undefined
}

function transformFootnoteLabel(node: OAST.FootnoteLabel, root: OAST.Document): undefined {
  return undefined
}

function transformPlanningKeyword(
  node: OAST.PlanningKeyword
, root: OAST.Document
): undefined {
  return undefined
}

function transformPlanningTimestamp(
  node: OAST.PlanningTimestamp
, root: OAST.Document
): undefined {
  return undefined
}

function transformListItemCheckbox(
  node: OAST.ListItemCheckbox
, root: OAST.Document
): undefined {
  return undefined
}

function transformListItemBullet(node: OAST.ListItemBullet, root: OAST.Document): undefined {
  return undefined
}

function transformTableRule(
  node: OAST.TableRule
, root: OAST.Document
): ROMAST.TableHorizontalRule {
  return { type: 'tableHorizontalRule' }
}

function transformTableColumnSeparator(
  node: OAST.TableColumnSeparator
, root: OAST.Document
): undefined {
  return undefined
}

function map<T, V>(arr: T[], fn: (x: T) => V | undefined): V[] {
  return arr
    .map(x => fn(x))
    .filter(isntUndefined)
}
