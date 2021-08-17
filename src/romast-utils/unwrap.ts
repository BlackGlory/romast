import * as AST from '@src/romast-1.0'
import { WrappedNode } from './wrap'
import { isParent, isSection } from './is'
import cloneDeep from 'lodash.clonedeep'

export function unwrap<T extends AST.Node>(node: WrappedNode<T>): T {
  const clone = cloneDeep(node)
  unwrapNode(clone)
  return clone as T
}

function unwrapNode<T extends AST.Node>(node: WrappedNode<T>): void {
  delete (node as Partial<WrappedNode<T>>).parent
  delete (node as Partial<WrappedNode<T>>).previousSibling
  delete (node as Partial<WrappedNode<T>>).nextSibling

  if (isParent(node)) {
    unwrapChildren(node)
  }

  if (isSection(node)) {
    unwrapNode(node.headline as WrappedNode<AST.Headline>)
  }
}

function unwrapChildren(parent: WrappedNode<AST.Node & AST.Parent>): void {
  parent.children.forEach(node => unwrapNode(node as WrappedNode<AST.Node>))
}
