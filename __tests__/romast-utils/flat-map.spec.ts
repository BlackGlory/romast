import { flatMap } from '@romast-utils/flat-map.js'
import { isText } from '@romast-utils/is.js'
import { section, headline, paragraph, bold, text } from '@romast-utils/builder.js'

describe('flatMap', () => {
  it('is preorder', () => {
    const ast =
      section(1, headline([], [text('headline')]), [
        paragraph([
          text('text')
        ])
      ])

    const result: string[] = []
    flatMap(ast, node => {
      result.push(node.type)
      return [node]
    })

    expect(result).toEqual(['section', 'headline', 'text', 'paragraph', 'text'])
  })

  it('is DFS', () => {
    const ast =
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

    const result: string[] = []
    flatMap(ast, node => {
      if (isText(node)) result.push(node.value)
      return [node]
    })

    expect(result).toEqual(['deep', 'shallow'])
  })

  it('create a new tree', () => {
    const ast =
      paragraph([
        text('text')
      ])

    const result = flatMap(ast, node => {
      if (isText(node)) return [bold('bold')]
      return [node]
    })

    expect(result).toStrictEqual([
      paragraph([
        bold('bold')
      ])
    ])
  })
})
