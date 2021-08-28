import * as ROMAST from '@src/romast'
import { isParent, isSection, isTable } from './is'

export function* traverseDescendantNodes(
  parent: ROMAST.Parent
): Iterable<ROMAST.Node> {
  for (const childNode of parent.children) {
    yield childNode

    if (isSection(childNode)) {
      yield childNode.headline
    }

    if (isTable(childNode) && childNode.header) {
      yield childNode.header
    }

    if (isParent(childNode)) {
      yield* traverseDescendantNodes(childNode)
    }
  }
}
