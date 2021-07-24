import * as OAST from '@src/oast-utils/oast-2.4'
import * as ROMAST from '@src/romast-utils/romast-1.0'
import { transformDocument } from './transform'

export function transform(root: OAST.Document): ROMAST.Document {
  return transformDocument(root)
}
