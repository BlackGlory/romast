# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.1.0](https://github.com/BlackGlory/romast/compare/v4.0.2...v4.1.0) (2022-01-06)


### Features

* add addHelpers, removeHelpers, withHelpers, withHelpersInPlace ([1971d54](https://github.com/BlackGlory/romast/commit/1971d544f7c53841c29dc1e2709bbdb154db9b70))

### [4.0.2](https://github.com/BlackGlory/romast/compare/v4.0.1...v4.0.2) (2022-01-06)

### [4.0.1](https://github.com/BlackGlory/romast/compare/v4.0.0...v4.0.1) (2022-01-05)

## [4.0.0](https://github.com/BlackGlory/romast/compare/v3.0.0...v4.0.0) (2021-12-31)


### ⚠ BREAKING CHANGES

* `map` and `flatMap` now use shallow copy.
Rename `addHelpers` to `addHelersInPlace`.
Rename `removeHelpers` to `removeHelpersInPlace`

* replace deep copy with shallow copy ([f0be232](https://github.com/BlackGlory/romast/commit/f0be2322cb6cd1ac4072b854f61811cc5181c077))

## [3.0.0](https://github.com/BlackGlory/romast/compare/v2.4.0...v3.0.0) (2021-12-16)


### ⚠ BREAKING CHANGES

* - `wrap` => `addHelpers`
- `unwrap` => `removeHelpers`

* rename wrap to addHelpers, unwrap to removeHelpers ([48ac7e7](https://github.com/BlackGlory/romast/commit/48ac7e7b1bb4754ff8865f868be1f2c7dc4dfde2))

## [2.4.0](https://github.com/BlackGlory/romast/compare/v2.3.8...v2.4.0) (2021-12-15)


### Features

* add parameter strict ([0561bd0](https://github.com/BlackGlory/romast/commit/0561bd0534551139cc13d4c16b065dfe7bc1c1d7))

### [2.3.8](https://github.com/BlackGlory/romast/compare/v2.3.7...v2.3.8) (2021-12-12)


### Bug Fixes

* local image ([ca102d8](https://github.com/BlackGlory/romast/commit/ca102d8b69d8ef5963b26c94e10c72f128870d3d))

### [2.3.7](https://github.com/BlackGlory/romast/compare/v2.3.6...v2.3.7) (2021-12-08)

### [2.3.6](https://github.com/BlackGlory/romast/compare/v2.3.5...v2.3.6) (2021-10-14)

### [2.3.5](https://github.com/BlackGlory/romast/compare/v2.3.4...v2.3.5) (2021-10-11)

### [2.3.4](https://github.com/BlackGlory/romast/compare/v2.3.3...v2.3.4) (2021-09-25)


### Bug Fixes

* https://github.com/orgapp/orgajs/issues/147 ([857c9b0](https://github.com/BlackGlory/romast/commit/857c9b0a2797fe1799243b4851813d7f37d1b00e))

### [2.3.3](https://github.com/BlackGlory/romast/compare/v2.3.2...v2.3.3) (2021-09-25)

### [2.3.2](https://github.com/BlackGlory/romast/compare/v2.3.1...v2.3.2) (2021-09-08)


### Bug Fixes

* add Newline into OAST.FootnoteContent ([6d914ce](https://github.com/BlackGlory/romast/commit/6d914ce123e8d64ddef5a2a2c1357abf0bc0f80d))

### [2.3.1](https://github.com/BlackGlory/romast/compare/v2.3.0...v2.3.1) (2021-09-02)


### Bug Fixes

* the `header` of `WrappedNode<AST.Table>` is nullable ([7329d09](https://github.com/BlackGlory/romast/commit/7329d0915d363c1adbab29fa913315c7bb095aac))

## [2.3.0](https://github.com/BlackGlory/romast/compare/v2.2.1...v2.3.0) (2021-09-02)


### Features

* merge continuous newline nodes ([6116dd1](https://github.com/BlackGlory/romast/commit/6116dd12b34a5af6c8f8928f58770019891e1fe4))


### Bug Fixes

* add Newline into OAST.ListContent ([be316b2](https://github.com/BlackGlory/romast/commit/be316b2e3e4e04ee2dfa9ce534fe36352fc4f3a2))

### [2.2.1](https://github.com/BlackGlory/romast/compare/v2.2.0...v2.2.1) (2021-09-01)


### Bug Fixes

* add Newline into OAST.SectionContent ([820335f](https://github.com/BlackGlory/romast/commit/820335f46e1eb39741f817f744f566a8c1bfef5a))

## [2.2.0](https://github.com/BlackGlory/romast/compare/v2.1.1...v2.2.0) (2021-09-01)


### Features

* improve UnknownNodeError ([9029c9e](https://github.com/BlackGlory/romast/commit/9029c9ebeb0be540d91752ea7d15710a41d72191))

### [2.1.1](https://github.com/BlackGlory/romast/compare/v2.1.0...v2.1.1) (2021-09-01)


### Bug Fixes

* transform emptyLine nodes in sections ([e2a2094](https://github.com/BlackGlory/romast/commit/e2a2094e097ae402b7cf8741d3e60b6d4537fad3))

## [2.1.0](https://github.com/BlackGlory/romast/compare/v2.0.5...v2.1.0) (2021-09-01)


### Features

* upgrade orga to v3.1.0 ([a0f3201](https://github.com/BlackGlory/romast/commit/a0f32016878630e06fe9fcd65b801fe89951d417))

### [2.0.5](https://github.com/BlackGlory/romast/compare/v2.0.4...v2.0.5) (2021-09-01)


### Bug Fixes

* orga version ([0e567fb](https://github.com/BlackGlory/romast/commit/0e567fb05f058d7759097094de7eac3231fd99fa))

### [2.0.4](https://github.com/BlackGlory/romast/compare/v2.0.3...v2.0.4) (2021-08-31)

### [2.0.3](https://github.com/BlackGlory/romast/compare/v2.0.2...v2.0.3) (2021-08-29)

### [2.0.2](https://github.com/BlackGlory/romast/compare/v2.0.1...v2.0.2) (2021-08-28)

### [2.0.1](https://github.com/BlackGlory/romast/compare/v2.0.0...v2.0.1) (2021-08-28)


### Bug Fixes

* traverseDescendantNodes ([7cd5885](https://github.com/BlackGlory/romast/commit/7cd5885c683d12e803ed11874f077f925d74169d))

## [2.0.0](https://github.com/BlackGlory/romast/compare/v1.2.2...v2.0.0) (2021-08-28)


### ⚠ BREAKING CHANGES

* The property `title` is removed from AST.Link.
The property `value` is removed from AST.Drawer.

### Features

* improve utils ([628f59d](https://github.com/BlackGlory/romast/commit/628f59d8601d69c4d1cfdd37a7fba48dddb9bbca))
* upgrade orga to v2.6.0 ([963784e](https://github.com/BlackGlory/romast/commit/963784e9e841e2cf408014bf2742fc2492f01ec1))

### [1.2.2](https://github.com/BlackGlory/romast/compare/v1.2.1...v1.2.2) (2021-08-27)

### [1.2.1](https://github.com/BlackGlory/romast/compare/v1.2.0...v1.2.1) (2021-08-27)

## [1.2.0](https://github.com/BlackGlory/romast/compare/v1.1.1...v1.2.0) (2021-08-24)


### Features

* add find, traverseDescendantNodes ([9a089c7](https://github.com/BlackGlory/romast/commit/9a089c7a98515984ba098c98d8bc71510977fa75))
* add findAll ([fa986b4](https://github.com/BlackGlory/romast/commit/fa986b4d9da2f4f7216e016a48b400175bd628d7))

### [1.1.1](https://github.com/BlackGlory/romast/compare/v1.1.0...v1.1.1) (2021-08-23)

## [1.1.0](https://github.com/BlackGlory/romast/compare/v1.0.0...v1.1.0) (2021-08-23)


### Features

* add `index` field ([2f6321c](https://github.com/BlackGlory/romast/commit/2f6321cf58d5767d98442c26e2ae9a321435d7ff))

## 1.0.0 (2021-08-21)


### ⚠ BREAKING CHANGES

* Remove Headline.level

### Features

* add Break ([d1081f7](https://github.com/BlackGlory/romast/commit/d1081f741625d1f7a66e80ecfc4d553e2c3d0ba1))
* add flatMap, map, filter, removeEmptyParagraph, concatContinuousText ([85ebd31](https://github.com/BlackGlory/romast/commit/85ebd3112199787dea353be0fbddce48d6637346))
* add Headline.tags ([0d74952](https://github.com/BlackGlory/romast/commit/0d749529c13e9f297035549c50e7e3e1946095ce))
* add id for WrappedNode ([aad162b](https://github.com/BlackGlory/romast/commit/aad162b644354acc776ff71dd03780c2a774fe91))
* add InlineFootnote ([1da8e52](https://github.com/BlackGlory/romast/commit/1da8e52aeb0fe296647eaf14f764f1a7041567cf))
* add isDocumentContent, isSectionContent, isListContent ([8709fda](https://github.com/BlackGlory/romast/commit/8709fda146bca40695e1e62eebac2d49943deec1))
* add ListItem.checked ([d512d69](https://github.com/BlackGlory/romast/commit/d512d692b268a4a7b4b6978c79f333812ab02a9c))
* add TableRowGroup, remove TableHorizontalRule ([c430f68](https://github.com/BlackGlory/romast/commit/c430f68c1116f16a241294cb11c5a5dd9e0890fc))
* add unwrap, wrap ([64b52d0](https://github.com/BlackGlory/romast/commit/64b52d0fb0e4072ae304827915358a98452af978))
* correct section levels ([5ce7e00](https://github.com/BlackGlory/romast/commit/5ce7e006518ec8ba0af78243cd8de78cd20e81df))
* init ([295c112](https://github.com/BlackGlory/romast/commit/295c112b0ab19d0770f2241bf1a2b00ef20ae834))
* move headline as a property of section ([badcbaa](https://github.com/BlackGlory/romast/commit/badcbaaff36f612c1dee7bb1ae1ac6b355d0096a))
* remove Link.search ([9ef915f](https://github.com/BlackGlory/romast/commit/9ef915f19d4970c7787e02364eef7d1ddb8521c4))
* remove OAST.DrawerBegin, OAST.DrawerEnd, OAST.BlockBegin, OAST.BlockEnd ([a83176a](https://github.com/BlackGlory/romast/commit/a83176a66205e7290852d9517811fb9f130ebaf5))
* remove OAST.FootenoteLabel, OAST.FootnoteInlineBegin, OAST.FootnoteInlineEnd ([895e139](https://github.com/BlackGlory/romast/commit/895e139e7d658d2db40da37d0d658d102f6785e5))
* remove OAST.HTML ([348c7bc](https://github.com/BlackGlory/romast/commit/348c7bcbd9aa9ef47be5e33e0c4b35cbc723b77a))
* remove OAST.Keyword ([9e611cc](https://github.com/BlackGlory/romast/commit/9e611ccb7c3bf3eb07e530a4dc741275ed3903be))
* remove OAST.PlanningKeyword, OAST.PlanningTimestamp ([24eec38](https://github.com/BlackGlory/romast/commit/24eec386b1555ac6bc5dda9166376d6775cf58a3))
* remove OAST.TableColumnSeparator, OAST.Token ([d39d709](https://github.com/BlackGlory/romast/commit/d39d709d1ea7cfa24bf6a4ce2df53e6ea6d4dbc9))
* rename ListItem.tag to ListItem.term ([a04e5a9](https://github.com/BlackGlory/romast/commit/a04e5a9121bb85d5d5a84ea9769da1e4199a7e32))
* rewrite Link ([ce81628](https://github.com/BlackGlory/romast/commit/ce8162823344b04c6982559d1cbd289ca7a00ca0))


### Bug Fixes

* add `headline` for `WrappedNode<Section>` ([53732eb](https://github.com/BlackGlory/romast/commit/53732eb540ffeeafda53215f296c1bdf6e398e78))
* block transforming ([99efadd](https://github.com/BlackGlory/romast/commit/99efaddda45709860ac9c9dd83aefaffae529087))
* isHorizontalRule ([bda08fe](https://github.com/BlackGlory/romast/commit/bda08fe0d4a085c02f9cd7be10269f9376f8d342))
* the `description` of `Link` can be undefined ([617a607](https://github.com/BlackGlory/romast/commit/617a607f7e1076e9e5be311f89f072dcc8a5ea5b))
* unwrap Table.header ([429f43e](https://github.com/BlackGlory/romast/commit/429f43ea78b5256934f154f7b98e429a6ad3b8e7))
