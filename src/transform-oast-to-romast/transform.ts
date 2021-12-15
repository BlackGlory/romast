import * as OAST from '@src/oast-3.2'
import * as ROMAST from '@src/romast'
import * as OAST_IS from '@oast-utils/is'
import * as Builder from '@romast-utils/builder'
import { CustomError, assert } from '@blackglory/errors'
import { isntUndefined } from '@blackglory/types'
import { findFootnote } from './find-footnote'

export class UnknownNodeError extends CustomError {
  constructor(node: OAST.Node) {
    super(JSON.stringify(node, null, 2))
  }
}

export function transformDocument(
  root: OAST.Document
, strict: boolean
): ROMAST.Document {
  return Builder.document(
    map(root.children, x => transformDocumentContent(x, root, strict))
  )
}

function transformDocumentContent(
  node: OAST.DocumentContent
, root: OAST.Document
, strict: boolean
) {
  if (OAST_IS.isUniversalBlockContent(node)) return transformUniversalBlockContent(node, root, strict)
  if (OAST_IS.isSection(node)) return transformSection(node, root, strict)
  if (OAST_IS.isFootnote(node)) return transformFootnote(node, root, strict)
  if (OAST_IS.isNewline(node)) return transformNewline(node, root, strict)
  if (OAST_IS.isEmptyLine(node)) return transformEmptyline(node, root, strict)
  if (strict) throw new UnknownNodeError(node)
}

function transformSectionContent(
  node: OAST.SectionContent
, root: OAST.Document
, strict: boolean
) {
  if (OAST_IS.isUniversalBlockContent(node)) return transformUniversalBlockContent(node, root, strict)
  if (OAST_IS.isSection(node)) return transformSection(node, root, strict)
  if (OAST_IS.isHeadline(node)) return undefined
  if (OAST_IS.isPlanning(node)) return transformPlanning(node, root, strict)
  if (OAST_IS.isNewline(node)) return undefined
  if (OAST_IS.isEmptyLine(node)) return transformEmptyline(node, root, strict)
  if (strict) throw new UnknownNodeError(node)
}

function transformTableContents(
  nodes: OAST.TableContent[]
, root: OAST.Document
, strict: boolean
) {
  const results: ROMAST.TableRowGroup[] = []

  let rowGroup: ROMAST.TableRowGroup = Builder.tableRowGroup([])
  for (const node of nodes) {
    if (OAST_IS.isTableRow(node)) {
      rowGroup.children.push(transformTableRow(node, root, strict))
    } else if (OAST_IS.isTableRule(node)) {
      results.push(rowGroup)
      rowGroup = Builder.tableRowGroup([])
    } else {
      if (strict) throw new UnknownNodeError(node)
    }
  }
  if (rowGroup.children.length > 0) {
    results.push(rowGroup)
  }

  return results
}

function transformTableRowContent(
  node: OAST.TableRowContent
, root: OAST.Document
, strict: boolean
) {
  if (OAST_IS.isTableCell(node)) return transformTableCell(node, root, strict)
  if (OAST_IS.isTableColumnSeparator(node)) return transformTableColumnSeparator(node, root, strict)
  if (strict) throw new UnknownNodeError(node)
}

