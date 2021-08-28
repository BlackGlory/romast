import { parse } from '@src/parse'
import { dedent } from 'extra-tags'
import * as R from '@romast-utils/builder'

test('section', () => {
  const org = dedent`
  * Romast
  Lorem ipsum dolor sit amet,
  consectetur adipiscing elit,
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

  Duis aute irure dolor in reprehenderit in voluptate
  velit esse cillum dolore eu fugiat nulla pariatur.
  `

  const result = parse(org)

  expect(result).toStrictEqual(
    R.document([
      R.section(1, R.headline([], [R.text('Romast')]), [
        R.paragraph([
          R.text('Lorem ipsum dolor sit amet,')
        , R.newline()
        , R.text('consectetur adipiscing elit,')
        , R.newline()
        , R.text('sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
        ])
      , R.paragraph([
          R.text('Duis aute irure dolor in reprehenderit in voluptate')
        , R.newline()
        , R.text('velit esse cillum dolore eu fugiat nulla pariatur.')
        ])
      ])
    ])
  )
})

test('plain url link', () => {
  const org = dedent`
  [[https://example.com]]
  `

  const result = parse(org)

  expect(result).toStrictEqual(
    R.document([
      R.paragraph([
        R.link('https', 'https://example.com', [
          R.text('https://example.com')
        ])
      ])
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
