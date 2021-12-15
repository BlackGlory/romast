import * as ROMAST from '@src/romast'
import { filter } from '@romast-utils/filter'
import { map } from '@romast-utils/map'
import { isParent, isSection, isParagraph, isText, isNewline, isTable, isLink }
  from '@romast-utils/is'
import { wrap, WrappedNode } from '@romast-utils/wrap'
import { unwrap } from '@romast-utils/unwrap'
import { text } from '@romast-utils/builder'
import cloneDeep from 'lodash.clonedeep'
import dropWhile from 'lodash.dropwhile'
import dropRightWhile from 'lodash.droprightwhile'

export function postprocess(document: ROMAST.Document): ROMAST.Document {
  return (
    correctSectionLevel(
      addTextNodesForPlainURLLinks(
        removeEmptyParagraph(
          trimNewlines(
            mergeContinuousNewline(
              concatContinuousText(document)
            )
          )
        )
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

function addTextNodesForPlainURLLinks(document: ROMAST.Document): ROMAST.Document {
  return map(
    document
  , node => {
      if (isLink(node) && node.children.length === 0) {
        return {
          ...node
        , children: [text(node.url)]
        }
      }
      return node
    }
  ) as ROMAST.Document
}

function trimNewlines<T extends ROMAST.Node & ROMAST.Parent>(node: T): T {
  return map(
    node
  , node => {
      const newNode = cloneDeep(node)
      if (isParent(newNode)) {
        newNode.children = dropWhile(newNode.children, isNewline)
        newNode.children = dropRightWhile(newNode.children, isNewline)
      }
      return newNode
    }
  ) as T
}

function concatContinuousText(document: ROMAST.Document): ROMAST.Document {
  return map(
    document
  , node => {
      if (isParent(node)) {
        const newChildren: ROMAST.Node[] = node.children.reduce(
          (acc: ROMAST.Node[], cur: ROMAST.Node) => {
            const lastNode = last(acc)
            if (lastNode && isText(lastNode) && isText(cur)) {
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

function mergeContinuousNewline(document: ROMAST.Document): ROMAST.Document {
  return map(
    document
  , node => {
      if (isParent(node)) {
        const newChildren: ROMAST.Node[] = node.children.reduce(
          (acc: ROMAST.Node[], cur: ROMAST.Node) => {
            const lastNode = last(acc)
            if (lastNode && isNewline(lastNode) && isNewline(cur)) {
              return acc
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
        return { ...node, level: sectionCount }
      }
      return node
    }
  ) as WrappedNode<ROMAST.Document>
  return unwrap(newDocument)
}

function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1]
}
