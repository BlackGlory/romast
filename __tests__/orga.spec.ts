import { parse } from 'orga'
import { dedent } from 'extra-tags'
import { isObject, isDate } from '@blackglory/types'

test('break', () => {
  const text = dedent`
  Duis aute irure dolor in reprehenderit in voluptate 
  velit esse cillum dolore eu fugiat nulla pariatur.
  `

  const result = removeAllAdditionalProps(parse(text))

  expect(result).toMatchObject({
    type: 'document'
  , children: [
      {
        type: 'paragraph'
      , children: [
          {
            type: 'text'
          , value: 'Duis aute irure dolor in reprehenderit in voluptate '
          }
        , {
            type: 'newline'
          }
        , {
            type: 'text'
          , value: 'velit esse cillum dolore eu fugiat nulla pariatur.'
          }
        ]
      }
    ]
  })
})

test('newline', () => {
  const text = dedent`
  Duis aute irure dolor in reprehenderit in voluptate
  velit esse cillum dolore eu fugiat nulla pariatur.
  `

  const result = removeAllAdditionalProps(parse(text))

  expect(result).toMatchObject({
    type: 'document'
  , children: [
      {
        type: 'paragraph'
      , children: [
          {
            type: 'text'
          , value: 'Duis aute irure dolor in reprehenderit in voluptate'
          }
        , { type: 'newline' }
        , {
            type: 'text'
          , value: 'velit esse cillum dolore eu fugiat nulla pariatur.'
          }
        ]
      }
    ]
  })
})

