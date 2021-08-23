# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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