# romast

**R**enderable **O**rg-**M**ode **A**bstract **S**yntax **T**ree.

rmdast v1 is an easy-to-render version of [oast v2],
the new AST is designed to render nodes directly from AST to any platform, e.g. React.
So you can precisely control the translation results through recursive descent analysis.

[oast v2]: https://github.com/orgapp/orgajs

## Install

```sh
npm install --save romast
# or
yarn add romast
```

## Usage

```ts
import { parse } from 'romast'
import { dedent } from 'extra-tags'

const org = dedent`
* Romast
```

## API

### parse

```ts
function parse(text: string): ROMAST.Document
```

### is

Each romast node has a corresponding `is` function.
