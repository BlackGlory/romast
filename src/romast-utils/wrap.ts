import * as AST from '@src/romast'
import { Mixin } from 'hotypes'
import { isParent, isSection, isTable } from './is'
import cloneDeep from 'lodash.clonedeep'
import { isntUndefined } from '@blackglory/types'
import { nanoid } from 'nanoid'

type NullOrWrappedNode<T extends AST.Node | null> =
  T extends null
  ? null
  : WrappedNode<NonNullable<T>>

export interface IWrappedNode {
  id: string
  parent: IWrappedNode | null
  index: number | null
  previousSibling: IWrappedNode | null
  nextSibling: IWrappedNode | null
}

export type WrappedNode<
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
        WrappedNode<
          AST.DocumentContent
        , AST.DocumentContent
        , AST.Document
        >
      >
    }>
: Node extends AST.Paragraph
  ? Mixin<Node, {
      id: string
      parent: NullOrWrappedNode<Parent>
      index: number
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<
        WrappedNode<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.Paragraph
        >
      >
    }>
: Node extends AST.Section
  ? Mixin<Node, {
      id: string
      parent: NullOrWrappedNode<Parent>
      index: number
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      headline: WrappedNode<AST.Headline, null, AST.Section>
      children: Array<
        WrappedNode<
          AST.SectionContent
        , AST.SectionContent
        , AST.Section
        >
      >
    }>
: Node extends AST.Headline
  ? Mixin<Node, {
      id: string
      parent: NullOrWrappedNode<Parent>
      index: null
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<
        WrappedNode<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.Headline
        >
      >
    }>
: Node extends AST.Paragraph
  ? Mixin<Node, {
      id: string
      parent: NullOrWrappedNode<Parent>
      index: number
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<
        WrappedNode<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.Paragraph
        >
      >
    }>
: Node extends AST.List
  ? Mixin<Node, {
      id: string
      parent: NullOrWrappedNode<Parent>
      index: number
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.ListContent, AST.ListContent, AST.List>>
    }>
: Node extends AST.ListItem
  ? Mixin<Node, {
      id: string
      parent: NullOrWrappedNode<Parent>
      index: number
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<
        WrappedNode<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.ListItem
        >
      >
    }>
: Node extends AST.Table
  ? Mixin<Node, {
      id: string
      parent: NullOrWrappedNode<Parent>
      index: number
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      header: WrappedNode<AST.TableRowGroup, null, AST.Table>
      children: Array<WrappedNode<AST.TableRowGroup, AST.TableRowGroup, AST.Table>>
    }>
: Node extends AST.TableRowGroup
  ? Mixin<Node, {
      id: string
      parent: NullOrWrappedNode<Parent>
      index: Sibling extends null ? null : number
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.TableRow, AST.TableRow, AST.TableRowGroup>>
    }>
: Node extends AST.TableRow
  ? Mixin<Node, {
      id: string
      parent: NullOrWrappedNode<Parent>
      index: number
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.TableCell, AST.TableCell, AST.TableRow>>
    }>
: Node extends AST.TableCell
  ? Mixin<Node, {
      id: string
      parent: NullOrWrappedNode<Parent>
      index: number
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<
        WrappedNode<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.TableCell
        >
      >
    }>
: Node extends AST.Footnote
  ? Mixin<Node, {
      id: string
      parent: NullOrWrappedNode<Parent>
      index: number
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<
        WrappedNode<
          AST.UniversalBlockContent
        , AST.UniversalBlockContent
        , AST.Footnote
        >
      >
    }>
: Node extends AST.InlineFootnote
  ? Mixin<Node, {
      id: string
      parent: NullOrWrappedNode<Parent>
      index: number
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<
        WrappedNode<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.InlineFootnote
        >
      >
    }>
: Node extends AST.Link
  ? Mixin<Node, {
      id: string
      parent: NullOrWrappedNode<Parent>
      index: number
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<
        WrappedNode<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.Link
        >
      >
    }>
: Node extends AST.Drawer
  ? Mixin<Node, {
      id: string
      parent: NullOrWrappedNode<Parent>
      index: number
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<
        WrappedNode<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.Drawer
        >
      >
    }>
: Mixin<Node, {
    id: string
    parent: NullOrWrappedNode<Parent>
    index: number | null
    previousSibling: NullOrWrappedNode<Sibling>
    nextSibling: NullOrWrappedNode<Sibling>
  }>

export function wrap<T extends AST.Node>(node: T): WrappedNode<T> {
  const clone = cloneDeep(node)
  wrapNode(clone)
  return clone as WrappedNode<T>
}

function wrapNode<
  Node extends AST.Node
, Parent extends AST.Node & AST.Parent
>(
  node: Node
, parent?: Parent
, index?: number
): void {
  const wrappedNode = node as any
  wrappedNode.parent = null
  wrappedNode.index = null
  wrappedNode.previousSibling = null
  wrappedNode.nextSibling = null
  wrappedNode.id = nanoid()

  if (isntUndefined(parent)) {
    wrappedNode.parent = parent

    if (isntUndefined(index)) {
      const previousSibling = parent.children[index - 1]
      const nextSibling = parent.children[index + 1]

      wrappedNode.index = index
      wrappedNode.previousSibling = previousSibling ?? null
      wrappedNode.nextSibling = nextSibling ?? null
    }
  }

  if (isParent(wrappedNode)) {
    wrapChildren(wrappedNode)
  }

  if (isSection(wrappedNode)) {
    wrapNode(wrappedNode.headline, wrappedNode)
  }

  if (isTable(wrappedNode) && wrappedNode.header) {
    wrapNode(wrappedNode.header, wrappedNode)
  }
}

function wrapChildren(parent: AST.Node & AST.Parent): void { 
  parent.children.forEach((node, i) => wrapNode(node, parent, i))
}