function transformTableColumnSeparator(
  node: OAST.TableColumnSeparator
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformHeadlineContent(
  node: OAST.HeadlineContent
, root: OAST.Document
, strict: boolean
) {
  if (OAST_IS.isStars(node)) return transformStars(node, root, strict)
  if (OAST_IS.isTodo(node)) return transformTodo(node, root, strict)
  if (OAST_IS.isPriority(node)) return transformPriority(node, root, strict)
  if (OAST_IS.isTags(node)) return transformTags(node, root, strict)
  if (OAST_IS.isUniversalInlineContent(node)) return transformUniversalInlineContent(node, root, strict)
  if (strict) throw new UnknownNodeError(node)
}

function transformListContent(
  node: OAST.ListContent
, root: OAST.Document
, strict: boolean
) {
  if (OAST_IS.isList(node)) return transformList(node, root, strict)
  if (OAST_IS.isListItem(node)) return transformListItem(node, root, strict)
  if (OAST_IS.isNewline(node)) return undefined
  if (strict) throw new UnknownNodeError(node)
}

function transformListItemContent(
  node: OAST.ListItemContent
, root: OAST.Document
, strict: boolean
) {
  if (OAST_IS.isListItemBullet(node)) return transformListItemBullet(node, root, strict)
  if (OAST_IS.isListItemTag(node)) return transformListItemTag(node, root, strict)
  if (OAST_IS.isListItemCheckbox(node)) return transformListItemCheckbox(node, root, strict)
  if (OAST_IS.isUniversalInlineContent(node)) return transformUniversalInlineContent(node, root, strict)
  if (strict) throw new UnknownNodeError(node)
}

function transformUniversalBlockContent(
  node: OAST.UniversalBlockContent
, root: OAST.Document
, strict: boolean
) {
  if (OAST_IS.isParagraph(node)) return transformParagraph(node, root, strict)
  if (OAST_IS.isBlock(node)) return transformBlock(node, root, strict)
  if (OAST_IS.isDrawer(node)) return transformDrawer(node, root, strict)
  if (OAST_IS.isList(node)) return transformList(node, root, strict)
  if (OAST_IS.isTable(node)) return transformTable(node, root, strict)
  if (OAST_IS.isHorizontalRule(node)) return transformHorizontalRule(node, root, strict)
  if (strict) throw new UnknownNodeError(node)
}

function transformUniversalInlineContent(
  node: OAST.UniversalInlineContent
, root: OAST.Document
, strict: boolean
): ROMAST.UniversalInlineContent | undefined {
  if (OAST_IS.isText(node)) return transformText(node, root, strict)
  if (OAST_IS.isLink(node)) return transformLink(node, root, strict)
  if (OAST_IS.isFootnoteReference(node)) return transformFootnoteReference(node, root, strict)
  if (OAST_IS.isNewline(node)) return transformNewline(node, root, strict)
  if (OAST_IS.isEmptyLine(node)) return transformEmptyline(node, root, strict)
  if (strict) throw new UnknownNodeError(node)
}

function transformSection(
  node: OAST.Section
, root: OAST.Document
, strict: boolean
): ROMAST.Section {
  const [headline, ...children] = node.children
  assert(OAST_IS.isHeadline(headline), 'The first element of children should be a headline')

  return Builder.section(
    node.level
  , transformHeadline(headline, root, strict)
  , map(children, x => transformSectionContent(x, root, strict))
  )
}

function transformHeadline(
  node: OAST.Headline
, root: OAST.Document
, strict: boolean
): ROMAST.Headline {
  return Builder.headline(
    node.tags ?? []
  , map(node.children, x => transformHeadlineContent(x, root, strict))
  )
}

function transformFootnote(
  node: OAST.Footnote
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformBlock(
  node: OAST.Block
, root: OAST.Document
, strict: boolean
): ROMAST.Example | ROMAST.Source | ROMAST.Example | ROMAST.Quote | undefined {
  switch (node.name.toLowerCase()) {
    case 'quote': return Builder.quote(node.value)
    case 'src': return Builder.source(node.params, node.value)
    case 'example': return Builder.example(node.params, node.value)
    default: return undefined
  }
}

function transformDrawer(
  node: OAST.Drawer
, root: OAST.Document
, strict: boolean
): ROMAST.Drawer {
  return Builder.drawer(
    node.name
  , map(node.children, x => transformDrawerContent(x, root, strict))
  )
}

function transformDrawerContent(
  node: OAST.DrawerContent
, root: OAST.Document
, strict: boolean
) {
  if (OAST_IS.isDrawerBegin(node)) return transformDrawerBegin(node, root, strict)
  if (OAST_IS.isDrawerEnd(node)) return transformDrawerEnd(node, root, strict)
  if (OAST_IS.isUniversalInlineContent(node)) return transformUniversalInlineContent(node, root, strict)
  if (strict) throw new UnknownNodeError(node)
}

function transformDrawerBegin(
  node: OAST.DrawerBegin
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformDrawerEnd(
  node: OAST.DrawerEnd
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformPlanning(
  node: OAST.Planning
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformList(
  node: OAST.List
, root: OAST.Document
, strict: boolean
): ROMAST.List {
  return Builder.list(
    node.indent
  , node.ordered
  , map(node.children, x => transformListContent(x, root, strict))
  )
}

function transformTable(
  node: OAST.Table
, root: OAST.Document
, strict: boolean
): ROMAST.Table {
  const tableContents = transformTableContents(node.children, root, strict)
  if (tableContents.length <= 1) {
    return Builder.table(null, tableContents)
  } else {
    const [header, ...children] = tableContents
    return Builder.table(header, children)
  }
}

function transformTableRow(
  node: OAST.TableRow
, root: OAST.Document
, strict: boolean
): ROMAST.TableRow {
  return Builder.tableRow(
    map(node.children, x => transformTableRowContent(x, root, strict))
  )
}

function transformTableCell(
  node: OAST.TableCell
, root: OAST.Document
, strict: boolean
): ROMAST.TableCell {
  return Builder.tableCell(
    map(node.children, x => transformUniversalInlineContent(x, root, strict))
  )
}

function transformListItem(
  node: OAST.ListItem
, root: OAST.Document
, strict: boolean
): ROMAST.ListItem {
  const checkbox = node.children.find(OAST_IS.isListItemCheckbox)
  const checked = checkbox ? checkbox.checked : null
  return Builder.listItem(
    node.indent
  , map(node.children, x => transformListItemContent(x, root, strict))
  , {
      checked
    , term: node.tag ?? null
    }
  )
}

function transformParagraph(
  node: OAST.Paragraph
, root: OAST.Document
, strict: boolean
): ROMAST.Paragraph {
  return Builder.paragraph(
    map(node.children, x => transformUniversalInlineContent(x, root, strict))
  )
}

function transformHorizontalRule(
  node: OAST.HorizontalRule
, root: OAST.Document
, strict: boolean
): ROMAST.HorizontalRule {
  return Builder.horizontalRule()
}

function transformNewline(
  node: OAST.Newline
, root: OAST.Document
, strict: boolean
): ROMAST.Newline {
  return Builder.newline()
}

function transformEmptyline(
  node: OAST.EmptyLine
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformText(node: OAST.Text, root: OAST.Document, strict: boolean) {
  switch (node.style) {
    case undefined: return Builder.text(node.value)
    case 'bold': return Builder.bold(node.value)
    case 'verbatim': return Builder.verbatim(node.value)
    case 'italic': return Builder.italic(node.value)
    case 'strikeThrough': return Builder.strikethrough(node.value)
    case 'underline': return Builder.underlined(node.value)
    case 'code': return Builder.code(node.value)
    default: throw new UnknownNodeError(node)
  }
}

function transformLink(
  node: OAST.Link
, root: OAST.Document
, strict: boolean
): ROMAST.Link {
  return Builder.link(
    node.path.protocol
  , node.path.value
  , map(node.children, x => transformLinkContent(x, root, strict))
  )
}

function transformLinkContent(
  node: OAST.LinkContent
, root: OAST.Document
, strict: boolean
) {
  if (OAST_IS.isOpening(node)) return transformOpening(node, root, strict)
  if (OAST_IS.isClosing(node)) return transformClosing(node, root, strict)
  if (OAST_IS.isLinkPath(node)) return transformLinkPath(node, root, strict)
  if (OAST_IS.isUniversalInlineContent(node)) return transformUniversalInlineContent(node, root, strict)
  if (strict) throw new UnknownNodeError(node)
}

function transformLinkPath(
  node: OAST.LinkPath
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformFootnoteReference(
  node: OAST.FootnoteReference
, root: OAST.Document
, strict: boolean
): ROMAST.Footnote | ROMAST.InlineFootnote {
  if (node.label) {
    const footnote = findFootnote(root, node.label)
    return Builder.footnote(
      map(
        footnote?.children ?? []
      , x => transformFootnoteContent(x, root, strict)
      )
    )
  } else {
    return Builder.inlineFootnote(
      map(
        node.children
      , x => transformFootnoteReferenceContent(x, root, strict)
      )
    )
  }
}

function transformFootnoteContent(
  node: OAST.FootnoteContent
, root: OAST.Document
, strict: boolean
) {
  if (OAST_IS.isFootnoteLabel(node)) return transformFootnoteLabel(node, root, strict)
  if (OAST_IS.isUniversalBlockContent(node)) return transformUniversalBlockContent(node, root, strict)
  if (OAST_IS.isNewline(node)) return undefined
  if (strict) throw new UnknownNodeError(node)
}

function transformOpening(
  node: OAST.Opening
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformClosing(
  node: OAST.Closing
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformFootnoteReferenceContent(
  node: OAST.FootnoteReferenceContent
, root: OAST.Document
, strict: boolean
) {
  if (OAST_IS.isFootnoteLabel(node)) return transformFootnoteLabel(node, root, strict)
  if (OAST_IS.isOpening(node)) return transformOpening(node, root, strict)
  if (OAST_IS.isClosing(node)) return transformClosing(node, root, strict)
  if (OAST_IS.isUniversalInlineContent(node)) return transformUniversalInlineContent(node, root, strict)
  if (strict) throw new UnknownNodeError(node)
}

function transformFootnoteLabel(
  node: OAST.FootnoteLabel
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformStars(
  node: OAST.Stars
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformTodo(
  node: OAST.Todo
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformPriority(
  node: OAST.Priority
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformTags(
  node: OAST.Tags
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformListItemCheckbox(
  node: OAST.ListItemCheckbox
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformListItemBullet(
  node: OAST.ListItemBullet
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function transformListItemTag(
  node: OAST.ListItemTag
, root: OAST.Document
, strict: boolean
): undefined {
  return undefined
}

function map<T, V>(arr: T[], fn: (x: T) => V | undefined): V[] {
  return arr
    .map(x => fn(x))
    .filter(isntUndefined)
}
