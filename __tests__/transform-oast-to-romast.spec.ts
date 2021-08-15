import { transform } from '@src/transform-oast-to-romast'
import * as O from '@src/oast-utils/builder'
import * as R from '@src/romast-utils/builder'

describe('OAST.Document', () => {
  it('return ROMAST.Document', () => {
    const oast = O.document({}, [])

    const result = transform(oast)

    expect(result).toStrictEqual(R.document([]))
  })
})

describe('OAST.Section', () => {
  it('return ROMAST.Section', () => {
    const oast = O.document({}, [
      O.section(1, {}, [])
    ])

    const result = transform(oast)

    expect(result).toStrictEqual(R.document([
      R.section(1, [])
    ]))
  })
})

describe('OAST.Footnote', () => {
  it('return undefined', () => {
    const oast = O.document({}, [
      O.footnote('label', [])
    ])

    const result = transform(oast)

    expect(result).toStrictEqual(R.document([]))
  })
})

describe('OAST.Block', () => {
  describe('name = QUOTE', () => {
    it('return ROMAST.Quote', () => {
      const oast = O.document({}, [
        O.block('QUOTE', [], 'value', {})
      ])

      const result = transform(oast)

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

      const result = transform(oast)

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

      const result = transform(oast)

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

      const result = transform(oast)

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

      const result = transform(oast)

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

      const result = transform(oast)

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

      const result = transform(oast)

      expect(result).toStrictEqual(R.document([]))
    })
  })
})

describe('OAST.Drawer', () => {
  it('return ROMAST.Drawer', () => {
    const oast = O.document({}, [
      O.drawer('name', 'value')
    ])

    const result = transform(oast)

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

    const result = transform(oast)

    expect(result).toStrictEqual(R.document([]))
  })
})

describe('OAST.List, OAST.ListItem', () => {
  it('return ROMAST.List, ROMAST.ListItem', () => {
    const oast = O.document({}, [
      O.list(1, true, {}, [
        O.listItem(1, [])
      ])
    ])

    const result = transform(oast)

    expect(result).toStrictEqual(R.document([
      R.list(1, true, [
        R.listItem(1, [])
      ])
    ]))
  })
})

describe('OAST.Table, OAST.TableRow, OAST.TableCell', () => {
  it('return ROMAST.Table', () => {
    const oast = O.document({}, [
      O.table({}, [
        O.tableRow([
          O.tableCell([])
        ])
      ])
    ])

    const result = transform(oast)

    expect(result).toStrictEqual(R.document([
      R.table([
        R.tableRow([
          R.tableCell([])
        ])
      ])
    ]))
  })
})

describe('OAST.Headline', () => {
  it('return ROMAST.Headline', () => {
    const oast = O.document({}, [
      O.headline(1, true, 'content', [])
    ])

    const result = transform(oast)

    expect(result).toStrictEqual(R.document([
      R.headline(1, [])
    ]))
  })
})

describe('OAST.Pargraph', () => {
  it('return ROMAST.Paragraph', () => {
    const oast = O.document({}, [
      O.paragraph({}, [])
    ])

    const result = transform(oast)

    expect(result).toStrictEqual(R.document([
      R.paragraph([])
    ]))
  })
})

describe('OAST.HTML', () => {
  it('return undefined', () => {
    const oast = O.document({}, [
      O.HTML('value')
    ])

    const result = transform(oast)

    expect(result).toStrictEqual(R.document([]))
  })
})

describe('OAST.HorizontalRule', () => {
  it('return ROMAST.HorizontalRule', () => {
    const oast = O.document({}, [
      O.horizontalRule()
    ])

    const result = transform(oast)

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

    const result = transform(oast)

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

      const result = transform(oast)

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

      const result = transform(oast)

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

      const result = transform(oast)

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

      const result = transform(oast)

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

      const result = transform(oast)

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

      const result = transform(oast)

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

      const result = transform(oast)

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

    const result = transform(oast)

    expect(result).toStrictEqual(R.document([
      R.paragraph([
        R.link('https', 'description', 'value')
      ])
    ]))
  })
})

describe('OAST.FootnoteReference', () => {
  it('return ROMAST.Footnote', () => {
    // TODO
  })
})

describe('OAST.FootnoteInlineBegin', () => {
  // TODO
})

describe('OAST.FootnoteReferenceEnd', () => {
  // TODO
})

describe('OAST.Stars', () => {
  it('return undefined', () => {
    const oast = O.document({}, [
      O.headline(1, true, 'content', [
        O.stars(1)
      ])
    ])

    const result = transform(oast)

    expect(result).toStrictEqual(R.document([
      R.headline(1, [])
    ]))
  })
})

describe('OAST.Todo', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.Priority', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.Tags', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.BlockBegin', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.BlockEnd', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.DrawerBegin', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.DrawerEnd', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.Comment', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.Keyword', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.FootnoteLabel', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.PlanningKeyword', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.PlanningTimestamp', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.ListItemTag', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.ListItemCheckbox', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.ListItemBullet', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.TableRule', () => {
  it('return undefined', () => {
    // TODO
  })
})

describe('OAST.TableColumnSeparator', () => {
  it('return undefined', () => {
    // TODO
  })
})
