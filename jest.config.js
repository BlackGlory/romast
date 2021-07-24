const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.base.json')

const esModules = [
  'micromark-util-symbol'
, 'micromark-util-character'
, 'micromark-util-html-tag-name'
, 'micromark-factory-space'
, 'mdast-util-from-markdown'
, 'mdast-util-to-string'
, 'micromark'
, 'parse-entities'
, 'character-entities'
, 'unist-util-stringify-position'
, 'unist-util-visit'
, 'unist-util-visit-parents'
, 'unist-util-is'
, 'mdast-util-definitions'
, 'mdast-util-gfm'
, 'ccount'
, 'mdast-util-find-and-replace'
, 'escape-string-regexp'
, 'mdast-util-to-markdown'
, 'markdown-table'
, 'mdast-util-footnote'
, 'mdast-util-directive'
, 'stringify-entities'
].join('|')

module.exports = {
  preset: 'ts-jest'
, testEnvironment: 'node'
, testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)']
, transform: {
    '^.+\\.ts$': 'ts-jest'
  , [`(${esModules}).+\\.js$`]: 'babel-jest'
  }
, transformIgnorePatterns: [`/node_modules/(?!${esModules})`]
, moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  })
}
