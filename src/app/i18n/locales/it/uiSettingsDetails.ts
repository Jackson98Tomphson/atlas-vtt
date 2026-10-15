import type { Message } from '../../types';

export const uiSettingsDetails = {
  'uiSettingsDetails.conditionsTab_blinded': 'Accecato',
  'uiSettingsDetails.conditionsTab_invisible': 'Invisibile',
  'uiSettingsDetails.conditionsTab_airborne': 'In volo',
  'uiSettingsDetails.conditionsTab_undetected': 'Non individuato',
  'uiSettingsDetails.conditionsTab_thisCondition': 'questa condizione',
  'uiSettingsDetails.initiativeFields_turnOrder': 'Ordine dei turni',
  'uiSettingsDetails.initiativeFields_sides': 'Squadre',
  'uiSettingsDetails.initiativeFields_everyCombatantHasANumberRolledOrTypedAndTheyActFromTheH': 'Ogni combattente ha un valore, ottenuto con un tiro o inserito a mano, e agisce in ordine decrescente.',
  'uiSettingsDetails.initiativeFields_thePlayersAndTheirOpponentsTakeTurnsAsTwoSidesInAnyOrde': 'I giocatori e i loro avversari si alternano come due squadre, in qualsiasi ordine all’interno di ciascuna. Non vengono effettuati tiri.',
  'uiSettingsDetails.senseDefinitionEditor_defaultRange': 'Raggio predefinito',
  'uiSettingsDetails.resourceCard_alwaysShown': 'sempre visibile',
  'uiSettingsDetails.resourceCard_shownOnHover': 'visibile al passaggio del puntatore',
  'uiSettingsDetails.resourceFan_aStaticValueNeverDefeatsTheToken': 'Un valore statico non sconfigge mai il token',
  'uiSettingsDetails.resourceFan_defeatsTheTokenWhenSpent': 'Sconfigge il token quando si esaurisce',
  'uiSettingsDetails.resourceFan_doesNotDefeatTheToken': 'Non sconfigge il token',
  'uiSettingsDetails.resourceFan_playersSeeIt': 'Visibile ai giocatori',
  'uiSettingsDetails.resourceFan_hiddenFromPlayers': 'Nascosto ai giocatori',
  'uiSettingsDetails.senseRows_unknownSense': 'Senso sconosciuto',
  'uiSettingsDetails.senseRows_range': 'Raggio',
  'uiSettingsDetails.senseRows_unlimited': 'Illimitato',
} as const satisfies Record<string, Message>;
