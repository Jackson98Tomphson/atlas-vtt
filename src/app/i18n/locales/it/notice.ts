import type { Message } from '../../types';

export const notice = {
  'notice.dashboardOpenFailed': 'Errore durante l’apertura della bacheca',
  'notice.openImageFirst': 'Apri prima un file immagine',
} as const satisfies Record<string, Message>;
