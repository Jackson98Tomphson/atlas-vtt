import type { Message } from '../../types';

export const light = {
  'light.previewFailed': 'Impossibile riprodurre l’anteprima del suono',
  'light.configure': 'Configura luce…',
  'light.delete': 'Elimina luce',
  'light.turnOn': 'Accendi',
  'light.turnOff': 'Spegni',
} as const satisfies Record<string, Message>;
