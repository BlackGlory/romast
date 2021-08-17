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
      R.section(1, R.headline(1, [], [R.text('Romast')]), [])
    ])
  )
})
