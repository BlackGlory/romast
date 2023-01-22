import * as ROMAST from '@src/romast.js'
import { traverseDescendantNodes } from './traverse-descendant-nodes.js'
import { find as findInIterable } from 'iterable-operator'

export function find<T extends ROMAST.Node>(
  node: ROMAST.Node
, predicate: (node: ROMAST.Node) => boolean
): T | undefined {
  if (predicate(node)) return node as T

  const result = findInIterable(
    traverseDescendantNodes(node)
  , node => predicate(node)
  )
  if (result) return result as T

  return undefined
}
