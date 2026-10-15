import type { Message } from '../../types';

export const contents = {
  'contents.countOf': '{count} di {total}',
  'contents.includeAll': 'Includi tutti gli elementi di {group}',
  'contents.none': 'Nessuno',
  'contents.orphaned': 'Usato solo da contenuti esclusi',
} as const satisfies Record<string, Message>;
