import type { Message } from '../../types';

export const wall = {
  'wall.placeDoor': 'Posiziona porta',
  'wall.placeSecretDoor': 'Posiziona porta segreta',
  'wall.direction': 'Direzione della luce',
  'wall.blockBoth': 'Blocca entrambi i lati',
  'wall.allowLeft': 'Consenti da sinistra',
  'wall.allowRight': 'Consenti da destra',
  'wall.deleteMany': { one: 'Elimina ({count} muro)', other: 'Elimina ({count} muri)' },
} as const satisfies Record<string, Message>;
