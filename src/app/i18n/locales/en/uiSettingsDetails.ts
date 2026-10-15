import type { Message } from '../../types';

export const uiSettingsDetails = {
  'uiSettingsDetails.conditionsTab_blinded': 'Blinded',
  'uiSettingsDetails.conditionsTab_invisible': 'Invisible',
  'uiSettingsDetails.conditionsTab_airborne': 'Airborne',
  'uiSettingsDetails.conditionsTab_undetected': 'Undetected',
  'uiSettingsDetails.conditionsTab_thisCondition': 'this condition',
  'uiSettingsDetails.initiativeFields_turnOrder': 'Turn order',
  'uiSettingsDetails.initiativeFields_sides': 'Sides',
  'uiSettingsDetails.initiativeFields_everyCombatantHasANumberRolledOrTypedAndTheyActFromTheH': 'Every combatant has a number, rolled or typed, and they act from the highest down.',
  'uiSettingsDetails.initiativeFields_thePlayersAndTheirOpponentsTakeTurnsAsTwoSidesInAnyOrde': 'The players and their opponents take turns as two sides, in any order within a side. Nothing is rolled.',
  'uiSettingsDetails.senseDefinitionEditor_defaultRange': 'Default range',
  'uiSettingsDetails.resourceCard_alwaysShown': 'always shown',
  'uiSettingsDetails.resourceCard_shownOnHover': 'shown on hover',
  'uiSettingsDetails.resourceFan_aStaticValueNeverDefeatsTheToken': 'A static value never defeats the token',
  'uiSettingsDetails.resourceFan_defeatsTheTokenWhenSpent': 'Defeats the token when spent',
  'uiSettingsDetails.resourceFan_doesNotDefeatTheToken': 'Does not defeat the token',
  'uiSettingsDetails.resourceFan_playersSeeIt': 'Players see it',
  'uiSettingsDetails.resourceFan_hiddenFromPlayers': 'Hidden from players',
  'uiSettingsDetails.senseRows_unknownSense': 'Unknown sense',
  'uiSettingsDetails.senseRows_range': 'Range',
  'uiSettingsDetails.senseRows_unlimited': 'Unlimited',
} as const satisfies Record<string, Message>;
