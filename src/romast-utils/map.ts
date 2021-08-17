import * as ROMAST from '@src/romast'
import { isParent } from './is'
import cloneDeep from 'lodash.clonedeep'

export function map(
  node: ROMAST.Node
, fn: (node: ROMAST.Node) => ROMAST.Node
): ROMAST.Node {
  const newNode = fn(cloneDeep(node))
  if (isParent(newNode)) {
    newNode.children = newNode.children.map(x => map(x, fn))
  }
  return newNode
}
