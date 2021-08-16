# romast

**R**enderable **O**rg-**M**ode **A**bstract **S**yntax **T**ree.

rmdast v1 is an easy-to-render version of [oast v2],
the new AST is designed to render nodes directly from AST to any platform, e.g. React.
So you can precisely control the translation results by recursive descent analysis.

[oast v2]: https://github.com/orgapp/orgajs

## Install

```sh
npm install --save romast
# or
yarn add romast
```

## Usage

```ts
import { parse } from 'romast'
import { dedent } from 'extra-tags'

const org = dedent`
* Romast
`

const romast = parse(org)
// {
//   "type": "document",
//   "children": [
//     {
//       "type": "section",
//       "level": 1,
//       "headline": {
//         "type": "headline",
//         "level": 1,
//         "tags": [],
//         "children": [
//           {
//             "type": "text",
//             "value": "Romast"
//           }
//         ]
//       },
//       "children": []
//     }
//   ]
// }
```

### AST

```ts
interface Node {
  type: string
}

interface Parent {
  children: Node[]
}

interface ParentOf<T extends Node[]> extends Parent {
  children: T
}

type BlockNode =
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
| TableRow
| TableCell
| TableHorizontalRule
| HorizontalRule
| Drawer

type InlineNode =
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

type DocumentContent =
| UniversalBlockContent
| Section

type SectionContent =
| UniversalBlockContent
| Section

type TableContent = TableRow | TableHorizontalRule

type ListContent = List | ListItem

type UniversalBlockContent =
| Paragraph
| Example
| Source
| Quote
| Drawer
| List
| Table
| HorizontalRule

type UniversalInlineContent =
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

interface Document extends ParentOf<DocumentContent[]> {
  type: 'document'
}

interface Section extends ParentOf<SectionContent[]> {
  type: 'section'
  level: number
  headline: Headline
}

interface Headline extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'headline'
  level: number
  tags: string[]
}

interface Paragraph extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'paragraph'
}

interface Example extends Node {
  type: 'example'
  params: string[]
  value: string
}

interface Source extends Node {
  type: 'source'
  params: string[]
  value: string
}

interface Quote extends Node {
  type: 'quote'
  value: string
}

interface List extends Node, ParentOf<ListContent[]> {
  type: 'list'
  indent: number
  ordered: boolean
}

interface ListItem extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'listItem'
  indent: number
  checked: boolean | null
  term: string | null
}

interface Table extends Node, ParentOf<TableContent[]> {
  type: 'table'
}

interface TableRow extends Node, ParentOf<TableCell[]> {
  type: 'tableRow'
}

interface TableCell extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'tableCell'
}

interface TableHorizontalRule extends Node {
  type: 'tableHorizontalRule'
}

interface HorizontalRule extends Node {
  type: 'horizontalRule'
}

interface Footnote extends Node, ParentOf<UniversalBlockContent[]> {
  type: 'footnote'
}

interface InlineFootnote extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'inlineFootnote'
}

interface Drawer extends Node {
  type: 'drawer'
  name: string
  value: string
}

interface Link extends Node {
  type: 'link'
  protocol: 'internal' | string
  title: string | null
  url: string
}

interface Text extends Node {
  type: 'text'
  value: string
}

interface Bold extends Node {
  type: 'bold'
  value: string
}

interface Verbatim extends Node {
  type: 'verbatim'
  value: string
}

interface Italic extends Node {
  type: 'italic'
  value: string
}

interface Strikethrough extends Node {
  type: 'strikethrough'
  value: string
}

interface Underlined extends Node {
  type: 'underlined'
  value: string
}

interface Code extends Node {
  type: 'code'
  value: string
}
```

## API

### parse

```ts
function parse(text: string): AST.Document
```

### is

Each romast node has a corresponding `is` function.
