import * as OAST from '@src/oast-3.1'
import { isParent } from './is'

export function* traverseDescendantNodes(parent: OAST.Parent): Iterable<OAST.Node> {
  for (const childNode of parent.children) {
    yield childNode
    if (isParent(childNode)) {
      yield* traverseDescendantNodes(childNode)
    }
  }
}
