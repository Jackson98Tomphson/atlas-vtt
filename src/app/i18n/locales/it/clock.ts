import type { Message } from '../../types';

export const clock = {
  'clock.clear': 'Svuota un segmento',
  'clock.fill': 'Riempi un segmento',
} as const satisfies Record<string, Message>;
