import * as ROMAST from '@src/romast'
import { traverseDescendantNodes } from './traverse-descendant-nodes'
import { isParent, isSection, isTable } from './is'
import { find as findInIterable } from 'iterable-operator'

export function find<T extends ROMAST.Node>(
  node: ROMAST.Node
, predicate: (node: ROMAST.Node) => boolean
): T | undefined {
  if (predicate(node)) return node as T

  if (isSection(node) && node.headline) {
    const result = find<T>(node.headline, predicate)
    if (result) return result
  } 

  if (isTable(node) && node.header) {
    const result = find<T>(node.header, predicate)
    if (result) return result
  }

  if (isParent(node)) {
    const result = findInIterable(
      traverseDescendantNodes(node)
    , node => predicate(node)
    )
    if (result) return result as T
  }

  return undefined
}
