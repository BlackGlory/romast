import * as ROMAST from '@src/romast.js'
import { isParent, isSection, isHeadline, isTable, isTableRowGroup } from './is.js'
import { assert } from '@blackglory/errors'

export function map(
  node: ROMAST.Node
, fn: (node: ROMAST.Node) => ROMAST.Node
): ROMAST.Node {
  return map(node, fn)

  function map(
    node: ROMAST.Node
  , fn: (node: ROMAST.Node) => ROMAST.Node
  ): ROMAST.Node {
    let newNode = fn(node)

    if (isSection(newNode)) {
      const newHeadline = map(newNode.headline, fn)
      assert(isHeadline(newHeadline), 'section.headline must be headline')

      newNode = {
        ...newNode
      , headline: newHeadline
      } as ROMAST.Section
    }

    if (isTable(newNode) && newNode.header) {
      const newTableRowGroup = map(newNode.header, fn)
      assert(isTableRowGroup(newTableRowGroup), 'table.header must be tableRowGroup')

      newNode = {
        ...newNode
      , header: newTableRowGroup
      } as ROMAST.Table
    }

    if (isParent(newNode)) {
      newNode = {
        ...newNode
      , children: newNode.children.map(x => map(x, fn))
      } as ROMAST.Node & ROMAST.Parent
    }

    return newNode
  }
}
