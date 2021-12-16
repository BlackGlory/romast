import { addHelpers } from '@romast-utils/add-helpers'
import { removeHelpers } from '@romast-utils/remove-helpers'
import * as R from '@romast-utils/builder'

describe('removeHelpers', () => {
  test('root', () => {
    const ast = addHelpers(
      R.document([
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
    )

    const result = removeHelpers(ast)

    expect(result).toStrictEqual(
      R.document([
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
    )
  })

  test('section.headline', () => {
    const ast = addHelpers(
      R.document([
        R.section(1, R.headline([], []), [])
      ])
    )

    const result = removeHelpers(ast)

    expect(result).toStrictEqual(
      R.document([
        R.section(1, R.headline([], []), [])
      ])
    )
  })
})
