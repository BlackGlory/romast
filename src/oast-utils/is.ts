import * as OAST from '@src/oast-2.4'

function is<T extends OAST.Node>(node: OAST.Node, type: string): node is T {
  return node.type === type
}

export function isParent(node: OAST.Node): node is OAST.Parent {
  return 'children' in node
}

export function isDocumentContent(node: OAST.Node): node is OAST.DocumentContent {
  return isUniversalBlockContent(node)
      || isSection(node)
      || isFootnote(node)
}

export function isSectionContent(node: OAST.Node): node is OAST.SectionContent {
  return isUniversalBlockContent(node)
      || isSection(node)
      || isHeadline(node)
      || isPlanning(node)
}

export function isTableContent(node: OAST.Node): node is OAST.TableContent {
  return isTableRow(node)
      || isTableRule(node)
}

export function isHeadlineContent(node: OAST.Node): node is OAST.HeadlineContent {
  return isStars(node)
      || isTodo(node)
      || isPriority(node)
      || isTags(node)
      || isUniversalInlineContent(node)
}

export function isListContent(node: OAST.Node): node is OAST.ListContent {
  return isList(node)
      || isListItem(node)
}

export function isListItemContent(
  node: OAST.ListItemContent
): node is OAST.ListItemContent {
  return isListItemBullet(node)
      || isListItemCheckbox(node)
      || isUniversalInlineContent(node)
}

export function isUniversalInlineContent(
  node: OAST.Node
): node is OAST.UniversalInlineContent {
  return isStyledText(node)
      || isLink(node)
      || isFootnoteReference(node)
      || isNewline(node)
}

export function isUniversalBlockContent(
  node: OAST.Node
): node is OAST.UniversalBlockContent {
  return isParagraph(node)
      || isBlock(node)
      || isDrawer(node)
      || isList(node)
      || isTable(node)
      || isHorizontalRule(node)
}

export function isDocument(node: OAST.Node): node is OAST.Document {
  return is(node, 'document')
}

export function isSection(node: OAST.Node): node is OAST.Section {
  return is(node, 'section')
}

export function isFootnote(node: OAST.Node): node is OAST.Footnote {
  return is(node, 'footnote')
}

export function isBlock(node: OAST.Node): node is OAST.Block {
  return is(node, 'block')
}

export function isDrawer(node: OAST.Node): node is OAST.Drawer {
  return is(node, 'drawer')
}

export function isPlanning(node: OAST.Node): node is OAST.Planning {
  return is(node, 'planning')
}

export function isList(node: OAST.Node): node is OAST.List {
  return is(node, 'list')
}

export function isTable(node: OAST.Node): node is OAST.Table {
  return is(node, 'table')
}

export function isTableRow(node: OAST.Node): node is OAST.TableRow {
  return is(node, 'table.row')
}

export function isTableCell(node: OAST.Node): node is OAST.TableCell {
  return is(node, 'table.cell')
}

export function isListItem(node: OAST.Node): node is OAST.ListItem {
  return is(node, 'list.item')
}

export function isHeadline(node: OAST.Node): node is OAST.Headline {
  return is(node, 'headline')
}

export function isParagraph(node: OAST.Node): node is OAST.Paragraph {
  return is(node, 'paragraph')
}

export function isHorizontalRule(node: OAST.Node): node is OAST.HorizontalRule {
  return is(node, 'hr')
}

export function isNewline(node: OAST.Node): node is OAST.Newline {
  return is(node, 'newline')
}

export function isStyledText(node: OAST.Node): node is OAST.StyledText {
  return is(node, 'text.plain')
      || is(node, 'text.bold')
      || is(node, 'text.verbatim')
      || is(node, 'text.italic')
      || is(node, 'text.strikeThrough')
      || is(node, 'text.underline')
      || is(node, 'text.code')
}

export function isLink(node: OAST.Node): node is OAST.Link {
  return is(node, 'link')
}

export function isFootnoteReference(node: OAST.Node): node is OAST.FootnoteReference {
  return is(node, 'footnote.reference')
}

export function isStars(node: OAST.Node): node is OAST.Stars {
  return is(node, 'stars')
}

export function isTodo(node: OAST.Node): node is OAST.Todo {
  return is(node, 'todo')
}

export function isPriority(node: OAST.Node): node is OAST.Priority {
  return is(node, 'priority')
}

export function isTags(node: OAST.Node): node is OAST.Tags {
  return is(node, 'tags')
}

export function isListItemCheckbox(node: OAST.Node): node is OAST.ListItemCheckbox {
  return is(node, 'list.item.checkbox')
}

export function isListItemBullet(node: OAST.Node): node is OAST.ListItemBullet {
  return is(node, 'list.item.bullet')
}

export function isTableRule(node: OAST.Node): node is OAST.TableRule {
  return is(node, 'table.hr')
}
