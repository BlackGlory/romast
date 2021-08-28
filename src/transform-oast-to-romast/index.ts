import * as OAST from '@src/oast-2.6'
import * as ROMAST from '@src/romast'
import { transformDocument } from './transform'
import { postprocess } from './postprocess'

export function transform(root: OAST.Document): ROMAST.Document {
  return postprocess(transformDocument(root))
}
