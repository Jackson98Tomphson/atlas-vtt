import type { Message } from '../../types';

export const count = {
  'count.assets': { one: '{count} risorsa', other: '{count} risorse' },
  'count.files': { one: '{count} file', other: '{count} file' },
  'count.items': { one: '{count} elemento', other: '{count} elementi' },
} as const satisfies Record<string, Message>;
