import * as OAST from '@src/oast-utils/oast-2.4'
import * as ROMAST from '@src/romast-utils/romast-1.0'
import {
  concatContinuousText
, removeEmptyParagraph
} from '@src/romast-utils/postprocess'
import { parse as orga } from 'orga'
import { transform } from '@src/transform-oast-to-romast'

export function parse(text: string): ROMAST.Document {
  const oast = orga(text) as OAST.Document
  const romast = postprocess(transform(oast))
  return romast
}

function postprocess(document: ROMAST.Document): ROMAST.Document {
  return (
    removeEmptyParagraph(
      concatContinuousText(document)
    )
  )
}
