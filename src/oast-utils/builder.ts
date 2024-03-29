import * as OAST from '@src/oast-3.2.js'

export function document(
  properties: OAST.Document['properties']
, children: OAST.Document['children']
): OAST.Document {
  return {
    type: 'document'
  , properties
  , children
  }
}

export function section(
  level: OAST.Section['level']
, properties: OAST.Section['properties']
, children: OAST.Section['children']
): OAST.Section {
  return {
    type: 'section'
  , level
  , properties
  , children
  }
}

export function footnote(
  label: OAST.Footnote['label']
, children: OAST.Footnote['children']
): OAST.Footnote {
  return {
    type: 'footnote'
  , label
  , children
  }
}

export function block(
  name: OAST.Block['name']
, params: OAST.Block['params']
, value: OAST.Block['value']
, attributes: OAST.Block['attributes']
): OAST.Block {
  return {
    type: 'block'
  , name
  , params
  , value
  , attributes
  }
}

export function drawer(
  name: OAST.Drawer['name']
, value: OAST.Drawer['value']
, children: OAST.Drawer['children']
): OAST.Drawer {
  return {
    type: 'drawer'
  , name
  , value
  , children
  }
}

export function drawerBegin(name: string): OAST.DrawerBegin {
  return {
    type: 'drawer.begin'
  , name
  }
}

export function drawerEnd(): OAST.DrawerEnd {
  return { type: 'drawer.end' }
}

export function planning(
  keyword: OAST.Planning['keyword']
, timestamp: OAST.Planning['timestamp']
, children: OAST.Planning['children']
): OAST.Planning {
  return {
    type: 'planning'
  , keyword
  , timestamp
  , children
  }
}

export function list(
  indent: OAST.List['indent']
, ordered: OAST.List['ordered']
, attributes: OAST.List['attributes']
, children: OAST.List['children']
): OAST.List {
  return {
    type: 'list'
  , indent
  , ordered
  , attributes
  , children
  }
}

export function table(
  attributes: OAST.Table['attributes']
, children: OAST.Table['children']
): OAST.Table {
  return {
    type: 'table'
  , attributes
  , children
  }
}

export function tableRow(children: OAST.TableRow['children']): OAST.TableRow {
  return {
    type: 'table.row'
  , children
  }
}

export function tableCell(children: OAST.TableCell['children']): OAST.TableCell {
  return {
    type: 'table.cell'
  , children
  }
}

export function listItem(
  indent: OAST.ListItem['indent']
, children: OAST.ListItem['children']
, { tag }: Pick<OAST.ListItem, 'tag'> = {}
): OAST.ListItem {
  return {
    type: 'list.item'
  , indent
  , tag
  , children
  }
}

export function headline(
  level: OAST.Headline['level']
, actionable: OAST.Headline['actionable']
, children: OAST.Headline['children']
, { priority, tags }: Pick<OAST.Headline, 'priority' | 'tags'> = {}
): OAST.Headline {
  return {
    type: 'headline'
  , level
  , actionable
  , children
  , priority
  , tags
  }
}

export function paragraph(
  attributes: OAST.Paragraph['attributes']
, children: OAST.Paragraph['children']
): OAST.Paragraph {
  return {
    type: 'paragraph'
  , attributes
  , children
  }
}

export function horizontalRule(): OAST.HorizontalRule {
  return { type: 'hr' }
}

export function newline(): OAST.Newline {
  return { type: 'newline' }
}

export function emptyLine(): OAST.EmptyLine {
  return { type: 'emptyLine' }
}

export function plain(value: OAST.Text['value']): OAST.Text {
  return {
    type: 'text'
  , value
  }
}

export function bold(value: OAST.Text['value']): OAST.Text {
  return {
    type: 'text'
  , style: 'bold'
  , value
  }
}

export function verbatim(value: OAST.Text['value']): OAST.Text {
  return {
    type: 'text'
  , style: 'verbatim'
  , value
  }
}

export function italic(value: OAST.Text['value']): OAST.Text {
  return {
    type: 'text'
  , style: 'italic'
  , value
  }
}

export function strikeThrough(value: OAST.Text['value']): OAST.Text {
  return {
    type: 'text'
  , style: 'strikeThrough'
  , value
  }
}

export function underline(value: OAST.Text['value']): OAST.Text {
   return {
     type: 'text'
   , style: 'underline'
   , value
   }
}

export function code(value: OAST.Text['value']): OAST.Text {
  return {
    type: 'text'
  , style: 'code'
  , value
  }
}

export function link(
  protocol: OAST.Link['path']['protocol']
, value: OAST.Link['path']['value']
, children: OAST.Link['children']
, { search }: Pick<OAST.Link['path'], 'search'> = {}
): OAST.Link {
  return {
    type: 'link'
  , path: {
      protocol
    , value
    , search
    }
  , children
  }
}

export function linkPath(
  protocol: OAST.Link['path']['protocol']
, value: OAST.Link['path']['value']
, { search }: Pick<OAST.Link['path'], 'search'> = {}
): OAST.LinkPath {
  return {
    type: 'link.path'
  , protocol
  , value
  , search
  }
}

export function opening(element: string): OAST.Opening {
  return {
    type: 'opening'
  , element
  }
}

export function closing(element: string): OAST.Closing {
  return {
    type: 'closing'
  , element
  }
}

export function footnoteReference(
  label: OAST.FootnoteReference['label']
, children: OAST.FootnoteReference['children']
): OAST.FootnoteReference {
  return {
    type: 'footnote.reference'
  , label
  , children
  }
}

export function stars(level: OAST.Stars['level']): OAST.Stars {
  return {
    type: 'stars'
  , level
  }
}

export function todo(
  keyword: OAST.Todo['keyword']
, actionable: OAST.Todo['actionable']
): OAST.Todo {
  return {
    type: 'todo'
  , keyword
  , actionable
  }
}

export function priority(value: OAST.Priority['value']): OAST.Priority {
  return {
    type: 'priority'
  , value
  }
}

export function tags(tags: OAST.Tags['tags']): OAST.Tags {
  return {
    type: 'tags'
  , tags
  }
}

export function listItemCheckbox(
  checked: OAST.ListItemCheckbox['checked']
): OAST.ListItemCheckbox {
  return {
    type: 'list.item.checkbox'
  , checked
  }
}

export function listItemBullet(
  indent: OAST.ListItemBullet['indent']
, ordered: OAST.ListItemBullet['ordered']
): OAST.ListItemBullet {
  return {
    type: 'list.item.bullet'
  , indent
  , ordered
  }
}

export function listItemTag(value: OAST.ListItemTag['value']): OAST.ListItemTag {
  return {
    type: 'list.item.tag'
  , value
  }
}

export function tableRule(): OAST.TableRule {
  return { type: 'table.hr' }
}

export function tableColumnSeparator(): OAST.TableColumnSeparator {
  return { type: 'table.columnSeparator' }
}

export function footnoteLabel(
  label: OAST.FootnoteLabel['label']
): OAST.FootnoteLabel {
  return {
    type: 'footnote.label'
  , label
  }
}

export function planningKeyword(
  value: OAST.PlanningKeyword['value']
): OAST.PlanningKeyword {
  return {
    type: 'planning.keyword'
  , value
  }
}

export function planningTimestamp(
  value: OAST.PlanningTimestamp['value']
): OAST.PlanningTimestamp {
  return {
    type: 'planning.timestamp'
  , value
  }
}
