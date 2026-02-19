import { traverseDescendantNodes } from '@romast-utils/traverse-descendant-nodes.js'
import { isText } from '@romast-utils/is.js'
import { section, headline, paragraph, text } from '@romast-utils/builder.js'

describe('traverseDescendantNodes', () => {
  test('preorder', () => {
    const ast = (
      section(1, headline([], [text('headline')]), [
        paragraph([
          text('text')
        ])
      ])
    )

    const result: string[] = []
    for (const node of traverseDescendantNodes(ast)) {
      result.push(node.type)
    }

    expect(result).toEqual(['headline', 'text', 'paragraph', 'text'])
  })

  test('DFS', () => {
    const ast = (
      section(1, headline([], []), [
        section(1, headline([], []), [
          paragraph([
            text('deep')
          ])
        ])
      , paragraph([
          text('shallow')
        ])
      ])
    )

    const result: string[] = []
    for (const node of traverseDescendantNodes(ast)) {
      if (isText(node)) result.push(node.value)
    }

    expect(result).toEqual(['deep', 'shallow'])
  })
})
