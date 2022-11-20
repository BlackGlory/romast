# romast

**R**enderable **O**rg-**M**ode **A**bstract **S**yntax **T**ree.

romast is an easy-to-render version of [oast v3],
the new AST is designed to render nodes directly from AST to any platform, e.g. React.
So you can precisely control the translation results by recursive descent analysis.

[oast v3]: https://github.com/orgapp/orgajs

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
Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Duis aute irure dolor in reprehenderit in voluptate
velit esse cillum dolore eu fugiat nulla pariatur.
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
//         "tags": [],
//         "children": [
//           {
//             "type": "text",
//             "value": "Romast"
//           }
//         ]
//       },
//       "children": [
//         {
//           "type": "paragraph",
//           "children": [
//             {
//               "type": "text",
//               "value": "Lorem ipsum dolor sit amet,"
//             },
//             {
//               "type": "newline"
//             },
//             {
//               "type": "text",
//               "value": "consectetur adipiscing elit,"
//             },
//             {
//               "type": "newline"
//             },
//             {
//               "type": "text",
//               "value": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
//             }
//           ]
//         },
//         {
//           "type": "paragraph",
//           "children": [
//             {
//               "type": "text",
//               "value": "Duis aute irure dolor in reprehenderit in voluptate"
//             },
//             {
//               "type": "newline"
//             },
//             {
//               "type": "text",
//               "value": "velit esse cillum dolore eu fugiat nulla pariatur."
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }
```

## API

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
| TableRowGroup
| TableRow
| TableCell
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
| Newline

type DocumentContent =
| UniversalBlockContent
| Section
| Newline

type SectionContent =
| UniversalBlockContent
| Section

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
| Newline

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

interface Table extends Node, ParentOf<TableRowGroup[]> {
  type: 'table'
  header: TableRowGroup | null
}

interface TableRowGroup extends Node, ParentOf<TableRow[]> {
  type: 'tableRowGroup'
}

interface TableRow extends Node, ParentOf<TableCell[]> {
  type: 'tableRow'
}

interface TableCell extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'tableCell'
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

interface Newline extends Node {
  type: 'newline'
}

interface Drawer extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'drawer'
  name: string
}

interface Link extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'link'
  protocol: 'internal' | string
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

### parse

```ts
function parse(text: string, strict: boolean = false): AST.Document
```

Limited by the parser, The analysis results may have non-compliant nodes.
If `strict` is `true`, an `UnknownNodeError` will be thrown when there are non-compliant nodes.
If `strict` is `false`, theses non-compliant are simply ignored.

### utils

#### builder

```ts
import * as Builder from 'romast/utils/builder'
```

Each romast node has a corresponding builder.

#### is

```ts
import * as Is from 'romast/utils/is'
```

Each romast node has a corresponding `is` function.

#### flatMap

```ts
import { flatMap } from 'romast/utils/flat-map'

function flatMap(
  node: AST.Node
, fn: (node: AST.Node) => AST.Node[]
): AST.Node[]
```

#### map

```ts
import { map } from 'romast/utils/map'

function map(
  node: AST.Node
, fn: (node: AST.Node) => AST.Node
): AST.Node
```

#### filter

```ts
import { filter } from 'romast/utils/filter'

function filter(
  node: AST.Node
, predicate: (node: AST.Node) => unknown
): AST.Node | undefined
```

#### find

```ts
import { find } from 'romast/utils/find'

function find<T extends AST.Node>(
  node: AST.Node
, predicate: (node: AST.Node) => boolean
): T | undefined
```

#### findAll

```ts
import { findAll } from 'romast/utils/find-all'

function findAll<T extends AST.Node>(
  node: AST.Node
, predicate: (node: AST.Node) => boolean
): Iterable<T>
```

#### traverseDescendantNodes

```ts
import { traverseDescendantNodes } from 'romast/utils/traverse-descendant-nodes'

function traverseDescendantNodes(node: AST.Node): Iterable<AST.Node>
```

#### addHelpers

```ts
import { addHelpers, addHelpersInPlace } from 'romast/utils/add-helpers'

type NullOrNodeWithHelpers<T extends AST.Node | null> =
  T extends null
  ? null
  : NodeWithHelpers<NonNullable<T>>

type NodeWithHelpers<
  Node extends AST.Node
, Sibling extends AST.Node | null = AST.Node | null
, Parent extends AST.Node | null = AST.Node | null
> =
  Node extends AST.Document
  ? Mixin<Node, {
      id: string
      parent: null
      index: null
      previousSibling: null
      nextSibling: null
      children: Array<
        NodeWithHelpers<
          AST.DocumentContent
        , AST.DocumentContent
        , AST.Document
        >
      >
    }>
: Node extends AST.Paragraph
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.Paragraph
        >
      >
    }>
: Node extends AST.Section
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      headline: NodeWithHelpers<AST.Headline, null, AST.Section>
      children: Array<
        NodeWithHelpers<
          AST.SectionContent
        , AST.SectionContent
        , AST.Section
        >
      >
    }>
: Node extends AST.Headline
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: null
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.Headline
        >
      >
    }>
: Node extends AST.Paragraph
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.Paragraph
        >
      >
    }>
: Node extends AST.List
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<NodeWithHelpers<AST.ListContent, AST.ListContent, AST.List>>
    }>
: Node extends AST.ListItem
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.ListItem
        >
      >
    }>
: Node extends AST.Table
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      header: NodeWithHelpers<AST.TableRowGroup, null, AST.Table> | null
      children: Array<NodeWithHelpers<AST.TableRowGroup, AST.TableRowGroup, AST.Table>>
    }>
: Node extends AST.TableRowGroup
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: Sibling extends null ? null : number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<NodeWithHelpers<AST.TableRow, AST.TableRow, AST.TableRowGroup>>
    }>
: Node extends AST.TableRow
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<NodeWithHelpers<AST.TableCell, AST.TableCell, AST.TableRow>>
    }>
: Node extends AST.TableCell
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.TableCell
        >
      >
    }>
: Node extends AST.Footnote
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalBlockContent
        , AST.UniversalBlockContent
        , AST.Footnote
        >
      >
    }>
: Node extends AST.InlineFootnote
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.InlineFootnote
        >
      >
    }>
: Node extends AST.Link
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.Link
        >
      >
    }>
: Node extends AST.Drawer
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.Drawer
        >
      >
    }>
: Mixin<Node, {
    id: string
    parent: NullOrNodeWithHelpers<Parent>
    index: number | null
    previousSibling: NullOrNodeWithHelpers<Sibling>
    nextSibling: NullOrNodeWithHelpers<Sibling>
  }>

function addHelpers<T extends AST.Node>(node: T): NodeWithHelpers<T>
function addHelpersInPlace<T extends AST.Node>(node: T): NodeWithHelpers<T>
```

#### removeHelpers

```ts
import { removeHelpers, removeHelpersInPlace } from 'romast/utils/remove-helpers'

function removeHelpers<T extends AST.Node>(node: NodeWithHelpers<T>): T
function removeHelpersInPlace<T extends AST.Node>(node: NodeWithHelpers<T>): T
```

#### withHelpers

```ts
import { withHelpers, withHelpersInPlace } from 'romast/utils/with-helpers'

function withHelpers<T extends AST.Node, U>(
  node: T
, fn: (node: NodeWithHelpers<T>) => U
): U
function withHelpersInPlace<T extends AST.Node, U>(
  node: T
, fn: (node: NodeWithHelpers<T>) => U
): U
```
