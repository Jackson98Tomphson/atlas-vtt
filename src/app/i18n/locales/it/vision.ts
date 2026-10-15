import type { Message } from '../../types';

export const vision = {
  'vision.range': 'Raggio visivo',
  'vision.angle': 'Angolo di visuale (°)',
  'vision.unlimited': 'Illimitato',
  'vision.unlimitedSight': 'Vista illimitata',
  'vision.allAround': 'Vedi in tutte le direzioni',
  'vision.angleHint': 'Segue la rotazione del token',
  'vision.withUnit': '{label} ({unit})',
  'vision.toggle': 'Visione',
  'vision.carriedLight': 'Luce trasportata',
  'vision.carryLight': 'Trasporta luce',
  'vision.defaultsIntro': 'I nuovi token iniziano con questi valori; la visione resta disattivata finché non la attivi per un token.',
} as const satisfies Record<string, Message>;
