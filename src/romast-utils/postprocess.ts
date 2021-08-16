import * as ROMAST from './romast-1.0'
import { filter } from './filter'
import { map } from './map'
import { isParent, isParagraph, isText } from './is'
import { text } from './builder'

export function removeEmptyParagraph(document: ROMAST.Document): ROMAST.Document {
  return filter(
    document
  , node => !(isParagraph(node) && node.children.length === 0)
  ) as ROMAST.Document
}

export function concatContinuousText(document: ROMAST.Document): ROMAST.Document {
  return map(
    document
  , node => {
      if (isParent(node)) {
        const newChildren: ROMAST.Node[] = node.children.reduce(
          (acc: ROMAST.Node[], cur: ROMAST.Node) => {
            const lastNode = last(acc)
            if (lastNode && isText(cur) && isText(lastNode)) {
              const newText = text(lastNode.value + cur.value)
              return [...acc.slice(0, -1), newText]
            } else {
              return [...acc, cur]
            }
          }
        , []
        )
        return { ...node, children: newChildren }
      }
      return node
    }
  ) as ROMAST.Document
}

function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1]
}
