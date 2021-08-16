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

test('heading', () => {
  const text = dedent`
    * Heading
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
              , value: 'Heading'
              }
            ]
          }
        ]
      }
    ]
  })
})

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

test('raw link', () => {
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
          }
        ]
      }
    ]
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

test('headline with tags', () => {
  const text = dedent`
    * headline1 :tag1:tag2:
    ** headline2 :tag3:tag4:
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
          , tags: ['tag1', 'tag2']
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
  })
})

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

test('todo', () => {
  const text = dedent`
    * TODO [#A] text [1/2] [50%]
    - [X] task1
    - [ ] task2
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
