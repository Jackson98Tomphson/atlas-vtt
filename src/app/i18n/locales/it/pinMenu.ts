import type { Message } from '../../types';

export const pinMenu = {
  'pinMenu.open': 'Apri nota',
  'pinMenu.edit': 'Modifica segnaposto',
  'pinMenu.readable': 'Leggibile dai giocatori',
} as const satisfies Record<string, Message>;
