import { wrap } from '@romast-utils/wrap'
import { unwrap } from '@romast-utils/unwrap'
import * as R from '@romast-utils/builder'

describe('unwrap', () => {
  test('root', () => {
    const ast = wrap(
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

    const result = unwrap(ast)

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
    const ast = wrap(
      R.document([
        R.section(0, R.headline(0, [], []), [])
      ])
    )

    const result = unwrap(ast)

    expect(result).toStrictEqual(
      R.document([
        R.section(0, R.headline(0, [], []), [])
      ])
    )
  })
})
