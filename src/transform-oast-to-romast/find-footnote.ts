import * as OAST from '@src/oast-utils/oast-2.4'
import { isFootnote } from '@src/oast-utils/is'
import { find } from '@src/oast-utils/find'

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
