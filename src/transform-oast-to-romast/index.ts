import * as OAST from '@src/oast-3.2.js'
import * as ROMAST from '@src/romast.js'
import { transformDocument } from './transform.js'
import { postprocess } from './postprocess.js'

export function transform(
  root: OAST.Document
, strict: boolean
): ROMAST.Document {
  return postprocess(transformDocument(root, strict))
}
