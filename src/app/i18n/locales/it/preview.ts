import type { Message } from '../../types';

export const preview = {
  'preview.loading': 'Caricamento…',
  'preview.pin': 'Fissa finestra',
  'preview.unpin': 'Sblocca finestra',
  'preview.openFile': 'Apri file',
  'preview.close': 'Chiudi finestra',
  'preview.notFound': 'Errore: file non trovato',
  'preview.openLinkFailed': 'Impossibile aprire la nota collegata',
} as const satisfies Record<string, Message>;
