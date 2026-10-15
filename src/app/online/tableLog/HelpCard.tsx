import { t } from '../../i18n';
import { X } from 'lucide-react';
import type { ReactElement } from 'react';
import { LabelTooltip } from '../../packages/components/primitives/tooltip';
import { COMMANDS } from './commandList.ts';

/** The dice notation, by example, as Foundry VTT writes it. */
const NOTATION: readonly (readonly [string, string])[] = [
  ['2d20kh1', t('uiOnlineDetails.helpCard_advantageKeepTheHighest')],
  ['4d6kh3', t('uiOnlineDetails.helpCard_keepTheThreeHighest')],
  ['r1, ro<2, rr1', t('uiOnlineDetails.helpCard_rerollA1AnythingBelow2Once1sUntilNoneIsLeft')],
  ['x, xo, x>=9', t('uiOnlineDetails.helpCard_rollAgainOnTheHighestFaceOnceOnlyOn9OrMore')],
  ['!, !3, !i', t('uiOnlineDetails.helpCard_rollAgainOnceUpToThreeTimesWithoutEnd')],
  ['cs>=5, >=5', t('uiOnlineDetails.helpCard_countSuccessesFrom5')],
  ['cf<=1', t('uiOnlineDetails.helpCard_countFailuresUpTo1')],
  ['d%, dF', t('uiOnlineDetails.helpCard_percentileAndFateDice')],
  ['2d6[fire]', t('uiOnlineDetails.helpCard_nameAPartOfTheRoll')],
  ['+ - * / ( )', t('uiOnlineDetails.helpCard_arithmetic')],
  ['[[1d20+5]]', t('uiOnlineDetails.helpCard_inAMessageRolledAsItIsSent')],
  [t('uiOnlineDetails.helpCard_r1d202DexSave'), t('uiOnlineDetails.helpCard_inAMessageAButtonAnyoneCanRoll')],
  ['/r 1d20 # Attack', t('uiOnlineDetails.helpCard_describeTheRollAfter')],
];

const spellings = (name: string, aliases: readonly string[]): string => [name, ...aliases].map((word) => `/${word}`).join(' ');

/** The commands and the dice notation, in the panel above the message field. */
export function HelpCard({ onClose }: { readonly onClose: () => void }): ReactElement {
  return (
    <div className="atlas-online-log__help" role="region" aria-label={t('uiOnline.helpCard_chatHelp')}>
      <div className="atlas-online-log__help-head">
        <span className="atlas-online-log__help-title">{t('uiOnline.helpCard_commands')}</span>
        <LabelTooltip label={t('uiOnline.helpCard_closeHelp')}>
          <button type="button" className="atlas-online-log__strip-clear" onClick={onClose}><X /></button>
        </LabelTooltip>
      </div>
      <dl className="atlas-online-log__help-list">
        {COMMANDS.map((command) => (
          <div key={command.name} className="atlas-online-log__help-row">
            <dt className="atlas-online-log__help-term">{spellings(command.name, command.aliases)}</dt>
            <dd className="atlas-online-log__help-text">{command.description}</dd>
          </div>
        ))}
      </dl>
      <span className="atlas-online-log__help-title">{t('uiOnline.helpCard_dice')}</span>
      <dl className="atlas-online-log__help-list">
        {NOTATION.map(([term, text]) => (
          <div key={term} className="atlas-online-log__help-row">
            <dt className="atlas-online-log__help-term">{term}</dt>
            <dd className="atlas-online-log__help-text">{text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
