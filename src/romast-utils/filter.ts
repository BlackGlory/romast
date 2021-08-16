import { flatMap } from './flat-map'
import * as ROMAST from './romast-1.0'

export function filter(
  node: ROMAST.Node
, predicate: (node: ROMAST.Node) => unknown
): ROMAST.Node | undefined {
  const results = flatMap(node, node => {
    if (predicate(node)) {
      return [node]
    } else {
      return []
    }
  })

  if (results.length === 1) return results[0]
  return undefined
}
