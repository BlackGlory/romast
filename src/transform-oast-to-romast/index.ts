import * as OAST from '@src/oast-3.2'
import * as ROMAST from '@src/romast'
import { transformDocument } from './transform'
import { postprocess } from './postprocess'

export function transform(
  root: OAST.Document
, strict: boolean
): ROMAST.Document {
  return postprocess(transformDocument(root, strict))
}
