import * as ROMAST from '@src/romast'
import { filter } from '@romast-utils/filter'
import { map } from '@romast-utils/map'
import { isParent, isSection, isParagraph, isText, isNewline, isLink }
  from '@romast-utils/is'
import { addHelpersInPlace, NodeWithHelpers } from '@romast-utils/add-helpers'
import { removeHelpersInPlace } from '@romast-utils/remove-helpers'
import { text } from '@romast-utils/builder'
import dropWhile from 'lodash/dropWhile'
import dropRightWhile from 'lodash/dropRightWhile'
import { pipe } from 'extra-utils'

export function postprocess(document: ROMAST.Document): ROMAST.Document {
  return pipe(
    document
  , concatContinuousText
  , mergeContinuousNewline
  , trimNewlines
  , removeEmptyParagraph
  , addTextNodesForPlainURLLinks
  , correctSectionLevel
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
      if (isParent(node)) {
        return {
          ...node
        , children: dropRightWhile(dropWhile(node.children, isNewline), isNewline)
        }
      }
      return node
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
  const addHelperspedDocument = addHelpersInPlace(document)
  const newDocument = map(
    addHelperspedDocument
  , node => {
      if (isSection(node)) {
        let sectionCount = 0
        let current: NodeWithHelpers<ROMAST.Node> = node as NodeWithHelpers<ROMAST.Section>
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
  ) as NodeWithHelpers<ROMAST.Document>
  return removeHelpersInPlace(newDocument)
}

function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1]
}
