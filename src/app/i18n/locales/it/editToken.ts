import type { Message } from '../../types';

export const editToken = {
  'editToken.none': 'Nessuno',
  'editToken.statblockDefault': 'Valore del blocco statistiche: {value}',
  'editToken.title': 'Modifica token',
  'editToken.name': 'Nome',
  'editToken.namePlaceholder': 'Nome del token',
  'editToken.showNameplate': 'Mostra nome',
  'editToken.resources': 'Risorse',
  'editToken.resetStatblock': 'Ripristina valore del blocco statistiche',
} as const satisfies Record<string, Message>;