describe('empty lines', () => {
  test('as a child node of document', () => {
    const text = dedent`
    Hello


    World
    `

    const result = removeAllAdditionalProps(parse(text))

    expect(result).toMatchObject({
      type: 'document'
    , children: [
        {
          type: 'paragraph'
        , children: [
            {
              type: 'text'
            , value: 'Hello'
            }
          , { type: 'newline' }
          , { type: 'emptyLine' }
          ]
        }
      , { type: 'emptyLine' }
      , {
          type:'paragraph'
        , children: [
            {
              type: 'text'
            , value: 'World'
            }
          ]
        }
      ]
    })
  })

  test('as a child node of section', () => {
    const text = dedent`
    * Section
    Hello


    World
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
            , children: [
                {
                  type: 'stars'
                , level: 1
                }
              , {
                  type: 'text'
                , value: 'Section'
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
                  type: 'text'
                , value: 'Hello'
                }
              , { type: 'newline' }
              , { type: 'emptyLine' }
              ]
            }
          , { type: 'emptyLine' }
          , {
              type:'paragraph'
            , children: [
                {
                  type: 'text'
                , value: 'World'
                }
              ]
            }
          ]
        }
      ]
    })
  })
})

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
  , children: [
      { type: 'emptyLine' }
    , { type: 'emptyLine' }
    ]
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
              type: 'text'
            , value: 'The Org homepage'
            }
          , {
              type: 'footnote.reference'
            , label: 'LABEL'
            , children: [
                {
                  type: 'opening'
                , element: 'footnote.reference'
                }
              , {
                  type: 'footnote.label'
                , label: 'LABEL'
                }
              , {
                  type: 'closing'
                , element: 'footnote.reference'
                }
              ]
            }
          , {
              type: 'text'
            , value: ' now looks a lot better than it used to.'
            }
          , {
              type: 'newline'
            }
          , {
              type: 'emptyLine'
            }
          ]
        }
      , {
          type: 'footnote'
        , label: 'LABEL'
        , children: [
            {
              type: 'footnote.label'
            , label: 'LABEL'
            }
          , {
              type: 'paragraph'
            , children: [
                {
                  type: 'text'
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
                  type: 'text'
                , value: 'headline1'
                }
              , { type: 'newline' }
              ]
            }
          , {
              type: 'paragraph'
            , children: [
                {
                  type: 'text'
                , value: 'footnote'
                }
              , {
                  type: 'footnote.reference'
                , label: 'LABEL'
                , children: [
                    {
                      type: 'opening'
                    , element: 'footnote.reference'
                    }
                  , {
                      type: 'footnote.label'
                    , label: 'LABEL'
                    }
                  , {
                      type: 'closing'
                    , element: 'footnote.reference'
                    }
                  ]
                }
              , { type: 'newline' }
              , { type: 'emptyLine' }
              ]
            }
          ]
        }
      , {
          type: 'footnote'
        , label: 'LABEL'
        , children: [
            {
              type: 'footnote.label'
            , label: 'LABEL'
            }
          , {
              type: 'paragraph'
            , children: [
                {
                  type: 'text'
                , value: 'paragraph1'
                }
              , { type: 'newline' }
              , { type: 'emptyLine' }
              ]
            }
          , {
              type: 'paragraph'
            , children: [
                {
                  type: 'text'
                , value: 'paragraph2'
                }
              , { type: 'newline' }
              , { type: 'emptyLine' }
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
                  type: 'text'
                , value: 'headline2'
                }
              , { type: 'newline' }
              ]
            }
          , {
              type: 'paragraph'
            , children: [
                {
                  type: 'text'
                , value: 'section2'
                }
              , { type: 'newline' }
              , { type: 'emptyLine' }
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
                  type: 'text'
                , value: 'headline3'
                }
              , { type: 'newline' }
              ]
            }
          , {
              type: 'paragraph'
            , children: [
                {
                  type: 'text'
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
              type: 'text'
            , value: 'Hello'
            }
          , {
              type: 'footnote.reference'
            , label: 'LABEL'
            , children: [
                {
                  type: 'opening'
                , element: 'footnote.reference'
                }
              , {
                  type: 'footnote.label'
                , label: 'LABEL'
                }
              , {
                  type: 'text'
                , value: 'DEFINITION'
                }
              , {
                  type: 'closing'
                , element: 'footnote.reference'
                }
              ]
            }
          , {
              type: 'newline'
            }
          , {
              type: 'text'
            , value: 'World'
            }
          , {
              type: 'footnote.reference'
            , children: [
                {
                  type: 'opening'
                , element: 'footnote.reference'
                }
              , {
                  type: 'text'
                , value: 'DEFINITION'
                }
              , {
                  type: 'closing'
                , element: 'footnote.reference'
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
          , actionable: false
          , level: 1
          , children: [
              {
                type: 'stars'
              , level: 1
              }
            , {
                type: 'text'
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
              , actionable: false
              , level: 2
              , tags: ['tag1', 'tag2']
              , children: [
                  {
                    type: 'stars'
                  , level: 2
                  }
                , {
                    type: 'text'
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
                  , actionable: false
                  , level: 3
                  , tags: ['tag3', 'tag4']
                  , children: [
                      {
                        type: 'stars'
                      , level: 3
                      }
                    , {
                        type: 'text'
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
  // Orga的抽屉似乎必须在Section里, 因此第一个抽屉不会被识别
  const text = dedent`
  Hello World.

  :DRAWERNAME:
  This is not a drawer.
  :END:

  * Headline
  :DRAWERNAME:
  This is inside the drawer.
  :END:

  :不支持中文:
  This is not a drawer.
  :END:
  `

  const result = removeAllAdditionalProps(parse(text))

  expect(result).toMatchObject({
    type: 'document'
  , children: [
      {
        type: 'paragraph'
      , attributes: {}
      , children: [
          {
            type: 'text'
          , value: 'Hello World.'
          }
        , { type: 'newline' }
        , { type: 'emptyLine' }
        ]
      }
    , { type: 'newline' }
    , {
        type: 'paragraph'
      , children: [
          {
            type: 'text'
          , value: 'This is not a drawer.'
          }
        , { type: 'newline' }
        ]
      }
    , { type: 'newline' }
    , { type: 'emptyLine' }
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
                type: 'text'
              , value: 'Headline'
              }
            , { type: 'newline' }
            ]
          }
        , {
            type: 'drawer'
          , name: 'DRAWERNAME'
          , value: '\nThis is inside the drawer.\n'
          , children: [
              {
                type: 'drawer.begin'
              , name: 'DRAWERNAME'
              }
            , { type: 'newline' }
            , {
                type: 'text'
              , value: 'This is inside the drawer.'
              }
            , { type: 'newline' }
            , { type: 'drawer.end' }
            ]
          }
        , { type: 'emptyLine' }
        , {
            type: 'paragraph'
          , children: [
              {
                type: 'text'
              , value: ':不支持中文:'
              }
            , { type: 'newline' }
            , {
                type: 'text'
              , value: 'This is not a drawer.'
              }
            , { type: 'newline'}
            ]
          }
        ]
      }
    ]
  })
})

describe('link', () => {
  test('styled text in link', () => {
    const text = dedent`
    Please read the [[ *README* ]] first.
    `

    const result = removeAllAdditionalProps(parse(text))

    expect(result).toMatchObject({
      type: 'document'
    , children: [
        {
          type: 'paragraph'
        , children: [
            {
              type: 'text'
            , value: 'Please read the '
            }
          , {
              type: 'link'
            , path: {
                protocol: 'internal'
              , value: ' *README* '
              , search: undefined
              }
            , children: [
                {
                  type: 'opening'
                , element: 'link'
                }
              , {
                  type: 'link.path'
                , protocol: 'internal'
                , value: ' *README* '
                , search: undefined
                }
              , {
                  type: 'closing'
                , element: 'link'
                }
              ]
            }
          , {
              type: 'text'
            , value: ' first.'
            }
          ]
        }
      ]
    })
  })

  test('link on styled text', () => {
    const text = dedent`
    *Please read the [[README]] first.*
    `

    const result = removeAllAdditionalProps(parse(text))

    expect(result).toMatchObject({
      type: 'document'
    , children: [
        {
          type: 'paragraph'
        , children: [
            {
              type: 'text'
            , style: 'bold'
            , value: 'Please read the [[README]] first.'
            }
          ]
        }
      ]
    })
  })

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
            , path: {
                protocol: 'https'
              , value: 'https://github.com'
              , search: undefined
              }
            , children: [
                {
                  type: 'opening'
                , element: 'link'
                }
              , {
                  type: 'link.path'
                , protocol: 'https'
                , value: 'https://github.com'
                , search: undefined
                }
              , {
                  type: 'text'
                , value: 'Github'
                }
              , {
                  type: 'closing'
                , element: 'link'
                }
              ]
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
            , path: {
                protocol: 'file'
              , value: 'code/main.c'
              , search: 255
              }
            , children: [
                {
                  type: 'opening'
                , element: 'link'
                }
              , {
                  type: 'link.path'
                , protocol: 'file'
                , value: 'code/main.c'
                , search: 255
                }
              , {
                  type: 'closing'
                , element: 'link'
                }
              ]
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
              type: 'text'
            , value: '<<target>>'
            }
          , {
              type: 'link'
            , path: {
                protocol: 'internal'
              , value: 'target'
              , search: undefined
              }
            , children: [
                {
                  type: 'opening'
                , element: 'link'
                }
              , {
                  type: 'link.path'
                , protocol: 'internal'
                , value: 'target'
                , search: undefined
                }
              , {
                  type: 'closing'
                , element: 'link'
                }
              ]
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
              type: 'text'
            , value: 'https://example.com'
            }
          ]
        }
      ]
    })
  })

  test('plain url link', () => {
    const text = dedent`
    [[https://example.com]]
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
            , path: {
                protocol: 'https'
              , value: 'https://example.com'
              , search: undefined
              }
            , children: [
                {
                  type: 'opening'
                , element: 'link'
                }
              , {
                  type: 'link.path'
                , protocol: 'https'
                , value: 'https://example.com'
                , search: undefined
                }
              , {
                  type: 'closing'
                , element: 'link'
                }
              ]
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
                  type: 'list.item.tag'
                , value: 'item'
                }
              , {
                  type: 'text'
                , style: 'bold'
                , value: 'hello'
                }
              , {
                  type: 'text'
                , value: ' '
                }
              , {
                  type: 'text'
                , style: 'italic'
                , value: 'world'
                }
              , {
                  type: 'newline'
                }
              , {
                  type: 'text'
                , value: 'text'
                }
              ]
            }
          ]
        }
      ]
    })
  })

  test('multiline list item', () => {
    const text = dedent`
    - line1
      line2
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
                  type: 'text'
                , value: 'line1'
                }
              , {
                  type: 'newline'
                }
              , {
                  type: 'text'
                , value: 'line2'
                }
              ]
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
                  type: 'text'
                , value: 'list1'
                }
              , {
                  type: 'newline'
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
                      type: 'text'
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
                type: 'text'
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
          , children: [
              {
                type: 'planning.keyword'
              , value: 'SCHEDULED'
              }
            , {
                type: 'planning.timestamp'
              , value: {
                  date: expect.any(Date)
                }
              }
            ]
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
                    type: 'text'
                  , value: 'task1'
                  }
                , { type: 'newline' }
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
                    type: 'text'
                  , value: 'task2'
                  }
                , { type: 'newline' }
                , {
                    type: 'text'
                  , value: '[ ] text'
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

describe('table', () => {
  test('no horizontal rule', () => {
    const text = dedent`
    | Column 1 | Column 2 | Column 3 |
    | foo      | bar      |          |
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
                      type: 'text'
                    , value: ' Column 1 '
                    }
                  ]
                }
              , {
                  type: 'table.columnSeparator'
                }
              , {
                  type: 'table.cell'
                , children: [
                    {
                      type: 'text'
                    , value: ' Column 2 '
                    }
                  ]
                }
              , {
                  type: 'table.columnSeparator'
                }
              , {
                  type: 'table.cell'
                , children: [
                    {
                      type:'text'
                    , value: ' Column 3 '
                    }
                  ]
                }
              , {
                  type: 'table.columnSeparator'
                }
              ]
            }
          , {
              type: 'table.row'
            , children: [
                {
                  type: 'table.cell'
                , children: [
                    {
                      type: 'text'
                    , value: ' foo      '
                    }
                  ]
                }
              , {
                  type: 'table.columnSeparator'
                }
              , {
                  type: 'table.cell'
                , children: [
                    {
                      type: 'text'
                    , value: ' bar      '
                    }
                  ]
                }
              , {
                  type: 'table.columnSeparator'
                }
              , {
                  type: 'table.cell'
                , children: [
                    {
                      type: 'text'
                    , value: '          '
                    }
                  ]
                }
              , {
                  type: 'table.columnSeparator'
                }
              ]
            }
          ]
        }
      ]
    })
  })

  test('multiple horizontal rule', () => {
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
                      type: 'text'
                    , value: ' Column 1 '
                    }
                  ]
                }
              , {
                  type: 'table.columnSeparator'
                }
              , {
                  type: 'table.cell'
                , children: [
                    {
                      type: 'text'
                    , value: ' Column 2 '
                    }
                  ]
                }
              , {
                  type: 'table.columnSeparator'
                }
              , {
                  type: 'table.cell'
                , children: [
                    {
                      type:'text'
                    , value: ' Column 3 '
                    }
                  ]
                }
              , {
                  type: 'table.columnSeparator'
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
                      type: 'text'
                    , value: '        1 '
                    }
                  ]
                }
              , {
                  type: 'table.columnSeparator'
                }
              , {
                  type: 'table.cell'
                , children: [
                    {
                      type: 'text'
                    , value: ' foo      '
                    }
                  ]
                }
              , {
                  type: 'table.columnSeparator'
                }
              , {
                  type: 'table.cell'
                , children: [
                    {
                      type: 'text'
                    , value: '          '
                    }
                  ]
                }
              , {
                  type: 'table.columnSeparator'
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
                      type: 'text'
                    , value: '        2 '
                    }
                  ]
                }
              , {
                  type: 'table.columnSeparator'
                }
              , {
                  type: 'table.cell'
                , children: [
                    {
                      type: 'text'
                    , value: ' bar      '
                    }
                  ]
                }
              , {
                  type: 'table.columnSeparator'
                }
              , {
                  type: 'table.cell'
                , children: [
                    {
                      type: 'text'
                    , value: '          '
                    }
                  ]
                }
              , {
                  type: 'table.columnSeparator'
                }
              ]
            }
          ]
        }
      ]
    })
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
        if (isDate(value)) {
          return value
        } else {
          return removeAllAdditionalProps(value)
        }
      } else {
        return value
      }
    }
  })
}
