import * as AST from '@src/romast.js'
import { NodeWithHelpers } from './add-helpers.js'
import { isParent, isSection, isTable } from './is.js'
import { cloneDeep } from 'lodash-es'

export function removeHelpers<T extends AST.Node>(node: NodeWithHelpers<T>): T {
  return removeHelpersInPlace(cloneDeep(node))
}

export function removeHelpersInPlace<T extends AST.Node>(node: NodeWithHelpers<T>): T {
  removeHelpersForTree(node)
  return node as T
}

function removeHelpersForTree<T extends AST.Node>(node: NodeWithHelpers<T>): void {
  delete (node as Partial<NodeWithHelpers<T>>).parent
  delete (node as Partial<NodeWithHelpers<T>>).index
  delete (node as Partial<NodeWithHelpers<T>>).previousSibling
  delete (node as Partial<NodeWithHelpers<T>>).nextSibling
  delete (node as Partial<NodeWithHelpers<T>>).id

  if (isSection(node)) {
    removeHelpersForTree(node.headline as NodeWithHelpers<AST.Headline>)
  }

  if (isTable(node) && node.header) {
    removeHelpersForTree(node.header as NodeWithHelpers<AST.TableRowGroup>)
  }

  if (isParent(node)) {
    removeHelpersForChildren(node)
  }
}

function removeHelpersForChildren(parent: NodeWithHelpers<AST.Node & AST.Parent>): void {
  parent.children.forEach(node => {
    removeHelpersForTree(node as NodeWithHelpers<AST.Node>)
  })
}
