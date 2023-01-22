import * as OAST from '@src/oast-3.2.js'
import * as ROMAST from '@src/romast.js'
import { parse as orga } from 'orga'
import { transform } from '@src/transform-oast-to-romast/index.js'

export function parse(text: string, strict: boolean = false): ROMAST.Document {
  const oast = orga(dosToUnix(text)) as OAST.Document
  const romast = transform(oast, strict)
  return romast
}

/**
 * @see https://github.com/orgapp/orgajs/issues/147
 */
function dosToUnix(text: string): string {
  return text.replace(/\r\n/g, '\n')
}
