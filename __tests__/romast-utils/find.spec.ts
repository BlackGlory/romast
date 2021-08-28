import { find } from '@romast-utils/find'
import { isText, isBold } from '@romast-utils/is'
import { section, headline, paragraph, text } from '@romast-utils/builder'

describe('find', () => {
  it('is preorder', () => {
    const ast =
      section(1, headline([], [text('headline')]), [
        paragraph([
          text('text')
        ])
      ])

    const result: string[] = []
    find(ast, node => {
      result.push(node.type)
      return false
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
    find(ast, node => {
      if (isText(node)) result.push(node.value)
      return false
    })

    expect(result).toEqual(['deep', 'shallow'])
  })

  describe('found', () => {
    it('return found target', () => {
      const ast =
        section(1, headline([], []), [
          section(1, headline([], []), [
            paragraph([
              text('text')
            ])
          ])
        ])

      const result = find(ast, isText)

      expect(result).toStrictEqual(
        text('text')
      )
    })
  })

  describe('not found', () => {
    it('return undefined', () => {
      const ast =
        section(1, headline([], []), [
          section(1, headline([], []), [
            paragraph([
              text('text')
            ])
          ])
        ])

      const result = find(ast, isBold)

      expect(result).toBeUndefined()
    })
  })
})
