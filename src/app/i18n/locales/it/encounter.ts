import type { Message } from '../../types';

export const encounter = {
  'encounter.saveTitle': 'Salva come incontro',
  'encounter.createWith': { one: 'Crea un incontro con {count} token:', other: 'Crea un incontro con {count} token:' },
  'encounter.tokens': 'Token:',
  'encounter.namePlaceholder': 'Inserisci il nome dell’incontro…',
  'encounter.defaultName': 'Incontro {date}',
  'encounter.save': 'Salva incontro',
  'encounter.noTokens': 'Nessun token da salvare come incontro',
  'encounter.description': { one: 'Incontro con {count} token', other: 'Incontro con {count} token' },
  'encounter.saved': 'Incontro "{name}" salvato!',
  'encounter.saveFailed': 'Impossibile salvare l’incontro',
  'encounter.noImage': 'I token selezionati non hanno un’immagine e non possono essere salvati come incontro',
} as const satisfies Record<string, Message>;
