import * as AST from '@src/romast'
import { WrappedNode } from './wrap'
import { isParent, isSection, isTable } from './is'
import cloneDeep from 'lodash.clonedeep'

export function unwrap<T extends AST.Node>(node: WrappedNode<T>): T {
  const clone = cloneDeep(node)
  unwrapNode(clone)
  return clone as T
}

function unwrapNode<T extends AST.Node>(node: WrappedNode<T>): void {
  delete (node as Partial<WrappedNode<T>>).parent
  delete (node as Partial<WrappedNode<T>>).index
  delete (node as Partial<WrappedNode<T>>).previousSibling
  delete (node as Partial<WrappedNode<T>>).nextSibling
  delete (node as Partial<WrappedNode<T>>).id

  if (isParent(node)) {
    unwrapChildren(node)
  }

  if (isSection(node)) {
    unwrapNode(node.headline as WrappedNode<AST.Headline>)
  }

  if (isTable(node) && node.header) {
    unwrapNode(node.header as WrappedNode<AST.TableRowGroup>)
  }
}

function unwrapChildren(parent: WrappedNode<AST.Node & AST.Parent>): void {
  parent.children.forEach(node => unwrapNode(node as WrappedNode<AST.Node>))
}
