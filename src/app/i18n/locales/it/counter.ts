import type { Message } from '../../types';

export const counter = {
  'counter.decrease': 'Diminuisci',
  'counter.increase': 'Aumenta',
} as const satisfies Record<string, Message>;
