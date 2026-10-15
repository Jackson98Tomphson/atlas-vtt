import type { Message } from '../../types';

export const picker = {
  'picker.none.bases': 'Nessuna base corrisponde a “{query}”',
  'picker.none.notes': 'Nessuna nota corrisponde a “{query}”',
  'picker.recent': 'Modificate di recente',
  'picker.results': 'Risultati',
  'picker.search.bases': 'Cerca basi',
  'picker.search.notes': 'Cerca note',
  'picker.searchPlaceholder.bases': 'Cerca basi…',
  'picker.searchPlaceholder.notes': 'Cerca note…',
  'picker.token.title': 'Seleziona token per {name}',
  'picker.token.failed': 'Impossibile caricare la selezione dei token',
  'picker.token.search': 'Cerca token…',
  'picker.token.removeCurrent': 'Rimuovi l’assegnazione attuale del token',
  'picker.token.current': 'Attualmente assegnato:',
  'picker.token.loading': 'Caricamento dei token…',
  'picker.token.noMatch': 'Nessun token corrisponde alla ricerca.',
  'picker.token.none': 'Nessun token disponibile.',
  'picker.token.select': 'Seleziona un token da assegnare:',
  'picker.token.reassign': 'Seleziona un altro token da assegnare:',
} as const satisfies Record<string, Message>;
