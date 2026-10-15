import type { Message } from '../../types';

export const drawing = {
  'drawing.color': 'Colore',
  'drawing.changeIcon': 'Cambia icona',
} as const satisfies Record<string, Message>;
