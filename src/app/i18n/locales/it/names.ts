import type { Message } from '../../types';

export const names = {
  'names.invalidScene': 'I nomi delle scene non possono contenere \\ / : * ? " < > | # ^ [ o ]',
  'names.invalidCollection': 'I nomi delle collezioni non possono contenere \\ / : * ? " < > | # ^ [ o ]',
  'names.collectionDot': 'I nomi delle collezioni non possono iniziare con un punto',
  'names.enter': 'Inserisci un nome',
  'names.presetTaken': 'Esiste già una configurazione con questo nome',
} as const satisfies Record<string, Message>;
