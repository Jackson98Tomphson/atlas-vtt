import type { Message } from '../../types';

export const hex = {
  'hex.changeNote': 'Cambia nota',
  'hex.unlink': 'Scollega esagono',
} as const satisfies Record<string, Message>;
