import * as ROMAST from '@src/romast.js'
import { isParent, isSection, isHeadline, isTable, isTableRowGroup } from './is.js'
import { assert } from '@blackglory/errors'
import { flatten, map, toArray } from 'iterable-operator'

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
        assert(result.length === 1, 'section.headline must be only one')

        const [newHeadline] = result
        assert(isHeadline(newHeadline), 'section.headline must be headline')

        node = {
          ...node
        , headline: newHeadline
        } as ROMAST.Section
      }

      if (isTable(node) && node.header) {
        const result = flatMap(node.header, fn)
        assert(result.length === 1, 'table.header must be only one')

        const [newTableRowGroup] = result
        assert(isTableRowGroup(newTableRowGroup), 'table.header must be tableRowGroup')

        node = {
          ...node
        , header: newTableRowGroup
        } as ROMAST.Table
      }

      if (isParent(node)) {
        node = {
          ...node
        , children: toArray(flatten(map(node.children, x => flatMap(x, fn))))
        } as ROMAST.Node & ROMAST.Parent
      }

      return node
    })
  }
}
