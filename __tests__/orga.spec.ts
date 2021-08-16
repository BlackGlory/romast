import { parse } from 'orga'
import { dedent } from 'extra-tags'
import { isObject } from '@blackglory/types'

test('export settings', () => {
  const text = dedent`
  #+TITLE: I'm in the Mood for Org
  `

  const result = removeAllAdditionalProps(parse(text))

  expect(result).toMatchObject({
    type: 'document'
  , properties: {
      title: `I'm in the Mood for Org`
    }
  , children: []
  })
})

test('comment', () => {
  const text = `
  # comment
  `

  const result = removeAllAdditionalProps(parse(text))

  expect(result).toMatchObject({
    type: 'document'
  , children: []
  })
})

describe('footnote', () => {
  test('footnote', () => {
    const text = dedent`
    The Org homepage[fn:LABEL] now looks a lot better than it used to.

    [fn:LABEL] The link is: http://orgmode.org
    `

    const result = removeAllAdditionalProps(parse(text))

    expect(result).toMatchObject({
      type: 'document'
    , children: [
        {
          type: 'paragraph'
        , children: [
            {
              type: 'text.plain'
            , value: 'The Org homepage'
            }
          , {
              type: 'footnote.reference'
            , label: 'LABEL'
            , children: []
            }
          , {
              type: 'text.plain'
            , value: ' now looks a lot better than it used to.'
            }
          ]
        }
      , {
          type: 'footnote'
        , label: 'LABEL'
        , children: [
            {
              type: 'paragraph'
            , children: [
                {
                  type: 'text.plain'
                , value: 'The link is: http://orgmode.org'
                }
              ]
            }
          ]
        }
      ]
    })
  })

  test('footnote with other nodes', () => {
    const text = dedent`
    * headline1
    footnote[fn:LABEL]

    [fn:LABEL] paragraph1

    paragraph2

    ** headline2
    section2

    * headline3
    section3
    `

    const result = removeAllAdditionalProps(parse(text))

    expect(result).toMatchObject({
      type: 'document'
    , children: [
        {
          type: 'section'
        , level: 1
        , children: [
            {
              type: 'headline'
            , level: 1
            , children: [
                {
                  type: 'stars'
                , level: 1
                }
              , {
                  type: 'text.plain'
                , value: 'headline1'
                }
              , { type: 'newline' }
              ]
            }
          , {
              type: 'paragraph'
            , children: [
                {
                  type: 'text.plain'
                , value: 'footnote'
                }
              , {
                  type: 'footnote.reference'
                , label: 'LABEL'
                , children: []
                }
              ]
            }
          ]
        }
      , {
          type: 'footnote'
        , label: 'LABEL'
        , children: [
            {
              type: 'paragraph'
            , children: [
                {
                  type: 'text.plain'
                , value: 'paragraph1'
                }
              ]
            }
          , {
              type: 'paragraph'
            , children: [
                {
                  type: 'text.plain'
                , value: 'paragraph2'
                }
              ]
            }
          ]
        }
      , {
          type: 'section'
        , level: 2
        , children: [
            {
              type: 'headline'
            , children: [
                {
                  type: 'stars'
                , level: 2
                }
              , {
                  type: 'text.plain'
                , value: 'headline2'
                }
              , {
                  type: 'newline'
                }
              ]
            }
          , {
              type: 'paragraph'
            , children: [
                {
                  type: 'text.plain'
                , value: 'section2'
                }
              ]
            }
          ]
        }
      , {
          type: 'section'
        , level: 1
        , children: [
            {
              type: 'headline'
            , level: 1
            , children: [
                {
                  type: 'stars'
                , level: 1
                }
              , {
                  type: 'text.plain'
                , value: 'headline3'
                }
              , {
                  type: 'newline'
                }
              ]
            }
          , {
              type: 'paragraph'
            , children: [
                {
                  type: 'text.plain'
                , value: 'section3'
                }
              ]
            }
          ]
        }
      ]
    })
  })

  test('inline footnote', () => {
    // 如果document只有footnote, 而没有其他内容, orga解析出来结果将会是undefined
    const text = dedent`
    Hello[fn:LABEL:DEFINITION]
    World[fn::DEFINITION]
    `

    const result = removeAllAdditionalProps(parse(text))

    expect(result).toMatchObject({
      type: 'document'
    , children: [
        {
          type: 'paragraph'
        , children: [
            {
              type: 'text.plain'
            , value: 'Hello'
            }
          , {
              type: 'footnote.reference'
            , label: 'LABEL'
            , children: [
                {
                  type: 'text.plain'
                , value: 'DEFINITION'
                }
              ]
            }
          , {
              type: 'text.plain'
            , value: ' '
            }
          , {
              type: 'text.plain'
            , value: 'World'
            }
          , {
              type: 'footnote.reference'
            , label: ''
            , children: [
                {
                  type: 'text.plain'
                , value: 'DEFINITION'
                }
              ]
            }
          ]
        }
      ]
    })
  })
})

