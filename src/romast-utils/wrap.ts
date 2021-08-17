import * as AST from '@src/romast-1.0'
import { Mixin } from 'hotypes'
import { isParent, isSection } from './is'
import cloneDeep from 'lodash.clonedeep'
import { isntUndefined } from '@blackglory/types'

type NullOrWrappedNode<T extends AST.Node | null> =
  T extends null
  ? null
  : WrappedNode<NonNullable<T>>

export type WrappedNode<
  Node extends AST.Node
, Sibling extends AST.Node | null = AST.Node | null
, Parent extends AST.Node | null = AST.Node | null
> =
  Node extends AST.Document
  ? Mixin<Node, {
      parent: null
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
      parent: NullOrWrappedNode<Parent>
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
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
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
      parent: NullOrWrappedNode<Parent>
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
      parent: NullOrWrappedNode<Parent>
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
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.ListContent, AST.ListContent, AST.List>>
    }>
: Node extends AST.ListItem
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
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
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.TableContent, AST.TableContent, AST.Table>>
    }>
: Node extends AST.TableRow
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.TableCell, AST.TableCell, AST.TableRow>>
    }>
: Node extends AST.TableCell
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
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
      parent: NullOrWrappedNode<Parent>
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
      parent: NullOrWrappedNode<Parent>
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
: Mixin<Node, {
    parent: NullOrWrappedNode<Parent>
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
  const wrappedNode = node as WrappedNode<Node>
  wrappedNode.parent = null
  wrappedNode.previousSibling = null
  wrappedNode.nextSibling = null

  if (isntUndefined(parent)) {
    wrappedNode.parent = parent as unknown as WrappedNode<Parent>

    if (isntUndefined(index)) {
      const previousSibling =
        parent.children[index - 1] as WrappedNode<Node> | undefined
      const nextSibling =
        parent.children[index + 1] as WrappedNode<Node> | undefined

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
}

function wrapChildren(parent: AST.Node & AST.Parent): void { 
  parent.children.forEach((node, i) => wrapNode(node, parent, i))
}
