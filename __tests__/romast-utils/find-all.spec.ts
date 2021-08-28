import { findAll } from '@romast-utils/find-all'
import { isText } from '@romast-utils/is'
import { section, headline, paragraph, text } from '@romast-utils/builder'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'

describe('findAll', () => {
  it('is preorder', () => {
    const ast =
      section(1, headline([], [text('headline')]), [
        paragraph([
          text('text')
        ])
      ])

    const result: string[] = []
    toArray(findAll(ast, node => {
      result.push(node.type)
      return false
    }))

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
    toArray(findAll(ast, node => {
      if (isText(node)) result.push(node.value)
      return false
    }))

    expect(result).toEqual(['deep', 'shallow'])
  })

  describe('found', () => {
    it('yield found target', () => {
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

      const result = findAll(ast, isText)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toStrictEqual([
        text('deep')
      , text('shallow')
      ])
    })
  })
})