test('heading', () => {
  const text = dedent`
  * headline1
  ** headline2 :tag1:tag2:
  *** headline3 :tag3:tag4:
  `

  const result = removeAllAdditionalProps(parse(text))

  expect(result).toMatchObject({
    type: 'document'
  , children: [
      {
        type: 'section'
      , level: 1
      , children: [
          {
            type: 'headline'
          , level: 1
          , children: [
              {
                type: 'stars'
              , level: 1
              }
            , {
                type: 'text.plain'
              , value: 'headline1'
              }
            , {
                type: 'newline'
              }
            ]
          }
        , {
            type: 'section'
          , level: 2
          , children: [
              {
                type: 'headline'
              , level: 2
              , tags: ['tag1', 'tag2']
              , children: [
                  {
                    type: 'stars'
                  , level: 2
                  }
                , {
                    type: 'text.plain'
                  , value: 'headline2'
                  }
                , {
                    type: 'tags'
                  , tags: ['tag1', 'tag2']
                  }
                , {
                    type: 'newline'
                  }
                ]
              }
            , {
                type: 'section'
              , level: 3
              , children: [
                  {
                    type: 'headline'
                  , level: 3
                  , children: [
                      {
                        type: 'stars'
                      , level: 3
                      }
                    , {
                        type: 'text.plain'
                      , value: 'headline3'
                      }
                    , {
                        type: 'tags'
                      , tags: ['tag3', 'tag4']
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
})

describe('block', () => {
  test('SRC', () => {
    const text = dedent`
    #+BEGIN_SRC javascript
    function main() {
      console.log('Hello World')
    }
    #+END_SRC
    `

    const result = removeAllAdditionalProps(parse(text))

    expect(result).toMatchObject({
      type: 'document'
    , children: [
        {
          type: 'block'
        , name: 'SRC'
        , params: ['javascript']
        , value: dedent`
            function main() {
              console.log('Hello World')
            }
          `
        }
      ]
    })
  })

  test('src', () => {
    const text = dedent`
    #+begin_src javascript
    function main() {
      console.log('Hello World')
    }
    #+end_src
    `

    const result = removeAllAdditionalProps(parse(text))

    expect(result).toMatchObject({
      type: 'document'
    , children: [
        {
          type: 'block'
        , name: 'src'
        , params: ['javascript']
        , value: dedent`
            function main() {
              console.log('Hello World')
            }
          `
        }
      ]
    })
  })
})

test('drawer', () => {
  // 不知道为什么, Orga的抽屉必须在Section里, 因此第一个抽屉不会被识别
  const text = dedent`
  :DRAWERNAME:
  This is outside the drawer.
  :END:

  * Headline
  :DRAWERNAME:
  This is inside the drawer.
  :END:
  `

  const result = removeAllAdditionalProps(parse(text))

  expect(result).toMatchObject({
    type: 'document'
  , children: [
      {
        type: 'paragraph'
      , children: [
          {
            type: 'text.plain'
          , value: 'This is outside the drawer.'
          }
        ]
      }
    , {
        type: 'section'
      , level: 1
      , children: [
          {
            type: 'headline'
          , level: 1
          , children: [
              {
                type: 'stars'
              , level: 1
              }
            , {
                type: 'text.plain'
              , value: 'Headline'
              }
            , {
                type: 'newline'
              }
            ]
          }
        , {
            type: 'drawer'
          , name: 'DRAWERNAME'
          , value: 'This is inside the drawer.'
          }
        ]
      }
    ]
  })
})

describe('link', () => {
  test('external link', () => {
    const text = dedent`
    [[https://github.com][Github]]
    `

    const result = removeAllAdditionalProps(parse(text))

    expect(result).toMatchObject({
      type: 'document'
    , children: [
        {
          type: 'paragraph'
        , children: [
            {
              type: 'link'
            , protocol: 'https'
            , description: 'Github'
            , value: 'https://github.com'
            , search: undefined
            }
          ]
        }
      ]
    })
  })

  test('file link', () => {
    const text = dedent`
    [[file:code/main.c::255]]
    `

    const result = removeAllAdditionalProps(parse(text))

    expect(result).toMatchObject({
      type: 'document'
    , children: [
        {
          type: 'paragraph'
        , children: [
            {
              type: 'link'
            , protocol: 'file'
            , value: 'code/main.c'
            , description: undefined
            , search: 255
            }
          ]
        }
      ]
    })
  })

  test('internal link', () => {
    const text = dedent`
    <<target>>[[target]]
    `

    const result = removeAllAdditionalProps(parse(text))

    expect(result).toMatchObject({
      type: 'document'
    , children: [
        {
          type: 'paragraph'
        , children: [
            {
              type: 'text.plain'
            , value: '<<target>>'
            }
          , {
              type: 'link'
            , protocol: 'internal'
            , value: 'target'
            , description: undefined
            , search: undefined
            }
          ]
        }
      ]
    })
  })

  test('plain url', () => {
    const text = dedent`
    https://example.com
    `

    const result = removeAllAdditionalProps(parse(text))

    expect(result).toMatchObject({
      type: 'document'
    , children: [
        {
          type: 'paragraph'
        , children: [
            {
              type: 'text.plain'
            , value: 'https://example.com'
            }
          ]
        }
      ]
    })
  })
})

test('horizontal rule', () => {
  const text = dedent`
  -----
  `

  const result = removeAllAdditionalProps(parse(text))

  expect(result).toMatchObject({
    type: 'document'
  , children: [
      { type: 'hr' }
    ]
  })
})

describe('list', () => {
  test('description list item', () => {
    const text = dedent`
    - item :: *hello* /world/
      text
    `

    const result = removeAllAdditionalProps(parse(text))

    expect(result).toMatchObject({
      type: 'document'
    , children: [
        {
          type: 'list'
        , indent: 0
        , ordered: false
        , children: [
            {
              type: 'list.item'
            , indent: 0
            , tag: 'item'
            , children: [
                {
                  type: 'list.item.bullet'
                , indent: 0
                , ordered: false
                }
              , {
                  type: 'text.bold'
                , value: 'hello'
                }
              , {
                  type: 'text.plain'
                , value: ' '
                }
              , {
                  type: 'text.italic'
                , value: 'world'
                }
              ]
            }
          ]
        }
      , {
          type: 'paragraph'
        , children: [
            {
              type: 'text.plain'
            , value: 'text'
            }
          ]
        }
      ]
    })
  })

  test('nested list', () => {
    const text = dedent`
    - list1
      - list2
    `

    const result = removeAllAdditionalProps(parse(text))

    expect(result).toMatchObject({
      type: 'document'
    , children: [
        {
          type: 'list'
        , indent: 0
        , ordered: false
        , children: [
            {
              type: 'list.item'
            , indent: 0
            , children: [
                {
                  type: 'list.item.bullet'
                , indent: 0
                , ordered: false
                }
              , {
                  type: 'text.plain'
                , value: 'list1'
                }
              ]
            }
          , {
              type: 'list'
            , indent: 2
            , ordered: false
            , children: [
                {
                  type: 'list.item'
                , indent: 2
                , children: [
                    {
                      type: 'list.item.bullet'
                    , indent: 2
                    , ordered: false
                    }
                  , {
                      type: 'text.plain'
                    , value: 'list2'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    })
  })
})

test('todo', () => {
  const text = dedent`
  * TODO [#A] text [1/2] [50%]
  SCHEDULED: <2004-12-25 Sat>
  - [X] task1
  - [ ] task2
    [ ] text
  `

  const result = removeAllAdditionalProps(parse(text))

  expect(result).toMatchObject({
    type: 'document'
  , children: [
      {
        type: 'section'
      , children: [
          {
            type: 'headline'
          , level: 1
          , children: [
              {
                type: 'stars'
              , level: 1
              }
            , {
                type: 'todo'
              , keyword: 'TODO'
              }
            , {
                type: 'priority'
              , value: '[#A]'
              }
            , {
                type: 'text.plain'
              , value: 'text [1/2] [50%]'
              }
            , {
                type: 'newline'
              }
            ]
          }
        , {
            type: 'planning'
          , keyword: 'SCHEDULED'
          , timestamp: {
              date: expect.any(Date)
            }
          }
        , {
            type: 'list'
          , children: [
              {
                type: 'list.item'
              , indent: 0
              , children: [
                  {
                    type: 'list.item.bullet'
                  , indent: 0
                  , ordered: false
                  }
                , {
                    type: 'list.item.checkbox'
                  , checked: true
                  }
                , {
                    type: 'text.plain'
                  , value: 'task1'
                  }
                ]
              }
            , {
                type: 'list.item'
              , indent: 0
              , children: [
                  {
                    type: 'list.item.bullet'
                  , indent: 0
                  , ordered: false
                  }
                , {
                    type: 'list.item.checkbox'
                  , checked: false
                  }
                , {
                    type: 'text.plain'
                  , value: 'task2'
                  }
                ]
              }
            ]
          }
        , {
            type: 'paragraph'
          , children: [
              {
                type: 'text.plain'
              , value: '[ ] text'
              }
            ]
          }
        ]
      }
    ]
  })
})

test('table', () => {
  const text = dedent`
  | Column 1 | Column 2 | Column 3 |
  |----------|----------|----------|
  |        1 | foo      |          |
  |----------|----------|----------|
  |        2 | bar      |          |
  `

  const result = removeAllAdditionalProps(parse(text))

  expect(result).toMatchObject({
    type: 'document'
  , children: [
      {
        type: 'table'
      , children: [
          {
            type: 'table.row'
          , children: [
              {
                type: 'table.cell'
              , children: [
                  {
                    type: 'text.plain'
                  , value: ' Column 1 '
                  }
                ]
              }
            , {
                type: 'table.cell'
              , children: [
                  {
                    type: 'text.plain'
                  , value: ' Column 2 '
                  }
                ]
              }
            , {
                type: 'table.cell'
              , children: [
                  {
                    type:'text.plain'
                  , value: ' Column 3 '
                  }
                ]
              }
            ]
          }
        , { type: 'table.hr' }
        , {
            type: 'table.row'
          , children: [
              {
                type: 'table.cell'
              , children: [
                  {
                    type: 'text.plain'
                  , value: '        1 '
                  }
                ]
              }
            , {
                type: 'table.cell'
              , children: [
                  {
                    type: 'text.plain'
                  , value: ' foo      '
                  }
                ]
              }
            , {
                type: 'table.cell'
              , children: [
                  {
                    type: 'text.plain'
                  , value: '          '
                  }
                ]
              }
            ]
          }
        , { type: 'table.hr' }
        , {
            type: 'table.row'
          , children: [
              {
                type: 'table.cell'
              , children: [
                  {
                    type: 'text.plain'
                  , value: '        2 '
                  }
                ]
              }
            , {
                type: 'table.cell'
              , children: [
                  {
                    type: 'text.plain'
                  , value: ' bar      '
                  }
                ]
              }
            , {
                type: 'table.cell'
              , children: [
                  {
                    type: 'text.plain'
                  , value: '          '
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
})

function removeAllAdditionalProps<T extends object>(target: T): T {
  const additionalProps: Array<string | symbol> = ['parent', 'position']

  return new Proxy<T>(target, {
    has(target: T, prop: string) {
      if (additionalProps.includes(prop)) return false
      return Reflect.has(target, prop)
    }
  , ownKeys(target: T) {
      return Reflect.ownKeys(target).filter(x => !additionalProps.includes(x))
    }
  , get(target: T, prop: string) {
      if (additionalProps.includes(prop)) return undefined
      const value = Reflect.get(target, prop)
      if (isObject(value)) {
        return removeAllAdditionalProps(value)
      } else {
        return value
      }
    }
  })
}
