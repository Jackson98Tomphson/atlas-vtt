import type { Message } from '../../types';

export const recovery = {
  'recovery.uncertain': 'Impossibile verificare se il token è stato salvato. Importazione interrotta; conserva la sua immagine e controlla l’archiviazione del vault prima di riprovare.',
} as const satisfies Record<string, Message>;
