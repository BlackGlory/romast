import * as ROMAST from '@src/romast'
import { isParent, isSection, isTable } from './is'

export function* traverseDescendantNodes(node: ROMAST.Node): Iterable<ROMAST.Node> {
  if (isSection(node)) {
    yield node.headline
    yield* traverseDescendantNodes(node.headline)
  }

  if (isTable(node) && node.header) {
    yield node.header
    yield* traverseDescendantNodes(node.header)
  }

  if (isParent(node)) {
    for (const childNode of node.children) {
      yield childNode
      yield* traverseDescendantNodes(childNode)
    }
  }
}
