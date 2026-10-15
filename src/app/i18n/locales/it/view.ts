import type { Message } from '../../types';

export const view = {
  'view.copyFailed': 'Impossibile copiare il percorso del file',
  'view.copyPath': 'Copia percorso del file',
  'view.more': 'Altre opzioni',
  'view.newWindow': 'Sposta in una nuova finestra',
  'view.pathCopied': 'Percorso del file copiato negli appunti',
  'view.rename': 'Rinomina…',
  'view.reveal': 'Mostra in Esplora file',
  'view.splitDown': 'Dividi in basso',
  'view.splitRight': 'Dividi a destra',
  'view.initializing': 'Inizializzazione…',
  'view.sceneNotFound': 'File della scena non trovato: {path}',
  'view.preparing': 'Preparazione…',
  'view.canvas': 'Area di lavoro di Atlas',
  'view.player': 'Vista giocatori',
  'view.playerRestoreFailed': 'Impossibile ripristinare la vista giocatori. Invia di nuovo una scena a questa finestra.',
  'view.connecting': 'Connessione alla sessione di gioco…',
  'view.playerTitle': 'Vista giocatori: {name}',
  'view.playerDefault': 'Vista giocatori',
} as const satisfies Record<string, Message>;
