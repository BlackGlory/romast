import * as ROMAST from '@src/romast-1.0'
import { filter } from '@romast-utils/filter'
import { map } from '@romast-utils/map'
import { isParent, isSection, isParagraph, isText } from '@romast-utils/is'
import { wrap, WrappedNode } from '@romast-utils/wrap'
import { unwrap } from '@romast-utils/unwrap'
import { text } from '@romast-utils/builder'

export function postprocess(document: ROMAST.Document): ROMAST.Document {
  return (
    correctSectionLevel(
      removeEmptyParagraph(
        concatContinuousText(document)
      )
    )
  )
}

function removeEmptyParagraph(document: ROMAST.Document): ROMAST.Document {
  return filter(
    document
  , node => !(isParagraph(node) && node.children.length === 0)
  ) as ROMAST.Document
}

function concatContinuousText(document: ROMAST.Document): ROMAST.Document {
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

function correctSectionLevel(document: ROMAST.Document): ROMAST.Document {
  const wrappedDocument = wrap(document)
  const newDocument = map(
    wrappedDocument
  , node => {
      if (isSection(node)) {
        let sectionCount = 0
        let current: WrappedNode<ROMAST.Node> = node as WrappedNode<ROMAST.Section>
        while (true) {
          if (isSection(current)) {
            sectionCount++
          }

          if (current.parent) {
            current = current.parent
          } else {
            break
          }
        }
        node.level = sectionCount
      }
      return node
    }
  ) as WrappedNode<ROMAST.Document>
  return unwrap(newDocument)
}

function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1]
}
