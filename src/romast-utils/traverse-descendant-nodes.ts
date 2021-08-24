import * as ROMAST from '@src/romast'
import { isParent } from './is'

export function* traverseDescendantNodes(
  parent: ROMAST.Parent
): Iterable<ROMAST.Node> {
  for (const childNode of parent.children) {
    yield childNode
    if (isParent(childNode)) {
      yield* traverseDescendantNodes(childNode)
    }
  }
}
