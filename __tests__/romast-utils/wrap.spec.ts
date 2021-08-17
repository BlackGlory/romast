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
    , id: expect.any(String)
    , parent: null
    , previousSibling: null
    , nextSibling: null
    , children: [
        {
          type: 'paragraph'
        , id: expect.any(String)
        , previousSibling: null
        , children: [
            {
              type: 'text'
            , id: expect.any(String)
            , value: 'first'
            , previousSibling: null
            , nextSibling: null
            }
          ]
        }
      , {
          type: 'paragraph'
        , id: expect.any(String)
        , children: [
            {
              type: 'text'
            , id: expect.any(String)
            , value: 'middle'
            , previousSibling: null
            , nextSibling: null
            }
          ]
        }
      , {
          type: 'paragraph'
        , id: expect.any(String)
        , nextSibling: null
        , children: [
            {
              type: 'text'
            , id: expect.any(String)
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
    , id: expect.any(String)
    , parent: null
    , previousSibling: null
    , nextSibling: null
    , children: [
        {
          type: 'section'
        , id: expect.any(String)
        , previousSibling: null
        , nextSibling: null
        , headline: {
            type: 'headline'
          , id: expect.any(String)
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
