import { parse } from '@src/parse'
import { dedent } from 'extra-tags'
import * as R from '@romast-utils/builder'

test('Section', () => {
  const org = dedent`
  * Romast
  `

  const result = parse(org)

  expect(result).toStrictEqual(
    R.document([
      R.section(1, R.headline([], [R.text('Romast')]), [])
    ])
  )
})

test('incorrect section level', () => {
  const org = dedent`
  *** level1
  ***** level2
  `

  const result = parse(org)

  expect(result).toStrictEqual(
    R.document([
      R.section(1, R.headline([], [R.text('level1')]), [
        R.section(2, R.headline([], [R.text('level2')]), [])
      ])
    ])
  )
})
