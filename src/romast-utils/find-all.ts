import * as ROMAST from '@src/romast.js'
import { traverseDescendantNodes } from './traverse-descendant-nodes.js'
import { filter } from 'iterable-operator'

export function* findAll<T extends ROMAST.Node>(
  node: ROMAST.Node
, predicate: (node: ROMAST.Node) => boolean
): Iterable<T> {
  if (predicate(node)) yield node as T

  yield* filter(traverseDescendantNodes(node), node => predicate(node))
}
