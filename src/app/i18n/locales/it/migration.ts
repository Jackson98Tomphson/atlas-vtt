import type { Message } from '../../types';

export const migration = {
  'migration.running': 'Atlas: migrazione dei file di dati nelle cartelle nascoste…',
  'migration.errors': 'Atlas VTT: migrazione completata con {count} errori. Consulta la console per i dettagli.',
  'migration.done': 'Atlas VTT: migrazione di {count} file di dati completata.',
} as const satisfies Record<string, Message>;
