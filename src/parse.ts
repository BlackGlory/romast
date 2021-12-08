import * as OAST from '@src/oast-3.2'
import * as ROMAST from '@src/romast'
import { parse as orga } from 'orga'
import { transform } from '@src/transform-oast-to-romast'

export function parse(text: string): ROMAST.Document {
  const oast = orga(dosToUnix(text)) as OAST.Document
  const romast = transform(oast)
  return romast
}

/**
 * @see https://github.com/orgapp/orgajs/issues/147
 */
function dosToUnix(text: string): string {
  return text.replace(/\r\n/g, '\n')
}
