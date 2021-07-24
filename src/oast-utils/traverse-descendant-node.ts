import * as OAST from './oast-2.4'
import { isParent } from './is'

export function* traverseDescendantNodes(parent: OAST.Parent): Iterable<OAST.Node> {
  for (const childNode of parent.children) {
    yield childNode
    if (isParent(childNode)) {
      yield* traverseDescendantNodes(childNode)
    }
  }
}
