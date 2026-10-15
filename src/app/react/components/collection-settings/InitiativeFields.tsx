import { t } from '../../../i18n';
/**
 * InitiativeFields — How the collection's initiative tracker runs a fight.
 */

import React from 'react';
import { ObsidianMenuDropdown } from '../ObsidianMenuDropdown';
import { isValidDefaultRoll } from '../../../gameSystems/diceRules';
import { SIDE_LABELS } from '../../../initiative/sides';
import type { FieldSuggestion } from '../../../resources/resourceFieldSuggestions';
import type { InitiativeMode, InitiativeRules, InitiativeSide } from '../../../types/initiativeRulesTypes';
import { InitiativeModifierFields } from './InitiativeModifierFields';

interface InitiativeFieldsProps {
  initiative: InitiativeRules;
  onChange: (initiative: InitiativeRules) => void;
  /** The statblock fields offered for the modifier (`initiativeFieldSuggestions`). */
  fieldSuggestions: readonly FieldSuggestion[];
}

const MODE_OPTIONS: Record<InitiativeMode, string> = {
  'turn-order': t('uiSettingsDetails.initiativeFields_turnOrder'),
  sides: t('uiSettingsDetails.initiativeFields_sides'),
};

const MODE_DESCRIPTIONS: Record<InitiativeMode, string> = {
  'turn-order': t('uiSettingsDetails.initiativeFields_everyCombatantHasANumberRolledOrTypedAndTheyActFromTheH'),
  sides: t('uiSettingsDetails.initiativeFields_thePlayersAndTheirOpponentsTakeTurnsAsTwoSidesInAnyOrde'),
};

export function InitiativeFields({ initiative, onChange, fieldSuggestions }: InitiativeFieldsProps): React.ReactElement {
  const rollValid = isValidDefaultRoll(initiative.roll);

  return (
    <>
      <div className="atlas-csm-field">
        <label className="atlas-csm-label">{t('uiSettings.initiativeFields_initiative')}</label>
        <ObsidianMenuDropdown
          className="atlas-setting-dropdown atlas-csm-dropdown"
          value={initiative.mode}
          options={MODE_OPTIONS}
          onChange={(value) => onChange({ ...initiative, mode: value as InitiativeMode })}
        />
        <p className="atlas-csm-hint">
          {MODE_DESCRIPTIONS[initiative.mode]} {t('uiSettings.initiativeFields_itAppliesToEverySceneOfTheCollectionAFightThatIsRunningKeepsTheWayItWa')}
        </p>
      </div>

      {initiative.mode === 'turn-order' ? (
        <>
          <div className="atlas-csm-field">
            <label className="atlas-csm-label" htmlFor="atlas-csm-initiative-roll">{t('uiSettings.initiativeFields_initiativeRoll')}</label>
            <input
              id="atlas-csm-initiative-roll"
              type="text"
              className="atlas-csm-input"
              placeholder="1d20"
              spellCheck={false}
              aria-invalid={!rollValid || undefined}
              value={initiative.roll}
              onChange={(e) => onChange({ ...initiative, roll: e.target.value })}
            />
            {!rollValid && (
              <p className="atlas-csm-hint atlas-csm-hint--error" role="alert">
                {t('uiSettings.initiativeFields_enterOneGroupOfDiceSuchAs1d20Or1d10')}
              </p>
            )}
          </div>
          <InitiativeModifierFields initiative={initiative} onChange={onChange} fieldSuggestions={fieldSuggestions} />
        </>
      ) : (
        <div className="atlas-csm-field">
          <label className="atlas-csm-label">{t('uiSettings.initiativeFields_actsFirst')}</label>
          <ObsidianMenuDropdown
            className="atlas-setting-dropdown atlas-csm-dropdown"
            value={initiative.firstSide}
            options={SIDE_LABELS}
            onChange={(value) => onChange({ ...initiative, firstSide: value as InitiativeSide })}
          />
          <p className="atlas-csm-hint">
            {t('uiSettings.initiativeFields_aTokenWithVisionSwitchedOnIsOnThePlayersSideMoveAnyOtherFromItsCardInT')}
          </p>
        </div>
      )}
    </>
  );
}
