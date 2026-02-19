import { filter } from '@romast-utils/filter.js'
import { isParagraph, isText } from '@romast-utils/is.js'
import { section, headline, paragraph, text } from '@romast-utils/builder.js'

describe('filter', () => {
  test('preorder', () => {
    const ast = (
      section(1, headline([], [text('headline')]), [
        paragraph([
          text('text')
        ])
      ])
    )

    const result: string[] = []
    filter(ast, node => {
      result.push(node.type)
      return true
    })

    expect(result).toEqual(['section', 'headline', 'text', 'paragraph', 'text'])
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
    filter(ast, node => {
      if (isText(node)) result.push(node.value)
      return true
    })

    expect(result).toEqual(['deep', 'shallow'])
  })

  test('create a new tree', () => {
    const ast = (
      section(1, headline([], []), [
        paragraph([
          text('foo')
        ])
      , paragraph([
          text('bar')
        ])
      ])
    )

    const result = filter(ast, node => {
      if (
        isParagraph(node) &&
        node.children.some(node => {
          return isText(node)
              && node.value === 'foo'
        })
      ) {
        return false
      }
      if (isText(node) && node.value === 'bar') return false
      return true
    })

    expect(result).toStrictEqual(
      section(1, headline([], []), [
        paragraph([])
      ])
    )
  })
})
