import * as ROMAST from '@src/romast'
import { isParent, isSection, isHeadline, isTable, isTableRowGroup } from './is'
import { assert } from '@blackglory/errors'
import 'core-js/features/array/flat-map'

export function flatMap(
  node: ROMAST.Node
, fn: (node: ROMAST.Node) => ROMAST.Node[]
): ROMAST.Node[] {
  return flatMap(node, fn)

  function flatMap(
    node: ROMAST.Node
  , fn: (node: ROMAST.Node) => ROMAST.Node[]
  ): ROMAST.Node[] {
    const newNodes = fn(node)

    return newNodes.map(node => {
      if (isSection(node)) {
        const result = flatMap(node.headline, fn)
        assert(result.length === 1)

        const [newHeadline] = result
        assert(isHeadline(newHeadline))

        node = {
          ...node
        , headline: newHeadline
        } as ROMAST.Section
      }

      if (isTable(node) && node.header) {
        const result = flatMap(node.header, fn)
        assert(result.length === 1)

        const [newTableRowGroup] = result
        assert(isTableRowGroup(newTableRowGroup))

        node = {
          ...node
        , header: newTableRowGroup
        } as ROMAST.Table
      }

      if (isParent(node)) {
        node = {
          ...node
        , children: node.children.flatMap(x => flatMap(x, fn))
        } as ROMAST.Node & ROMAST.Parent
      }

      return node
    })
  }
}
