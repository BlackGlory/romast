import * as ROMAST from '@src/romast'
import { traverseDescendantNodes } from './traverse-descendant-nodes'
import { isParent } from './is'
import { find as findInIterable } from 'iterable-operator'

export function find<T extends ROMAST.Node>(
  node: ROMAST.Node
, predicate: (node: ROMAST.Node) => boolean
): T | undefined {
  if (predicate(node)) return node as T
  if (isParent(node)) {
    const result = findInIterable(
      traverseDescendantNodes(node)
    , node => predicate(node)
    )
    if (result) return result as T
  }
  return undefined
}
