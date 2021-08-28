import * as ROMAST from '@src/romast'
import { traverseDescendantNodes } from './traverse-descendant-nodes'
import { isParent, isSection, isTable } from './is'
import { filter } from 'iterable-operator'

export function* findAll<T extends ROMAST.Node>(
  node: ROMAST.Node
, predicate: (node: ROMAST.Node) => boolean
): Iterable<T> {
  if (predicate(node)) yield node as T

  if (isSection(node) && node.headline) {
    yield* findAll(node.headline, predicate)
  }

  if (isTable(node) && node.header) {
    yield* findAll(node.header, predicate)
  }

  if (isParent(node)) {
    yield* filter(traverseDescendantNodes(node), node => predicate(node))
  }
}
