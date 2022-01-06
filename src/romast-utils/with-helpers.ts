import * as AST from '@src/romast.js'
import { addHelpers, addHelpersInPlace, NodeWithHelpers } from './add-helpers.js'
import { removeHelpersInPlace } from './remove-helpers.js'
export { NodeWithHelpers } from './add-helpers.js'

export function withHelpers<T extends AST.Node, U>(
  node: T
, fn: (node: NodeWithHelpers<T>) => U
): U {
  return fn(addHelpers(node))
}

export function withHelpersInPlace<T extends AST.Node, U>(
  node: T
, handler: (node: NodeWithHelpers<T>) => U
): U {
  const nodeWithHelpers = addHelpersInPlace(node)
  try {
    return handler(nodeWithHelpers)
  } finally {
    removeHelpersInPlace(nodeWithHelpers)
  }
}
