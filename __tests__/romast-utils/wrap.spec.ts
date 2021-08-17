import { wrap } from '@romast-utils/wrap'
import * as R from '@romast-utils/builder'

describe('wrap', () => {
  test('root', () => {
    const ast = R.document([
      R.paragraph([
        R.text('first')
      ])
    , R.paragraph([
        R.text('middle')
      ])
    , R.paragraph([
        R.text('last')
      ])
    ])

    const result = wrap(ast)

    expect(result).toMatchObject({
      type: 'document'
    , parent: null
    , previousSibling: null
    , nextSibling: null
    , children: [
        {
          type: 'paragraph'
        , previousSibling: null
        , children: [
            {
              type: 'text'
            , value: 'first'
            , previousSibling: null
            , nextSibling: null
            }
          ]
        }
      , {
          type: 'paragraph'
        , children: [
            {
              type: 'text'
            , value: 'middle'
            , previousSibling: null
            , nextSibling: null
            }
          ]
        }
      , {
          type: 'paragraph'
        , nextSibling: null
        , children: [
            {
              type: 'text'
            , value: 'last'
            , previousSibling: null
            , nextSibling: null
            }
          ]
        }
      ]
    })
    expect(result.children[0].nextSibling).toBe(result.children[1])
    expect(result.children[0].parent).toBe(result)
    expect((result.children[0] as any).children[0].parent).toBe(result.children[0])
    expect(result.children[1].parent).toBe(result)
    expect(result.children[1].previousSibling).toBe(result.children[0])
    expect(result.children[1].nextSibling).toBe(result.children[2])
    expect((result.children[1] as any).children[0].parent).toBe(result.children[1])
    expect(result.children[2].parent).toBe(result)
    expect(result.children[2].previousSibling).toBe(result.children[1])
    expect((result.children[2] as any).children[0].parent).toBe(result.children[2])
  })

  test('section.headline', () => {
    const ast = R.document([
      R.section(0, R.headline([], []), [])
    ])

    const result = wrap(ast)

    expect(result).toMatchObject({
      type: 'document'
    , parent: null
    , previousSibling: null
    , nextSibling: null
    , children: [
        {
          type: 'section'
        , previousSibling: null
        , nextSibling: null
        , headline: {
            type: 'headline'
          , children: []
          , previousSibling: null
          , nextSibling: null
          }
        , children: []
        }
      ]
    })
    expect(result.children[0].parent).toBe(result)
    expect((result.children[0] as any).headline.parent).toBe(result.children[0])
  })
})
