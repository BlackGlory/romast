import * as OAST from './oast-2.4'

function is<T extends OAST.Node>(node: OAST.Node, type: string): node is T {
  return node.type === type
}

export function isParent(node: OAST.Node): node is OAST.Parent {
  return 'children' in node
}

export function isDocument(node: OAST.Node): node is OAST.Document {
  return is(node, 'document')
}

export function isSection(node: OAST.Node): node is OAST.Section {
  return is(node, 'section')
}

export function isTopLevelContent(node: OAST.Node): node is OAST.TopLevelContent {
  return isContent(node)
      || isFootnote(node)
}

export function isContent(node: OAST.Node): node is OAST.Content {
  return isSection(node)
      || isParagraph(node)
      || isBlock(node)
      || isDrawer(node)
      || isPlanning(node)
      || isList(node)
      || isTable(node)
      || isHorizontalRule(node)
      || isHeadline(node)
      || isHTML(node)
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

export function isTableContent(node: OAST.Node): node is OAST.TableContent {
  return isTableRow(node)
      || isTableRule(node)
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

export function isHTML(node: OAST.Node): node is OAST.HTML {
  return is(node, 'html')
}

export function isToken(node: OAST.Node): node is OAST.Token {
  return isTodo(node)
      || isNewline(node)
      || isHorizontalRule(node)
      || isStars(node)
      || isPriority(node)
      || isTags(node)
      || isPlanningKeyword(node)
      || isPlanningTimestamp(node)
      || isListItemCheckbox(node)
      || isListItemBullet(node)
      || isTableRule(node)
      || isTableColumnSeparator(node)
      || isPhrasingContent(node)
      || isFootnoteLabel(node)
      || isFootnoteInlineBegin(node)
      || isFootnoteReferenceEnd(node)
      || isBlockBegin(node)
      || isBlockEnd(node)
      || isDrawerBegin(node)
      || isDrawerEnd(node)
      || isComment(node)
}

export function isPhrasingContent(node: OAST.Node): node is OAST.PhrasingContent {
  return isStyledText(node)
      || isLink(node)
      || isFootnoteReference(node)
      || isNewline(node)
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

export function isFootnoteInlineBegin(node: OAST.Node): node is OAST.FootnoteInlineBegin {
  return is(node, 'footnote.inline.begin')
}

export function isFootnoteReferenceEnd(node: OAST.Node): node is OAST.FootnoteReferenceEnd {
  return is(node, 'footnote.reference.end')
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

export function isBlockBegin(node: OAST.Node): node is OAST.BlockBegin {
  return is(node, 'block.begin')
}

export function isBlockEnd(node: OAST.Node): node is OAST.BlockEnd {
  return is(node, 'block.end')
}

export function isDrawerBegin(node: OAST.Node): node is OAST.DrawerBegin {
  return is(node, 'drawer.begin')
}

export function isDrawerEnd(node: OAST.Node): node is OAST.DrawerEnd {
  return is(node, 'drawer.end')
}

export function isComment(node: OAST.Node): node is OAST.Comment {
  return is(node, 'comment')
}

export function isFootnoteLabel(node: OAST.Node): node is OAST.FootnoteLabel {
  return is(node, 'footnote.label')
}

export function isPlanningKeyword(node: OAST.Node): node is OAST.PlanningKeyword {
  return is(node, 'planning.keyword')
}

export function isPlanningTimestamp(node: OAST.Node): node is OAST.PlanningTimestamp {
  return is(node, 'planning.timestamp')
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

export function isTableColumnSeparator(node: OAST.Node): node is OAST.TableColumnSeparator {
  return is(node, 'table.columnSeparator')
}
