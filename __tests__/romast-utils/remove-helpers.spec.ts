import { addHelpersInPlace } from '@romast-utils/add-helpers.js'
import { removeHelpersInPlace } from '@romast-utils/remove-helpers.js'
import * as R from '@romast-utils/builder.js'

describe('removeHelpers', () => {
  test('root', () => {
    const ast = addHelpersInPlace(
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

    const result = removeHelpersInPlace(ast)

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
    const ast = addHelpersInPlace(
      R.document([
        R.section(1, R.headline([], []), [])
      ])
    )

    const result = removeHelpersInPlace(ast)

    expect(result).toStrictEqual(
      R.document([
        R.section(1, R.headline([], []), [])
      ])
    )
  })
})
