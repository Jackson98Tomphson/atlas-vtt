import type { Message } from '../../types';

export const audio = {
  'audio.title': 'Sorgente sonora',
  'audio.sound': 'Suono',
  'audio.preview': 'Anteprima del suono',
  'audio.volume': 'Volume',
  'audio.range': 'Raggio',
  'audio.loop': 'Ripeti',
} as const satisfies Record<string, Message>;
