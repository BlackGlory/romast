import * as ROMAST from '@src/romast.js'

export function document(children: ROMAST.Document['children']): ROMAST.Document {
  return {
    type: 'document'
  , children
  }
}

export function section(
  level: ROMAST.Section['level']
, headline: ROMAST.Section['headline']
, children: ROMAST.Section['children']
): ROMAST.Section {
  return {
    type: 'section'
  , level
  , headline
  , children
  }
}

export function headline(
  tags: string[]
, children: ROMAST.Headline['children']
): ROMAST.Headline {
  return {
    type: 'headline'
  , children
  , tags
  }
}

export function paragraph(children: ROMAST.Paragraph['children']): ROMAST.Paragraph {
  return {
    type: 'paragraph'
  , children
  }
}

export function example(params: ROMAST.Example['params'], value: ROMAST.Example['value']): ROMAST.Example {
  return {
    type: 'example'
  , params
  , value
  }
}

export function source(params: ROMAST.Source['params'], value: ROMAST.Source['value']): ROMAST.Source {
  return {
    type: 'source'
  , params
  , value
  }
}

export function quote(value: ROMAST.Quote['value']): ROMAST.Quote {
  return {
    type: 'quote'
  , value
  }
}

export function list(
  indent: ROMAST.List['indent']
, ordered: ROMAST.List['ordered']
, children: ROMAST.List['children']
): ROMAST.List {
  return {
    type: 'list'
  , indent
  , ordered
  , children
  }
}

export function listItem(
  indent: ROMAST.ListItem['indent']
, children: ROMAST.ListItem['children']
, { term = null, checked = null }: Partial<Pick<ROMAST.ListItem, 'term' | 'checked'>> = {}
): ROMAST.ListItem {
  return {
    type: 'listItem'
  , indent
  , checked
  , term
  , children
  }
}

export function table(
  header: ROMAST.Table['header']
, children: ROMAST.Table['children']
): ROMAST.Table {
  return {
    type: 'table'
  , header
  , children
  }
}

export function tableRowGroup(
  children: ROMAST.TableRowGroup['children']
): ROMAST.TableRowGroup {
  return {
    type: 'tableRowGroup'
  , children
  }
}

export function tableRow(children: ROMAST.TableRow['children']): ROMAST.TableRow {
  return {
    type: 'tableRow'
  , children
  }
}

export function tableCell(children: ROMAST.TableCell['children']): ROMAST.TableCell {
  return {
    type: 'tableCell'
  , children
  }
}

export function horizontalRule(): ROMAST.HorizontalRule {
  return { type: 'horizontalRule' }
}

export function footnote(children: ROMAST.Footnote['children']): ROMAST.Footnote {
  return {
    type: 'footnote'
  , children
  }
}

export function inlineFootnote(
  children: ROMAST.InlineFootnote['children']
): ROMAST.InlineFootnote {
  return {
    type: 'inlineFootnote'
  , children
  }
}

export function newline(): ROMAST.Newline {
  return { type: 'newline' }
}

export function drawer(
  name: ROMAST.Drawer['name']
, children: ROMAST.Drawer['children']
): ROMAST.Drawer {
  return {
    type: 'drawer'
  , name
  , children
  }
}

export function link(
  protocol: ROMAST.Link['protocol']
, url: ROMAST.Link['url']
, children: ROMAST.Link['children']
): ROMAST.Link {
  return {
    type: 'link'
  , protocol
  , url
  , children
  }
}

export function text(value: ROMAST.Text['value']): ROMAST.Text {
  return {
    type: 'text'
  , value
  }
}

export function bold(value: ROMAST.Bold['value']): ROMAST.Bold {
  return {
    type: 'bold'
  , value
  }
}

export function verbatim(value: ROMAST.Verbatim['value']): ROMAST.Verbatim {
  return {
    type: 'verbatim'
  , value
  }
}

export function italic(value: ROMAST.Italic['value']): ROMAST.Italic {
  return {
    type: 'italic'
  , value
  }
}

export function strikethrough(value: ROMAST.Strikethrough['value']): ROMAST.Strikethrough {
  return {
    type: 'strikethrough'
  , value
  }
}

export function underlined(value: ROMAST.Underlined['value']): ROMAST.Underlined {
  return {
    type: 'underlined'
  , value
  }
}

export function code(value: ROMAST.Code['value']): ROMAST.Code {
  return {
    type: 'code'
  , value
  }
}
