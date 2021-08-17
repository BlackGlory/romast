import * as ROMAST from '@src/romast'

function is<T extends ROMAST.Node>(node: ROMAST.Node, type: string): node is T {
  return node.type === type
}

export function isParent(node: ROMAST.Node): node is ROMAST.Node & ROMAST.Parent {
  return 'children' in node
}

export function isBlockNode(node: ROMAST.Node): node is ROMAST.BlockNode {
  return isDocument(node)
      || isSection(node)
      || isHeadline(node)
      || isParagraph(node)
      || isExample(node)
      || isSource(node)
      || isQuote(node)
      || isList(node)
      || isListItem(node)
      || isTable(node)
      || isTableRowGroup(node)
      || isTableRow(node)
      || isTableCell(node)
      || isHorizontalRule(node)
      || isDrawer(node)
}

export function isInlineNode(node: ROMAST.Node): node is ROMAST.InlineNode {
  return isFootnote(node)
      || isInlineFootnote(node)
      || isLink(node)
      || isText(node)
      || isBold(node)
      || isVerbatim(node)
      || isItalic(node)
      || isStrikethrough(node)
      || isUnderlined(node)
      || isCode(node)
}

export function isDocumentContent(node: ROMAST.Node): node is ROMAST.DocumentContent {
  return isUniversalBlockContent(node)
      || isSection(node)
}

export function isSectionContent(node: ROMAST.Node): node is ROMAST.SectionContent {
  return isUniversalBlockContent(node)
      || isSection(node)
}

export function isListContent(node: ROMAST.Node): node is ROMAST.ListContent {
  return isList(node)
      || isListItem(node)
}

export function isUniversalBlockContent(
  node: ROMAST.Node
): node is ROMAST.UniversalBlockContent {
  return isParagraph(node)
      || isExample(node)
      || isSource(node)
      || isQuote(node)
      || isDrawer(node)
      || isList(node)
      || isTable(node)
      || isHorizontalRule(node)
}

export function isUniversalInlineContent(
  node: ROMAST.Node
): node is ROMAST.UniversalInlineContent {
  return isLink(node)
      || isText(node)
      || isBold(node)
      || isVerbatim(node)
      || isItalic(node)
      || isStrikethrough(node)
      || isUnderlined(node)
      || isCode(node)
      || isFootnote(node)
      || isInlineFootnote(node)
}

export function isDocument(node: ROMAST.Node): node is ROMAST.Document {
  return is(node, 'document')
}

export function isSection(node: ROMAST.Node): node is ROMAST.Section {
  return is(node, 'section')
}

export function isHeadline(node: ROMAST.Node): node is ROMAST.Headline {
  return is(node, 'headline')
}

export function isParagraph(node: ROMAST.Node): node is ROMAST.Paragraph {
  return is(node, 'paragraph')
}

export function isExample(node: ROMAST.Node): node is ROMAST.Example {
  return is(node, 'example')
}

export function isSource(node: ROMAST.Node): node is ROMAST.Source {
  return is(node, 'source')
}

export function isQuote(node: ROMAST.Node): node is ROMAST.Quote {
  return is(node, 'quote')
}

export function isList(node: ROMAST.Node): node is ROMAST.List {
  return is(node, 'list')
}

export function isListItem(node: ROMAST.Node): node is ROMAST.ListItem {
  return is(node, 'listItem')
}

export function isTable(node: ROMAST.Node): node is ROMAST.Table {
  return is(node, 'table')
}

export function isTableRowGroup(node: ROMAST.Node): node is ROMAST.TableRowGroup {
  return is(node, 'tableRowGroup')
}

export function isTableRow(node: ROMAST.Node): node is ROMAST.TableRow {
  return is(node, 'tableRow')
}

export function isTableCell(
  node: ROMAST.Node
): node is ROMAST.TableCell {
  return is(node, 'tableCell')
}

export function isHorizontalRule(node: ROMAST.Node): node is ROMAST.HorizontalRule {
  return is(node, 'tableHorizontalRule')
}

export function isFootnote(node: ROMAST.Node): node is ROMAST.Footnote {
  return is(node, 'footnote')
}

export function isInlineFootnote(node: ROMAST.Node): node is ROMAST.InlineFootnote {
  return is(node, 'inlineFootnote')
}

export function isDrawer(node: ROMAST.Node): node is ROMAST.Drawer {
  return is(node, 'drawer')
}

export function isLink(node: ROMAST.Node): node is ROMAST.Link {
  return is(node, 'link')
}

export function isText(node: ROMAST.Node): node is ROMAST.Text {
  return is(node, 'text')
}

export function isBold(node: ROMAST.Node): node is ROMAST.Bold {
  return is(node, 'bold')
}

export function isVerbatim(node: ROMAST.Node): node is ROMAST.Verbatim {
  return is(node, 'verbatim')
}

export function isItalic(node: ROMAST.Node): node is ROMAST.Italic {
  return is(node, 'italic')
}

export function isStrikethrough(node: ROMAST.Node): node is ROMAST.Strikethrough {
  return is(node, 'strikethrough')
}

export function isUnderlined(node: ROMAST.Node): node is ROMAST.Underlined {
  return is(node, 'underlined')
}

export function isCode(node: ROMAST.Node): node is ROMAST.Code {
  return is(node, 'code')
}
