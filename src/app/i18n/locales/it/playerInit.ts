import type { Message } from '../../types';

export const playerInit = {
  'playerInit.order': 'Ordine di iniziativa',
  'playerInit.round': 'Round {round}',
} as const satisfies Record<string, Message>;
