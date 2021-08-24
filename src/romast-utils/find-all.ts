import * as ROMAST from '@src/romast'
import { traverseDescendantNodes } from './traverse-descendant-nodes'
import { isParent } from './is'
import { filter } from 'iterable-operator'

export function* findAll<T extends ROMAST.Node>(
  node: ROMAST.Node
, predicate: (node: ROMAST.Node) => boolean
): Iterable<T> {
  if (predicate(node)) yield node as T
  if (isParent(node)) {
    yield* filter(traverseDescendantNodes(node), node => predicate(node))
  }
}
