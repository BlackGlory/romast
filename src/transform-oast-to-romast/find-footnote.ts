import * as OAST from '@src/oast-3.2.js'
import { isFootnote } from '@oast-utils/is.js'
import { find } from '@oast-utils/find.js'

export function findFootnote(
  node: OAST.Node
, label: string
): OAST.Footnote | null {
  const normalizedLabel = normalizeLabel(label)
  return find<OAST.Footnote>(node, node => {
    return isFootnote(node)
        && normalizeLabel(node.label) === normalizedLabel
  }) ?? null
}

function normalizeLabel(identifier: string): string {
  return identifier.toLowerCase()
}
