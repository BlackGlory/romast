import { parse } from '@src/parse.js'
import { dedent } from 'extra-tags'
import * as R from '@romast-utils/builder.js'

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

describe('CRLF', () => {
  test('section', () => {
    const org = dedent`
    * Section1\r
    ** Section2
    `

    const result = parse(org)

    expect(result).toStrictEqual(
      R.document([
        R.section(1, R.headline([], [R.text('Section1')]), [
          R.section(2, R.headline([], [R.text('Section2')]), [])
        ])
      ])
    )
  })

  test('list', () => {
    const org = dedent`
    - line1\r
      \r
    text
    `

    const result = parse(org)

    expect(result).toStrictEqual(
      R.document([
        R.list(0, false, [
          R.listItem(0, [
            R.text('line1')
          ])
        ])
      , R.paragraph([
          R.text('text')
        ])
      ])
    )
  })
})

test('empty lines', () => {
  const org = dedent`
  Hello


  World

  * Section
  Hello


  World
  `

  const result = parse(org)

  expect(result).toStrictEqual(
    R.document([
      R.paragraph([
        R.text('Hello')
      ])
    , R.paragraph([
        R.text('World')
      ])
    , R.section(1, R.headline([], [R.text('Section')]), [
        R.paragraph([
          R.text('Hello')
        ])
      , R.paragraph([
          R.text('World')
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

test('local image', () => {
  const org = dedent`
  [[./image.png][image]]
  `

  const result = parse(org)

  expect(result).toStrictEqual(
    R.document([
      R.paragraph([
        R.link('file', './image.png', [
          R.text('image')
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

test('footnote', () => {
  const org = dedent`
  text[fn:footnote]

  [fn:footnote]
  Hello

  World
  `

  const result = parse(org)

  expect(result).toStrictEqual(
    R.document([
      R.paragraph([
        R.text('text')
      , R.footnote([
          R.paragraph([
            R.text('Hello')
          ])
        , R.paragraph([
            R.text('World')
          ])
        ])
      ])
    ])
  )
})
