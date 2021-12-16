import * as AST from '@src/romast'
import { Mixin } from 'hotypes'
import { isParent, isSection, isTable } from './is'
import cloneDeep from 'lodash.clonedeep'
import { isntUndefined } from '@blackglory/types'
import { nanoid } from 'nanoid'

type NullOrNodeWithHelpers<T extends AST.Node | null> =
  T extends null
  ? null
  : NodeWithHelpers<NonNullable<T>>

export interface INodeWithHelpers {
  id: string
  parent: INodeWithHelpers | null
  index: number | null
  previousSibling: INodeWithHelpers | null
  nextSibling: INodeWithHelpers | null
}

export type NodeWithHelpers<
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

export function addHelpers<T extends AST.Node>(node: T): NodeWithHelpers<T> {
  const clone = cloneDeep(node)
  addHelpersToTree(clone)
  return clone as NodeWithHelpers<T>
}

function addHelpersToTree<
  Node extends AST.Node
, Parent extends AST.Node & AST.Parent
>(
  node: Node
, parent?: Parent
, index?: number
): void {
  const addHelperspedNode = node as any
  addHelperspedNode.parent = null
  addHelperspedNode.index = null
  addHelperspedNode.previousSibling = null
  addHelperspedNode.nextSibling = null
  addHelperspedNode.id = nanoid()

  if (isntUndefined(parent)) {
    addHelperspedNode.parent = parent

    if (isntUndefined(index)) {
      const previousSibling = parent.children[index - 1]
      const nextSibling = parent.children[index + 1]

      addHelperspedNode.index = index
      addHelperspedNode.previousSibling = previousSibling ?? null
      addHelperspedNode.nextSibling = nextSibling ?? null
    }
  }

  if (isSection(addHelperspedNode)) {
    addHelpersToTree(addHelperspedNode.headline, addHelperspedNode)
  }

  if (isTable(addHelperspedNode) && addHelperspedNode.header) {
    addHelpersToTree(addHelperspedNode.header, addHelperspedNode)
  }

  if (isParent(addHelperspedNode)) {
    addHelpersToChildren(addHelperspedNode)
  }
}

function addHelpersToChildren(parent: AST.Node & AST.Parent): void { 
  parent.children.forEach((node, i) => addHelpersToTree(node, parent, i))
}
