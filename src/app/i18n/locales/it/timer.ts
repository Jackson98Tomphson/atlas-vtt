import type { Message } from '../../types';

export const timer = {
  'timer.pause': 'Pausa',
  'timer.placeholder': 'MM:SS',
  'timer.start': 'Avvia',
} as const satisfies Record<string, Message>;
