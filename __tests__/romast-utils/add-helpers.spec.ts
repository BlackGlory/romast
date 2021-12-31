import { addHelpersInPlace } from '@romast-utils/add-helpers'
import * as R from '@romast-utils/builder'

describe('addHelpers', () => {
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

    const result = addHelpersInPlace(ast)

    expect(result).toMatchObject({
      type: 'document'
    , id: expect.any(String)
    , index: null
    , parent: null
    , previousSibling: null
    , nextSibling: null
    , children: [
        {
          type: 'paragraph'
        , id: expect.any(String)
        , index: 0
        , previousSibling: null
        , children: [
            {
              type: 'text'
            , id: expect.any(String)
            , index: 0
            , value: 'first'
            , previousSibling: null
            , nextSibling: null
            }
          ]
        }
      , {
          type: 'paragraph'
        , id: expect.any(String)
        , index: 1
        , children: [
            {
              type: 'text'
            , id: expect.any(String)
            , index: 0
            , value: 'middle'
            , previousSibling: null
            , nextSibling: null
            }
          ]
        }
      , {
          type: 'paragraph'
        , id: expect.any(String)
        , index: 2
        , nextSibling: null
        , children: [
            {
              type: 'text'
            , id: expect.any(String)
            , index: 0
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

    const result = addHelpersInPlace(ast)

    expect(result).toMatchObject({
      type: 'document'
    , id: expect.any(String)
    , parent: null
    , index: null
    , previousSibling: null
    , nextSibling: null
    , children: [
        {
          type: 'section'
        , id: expect.any(String)
        , index: 0
        , previousSibling: null
        , nextSibling: null
        , headline: {
            type: 'headline'
          , id: expect.any(String)
          , index: null
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
