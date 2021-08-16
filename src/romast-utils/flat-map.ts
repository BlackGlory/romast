import * as ROMAST from './romast-1.0'
import { isParent } from './is'
import { produce, original } from 'immer'

// 无法用cloneDeep替换immer, 因为immer能够在调用fn时将原始的node作为参数传给调用者,
// 该特性对于像splitTitleBody这样的调用者特别有用, 因为这些调用者对节点的判断是基于引用相等性的.
export function flatMap(
  node: ROMAST.Node
, fn: (node: ROMAST.Node) => ROMAST.Node[]
): ROMAST.Node[] {
  const newNodes = fn(node)
  return newNodes.map(node => produce(node, node => {
    if (isParent(node)) {
      node.children = node.children.map(node => flatMap(original(node)!, fn)).flat()
    }
  }))
}
