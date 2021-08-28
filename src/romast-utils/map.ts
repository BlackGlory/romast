import * as ROMAST from '@src/romast'
import { isParent, isSection, isHeadline, isTable, isTableRowGroup } from './is'
import { assert } from '@blackglory/errors'
import cloneDeep from 'lodash.clonedeep'

export function map(
  node: ROMAST.Node
, fn: (node: ROMAST.Node) => ROMAST.Node
): ROMAST.Node {
  return map(cloneDeep(node), fn)

  function map(
    node: ROMAST.Node
  , fn: (node: ROMAST.Node) => ROMAST.Node
  ): ROMAST.Node {
    const newNode = fn(node)

    if (isSection(newNode)) {
      const newHeadline = map(newNode.headline, fn)
      assert(isHeadline(newHeadline))

      newNode.headline = newHeadline
    }

    if (isTable(newNode) && newNode.header) {
      const newTableRowGroup = map(newNode.header, fn)
      assert(isTableRowGroup(newTableRowGroup))

      newNode.header = newTableRowGroup
    }

    if (isParent(newNode)) {
      newNode.children = newNode.children.map(x => map(x, fn))
    }

    return newNode
  }
}
