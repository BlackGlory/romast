import * as OAST from '@src/oast-3.2.js'
import { traverseDescendantNodes } from './traverse-descendant-node.js'
import { isParent } from './is.js'
import { find as findInIterable } from 'iterable-operator'

export function find<T extends OAST.Node>(
  node: OAST.Node
, predicate: (node: OAST.Node) => boolean
): T | undefined {
  if (predicate(node)) return node as T
  if (isParent(node)) {
    const result = findInIterable(traverseDescendantNodes(node), node => predicate(node))
    if (result) return result as T
  }
  return undefined
}
