import * as ROMAST from '@src/romast'
import { isParent } from './is'
import cloneDeep from 'lodash.clonedeep'

export function flatMap(
  node: ROMAST.Node
, fn: (node: ROMAST.Node) => ROMAST.Node[]
): ROMAST.Node[] {
  const newNodes = fn(cloneDeep(node))
  return newNodes.map(node => {
    if (isParent(node)) {
      node.children = node.children.map(x => flatMap(x, fn)).flat()
    }
    return node
  })
}
