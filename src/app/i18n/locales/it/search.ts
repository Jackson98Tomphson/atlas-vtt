import type { Message } from '../../types';

export const search = {
  'search.label': 'Cerca',
  'search.current': 'Ricerca: {query}',
  'search.assets': 'Cerca risorse',
  'search.placeholderFilters': 'Cerca… prova cr:1-3 o type:beast',
  'search.placeholder': 'Cerca…',
} as const satisfies Record<string, Message>;
