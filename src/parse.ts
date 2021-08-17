import * as OAST from '@src/oast-2.4'
import * as ROMAST from '@src/romast-1.0'
import { parse as orga } from 'orga'
import { transform } from '@src/transform-oast-to-romast'

export function parse(text: string): ROMAST.Document {
  const oast = orga(text) as OAST.Document
  const romast = transform(oast)
  return romast
}
