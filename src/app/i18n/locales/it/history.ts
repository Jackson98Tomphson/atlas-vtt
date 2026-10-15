import type { Message } from '../../types';

export const history = {
  'history.redo': 'Ripeti',
  'history.undo': 'Annulla',
} as const satisfies Record<string, Message>;
