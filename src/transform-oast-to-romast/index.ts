import * as OAST from '@src/oast-2.4'
import * as ROMAST from '@src/romast-1.0'
import { transformDocument } from './transform'
import { postprocess } from './postprocess'

export function transform(root: OAST.Document): ROMAST.Document {
  return postprocess(transformDocument(root))
}
