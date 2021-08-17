import { transformDocument } from '@src/transform-oast-to-romast/transform'
import * as O from '@oast-utils/builder'
import * as R from '@romast-utils/builder'

describe('OAST.Document', () => {
  it('return ROMAST.Document', () => {
    const oast = O.document({}, [])

    const result = transformDocument(oast)

    expect(result).toStrictEqual(R.document([]))
  })
})

describe('OAST.Section, OAST.Headline, OAST.Stars, OAST.Tags', () => {
  it('return ROMAST.Section', () => {
    const oast = O.document({}, [
      O.section(1, {}, [
        O.headline(1, true, 'content', [
          O.stars(1)
        , O.plain('value')
        , O.tags(['tag1', 'tag2'])
        ], { tags: ['tag1', 'tag2'] })
      ])
    ])

    const result = transformDocument(oast)

    expect(result).toStrictEqual(R.document([
      R.section(1,R.headline(1, ['tag1', 'tag2'], [R.text('value')]), [])
    ]))
  })
})

describe('OAST.Footnote', () => {
  it('return undefined', () => {
    const oast = O.document({}, [
      O.footnote('label', [])
    ])

    const result = transformDocument(oast)

    expect(result).toStrictEqual(R.document([]))
  })
})

describe('OAST.FootnoteReference', () => {
  describe('footnote reference', () => {
    it('return ROMAST.Footnote', () => {
      const oast = O.document({}, [
        O.paragraph({}, [
          O.footnoteReference('label', [])
        ])
      , O.footnote('label', [
          O.paragraph({}, [
            O.plain('footnote')
          ])
        ])
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([
        R.paragraph([
          R.footnote([
            R.paragraph([
              R.text('footnote')
            ])
          ])
        ])
      ]))
    })
  })

  describe('inline footnote', () => {
    it('return ROMAST.InlineFootnote', () => {
      const oast = O.document({}, [
        O.paragraph({}, [
          O.footnoteReference('label', [
            O.plain('footnote')
          ])
        ])
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([
        R.paragraph([
          R.inlineFootnote([
            R.text('footnote')
          ])
        ])
      ]))
    })
  })
})

describe('OAST.Block', () => {
  describe('name = QUOTE', () => {
    it('return ROMAST.Quote', () => {
      const oast = O.document({}, [
        O.block('QUOTE', [], 'value', {})
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([
        R.quote('value')
      ]))
    })
  })

  describe('name = quote', () => {
    it('return ROMAST.Quote', () => {
      const oast = O.document({}, [
        O.block('quote', [], 'value', {})
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([
        R.quote('value')
      ]))
    })
  })

  describe('name = SRC' ,() => {
    it('return ROMAST.Source', () => {
      const oast = O.document({}, [
        O.block('SRC', [], 'value', {})
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([
        R.source([], 'value')
      ]))
    })
  })

  describe('name = src' ,() => {
    it('return ROMAST.Source', () => {
      const oast = O.document({}, [
        O.block('src', [], 'value', {})
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([
        R.source([], 'value')
      ]))
    })
  })

  describe('name = EXAMPLE', () => {
    it('return ROMAST.Example', () => {
      const oast = O.document({}, [
        O.block('EXAMPLE', [], 'value', {})
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([
        R.example([], 'value')
      ]))
    })
  })

  describe('name = example', () => {
    it('return ROMAST.Example', () => {
      const oast = O.document({}, [
        O.block('example', [], 'value', {})
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([
        R.example([], 'value')
      ]))
    })
  })

  describe('other name', () => {
    it('return undefined', () => {
      const oast = O.document({}, [
        O.block('COMMENT', [], 'value', {})
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([]))
    })
  })
})

describe('OAST.Drawer', () => {
  it('return ROMAST.Drawer', () => {
    const oast = O.document({}, [
      O.drawer('name', 'value')
    ])

    const result = transformDocument(oast)

    expect(result).toStrictEqual(R.document([
      R.drawer('name', 'value')
    ]))
  })
})

describe('OAST.Planning', () => {
  it('return undefined', () => {
    const oast = O.document({}, [
      O.footnote('label', [])
    ])

    const result = transformDocument(oast)

    expect(result).toStrictEqual(R.document([]))
  })
})

describe('OAST.List, OAST.ListItem, OAST.ListItemBullet, OAST.ListItemCheckbox', () => {
  it('return ROMAST.List, ROMAST.ListItem', () => {
    const oast = O.document({}, [
      O.list(0, true, {}, [
        O.listItem(0, [
          O.listItemBullet(0, false)
        , O.listItemCheckbox(true)
        , O.plain('value')
        ], { tag: 'term' })
      ])
    ])

    const result = transformDocument(oast)

    expect(result).toStrictEqual(R.document([
      R.list(0, true, [
        R.listItem(0, [R.text('value')], { term: 'term', checked: true })
      ])
    ]))
  })
})

describe('OAST.Table, OAST.TableRow, OAST.TableRule, OAST.TableCell', () => {
  it('return ROMAST.Table', () => {
    const oast = O.document({}, [
      O.table({}, [
        O.tableRow([
          O.tableCell([O.plain('header')])
        ])
      , O.tableRule()
      , O.tableRow([
          O.tableCell([O.plain('body')])
        ])
      ])
    ])

    const result = transformDocument(oast)

    expect(result).toStrictEqual(R.document([
      R.table([
        R.tableRow([
          R.tableCell([R.text('header')])
        ])
      , R.tableHorizontalRule()
      , R.tableRow([
          R.tableCell([R.text('body')])
        ])
      ])
    ]))
  })
})

describe('OAST.Pargraph', () => {
  it('return ROMAST.Paragraph', () => {
    const oast = O.document({}, [
      O.paragraph({}, [])
    ])

    const result = transformDocument(oast)

    expect(result).toStrictEqual(R.document([
      R.paragraph([])
    ]))
  })
})

describe('OAST.HorizontalRule', () => {
  it('return ROMAST.HorizontalRule', () => {
    const oast = O.document({}, [
      O.horizontalRule()
    ])

    const result = transformDocument(oast)

    expect(result).toStrictEqual(R.document([
      R.horizontalRule()
    ]))
  })
})

describe('OAST.Newline', () => {
  it('return undefined', () => {
    const oast = O.document({}, [
      O.paragraph({}, [
        O.newline()
      ])
    ])

    const result = transformDocument(oast)

    expect(result).toStrictEqual(R.document([
      R.paragraph([])
    ]))
  })
})

describe('OAST.StyledText', () => {
  describe('type = text.plain', () => {
    it('return ROMAST.Text', () => {
      const oast = O.document({}, [
        O.paragraph({}, [
          O.plain('value')
        ])
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([
        R.paragraph([
          R.text('value')
        ])
      ]))
    })
  })

  describe('type = text.bold', () => {
    it('return ROMAST.Bold', () => {
      const oast = O.document({}, [
        O.paragraph({}, [
          O.bold('value')
        ])
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([
        R.paragraph([
          R.bold('value')
        ])
      ]))
    })
  })

  describe('type = text.verbatim', () => {
    it('return ROMAST.Verbatim', () => {
      const oast = O.document({}, [
        O.paragraph({}, [
          O.verbatim('value')
        ])
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([
        R.paragraph([
          R.verbatim('value')
        ])
      ]))
    })
  })

  describe('type = text.italic', () => {
    it('return ROMAST.Italic', () => {
      const oast = O.document({}, [
        O.paragraph({}, [
          O.italic('value')
        ])
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([
        R.paragraph([
          R.italic('value')
        ])
      ]))
    })
  })

  describe('type = text.strikeThrough', () => {
    it('return ROMAST.Strikethrough', () => {
      const oast = O.document({}, [
        O.paragraph({}, [
          O.strikeThrough('value')
        ])
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([
        R.paragraph([
          R.strikethrough('value')
        ])
      ]))
    })
  })

  describe('type = text.underline', () => {
    it('return ROMAST.Underlined', () => {
      const oast = O.document({}, [
        O.paragraph({}, [
          O.underline('value')
        ])
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([
        R.paragraph([
          R.underlined('value')
        ])
      ]))
    })
  })

  describe('type = text.code', () => {
    it('return ROMAST.Code', () => {
      const oast = O.document({}, [
        O.paragraph({}, [
          O.code('value')
        ])
      ])

      const result = transformDocument(oast)

      expect(result).toStrictEqual(R.document([
        R.paragraph([
          R.code('value')
        ])
      ]))
    })
  })
})

describe('OAST.Link', () => {
  it('return ROMAST.Link', () => {
    const oast = O.document({}, [
      O.paragraph({}, [
        O.link('https', 'description', 'value')
      ])
    ])

    const result = transformDocument(oast)

    expect(result).toStrictEqual(R.document([
      R.paragraph([
        R.link('https', 'description', 'value')
      ])
    ]))
  })
})

describe('OAST.Todo', () => {
  it('return undefined', () => {
    const oast = O.document({}, [
      O.section(1, {}, [
        O.headline(1, true, 'content', [
          O.stars(1)
        , O.todo('TODO', true)
        , O.plain('value')
        ])
      ])
    ])

    const result = transformDocument(oast)

    expect(result).toStrictEqual(R.document([
      R.section(1, R.headline(1, [], [
        R.text('value')
      ]), [])
    ]))
  })
})

describe('OAST.Priority', () => {
  it('return undefined', () => {
    const oast = O.document({}, [
      O.section(1, {}, [
        O.headline(1, true, 'content', [
          O.stars(1)
        , O.todo('TODO', true)
        , O.priority('[#A]')
        , O.plain('value')
        ])
      ])
    ])

    const result = transformDocument(oast)

    expect(result).toStrictEqual(R.document([
      R.section(1, R.headline(1, [], [
        R.text('value')
      ]), [])
    ]))
  })
})
