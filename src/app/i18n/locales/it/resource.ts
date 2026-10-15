import type { Message } from '../../types';

export const resource = {
  'resource.edit': 'Modifica {label}',
  'resource.current': '{label} attuale',
  'resource.max': '{label} massima',
} as const satisfies Record<string, Message>;
