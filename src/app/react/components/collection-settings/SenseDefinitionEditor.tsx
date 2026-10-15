import { t } from '../../../i18n';
import React, { useEffect, useId, useRef } from 'react';
import { senseKind, senseNameProblem, senseProblem, withSenseKind, type SenseKind } from '../../../gameSystems/senseEditing';
import { withUnit } from '../../../lighting/tokenLighting';
import { Select, type SelectOption } from '../../../packages/components/primitives/Select';
import { ToggleSwitch } from '../../../packages/components/primitives/Toggle';
import type { SenseDefinition, SenseLook, SenseRange, SenseSight } from '../../../types/senseTypes';
import { numberText, parseNumberText, positiveNumber } from '../../../utils/numberInput';

const KINDS: SelectOption<SenseKind>[] = [
  { value: 'sense', label: t('uiSettings.senseDefinitionEditor_aSenseOfItsOwn') },
  { value: 'see-invisible', label: t('uiSettings.senseDefinitionEditor_letsTheTokenSSightSeeInvisibleCreatures') },
];

const RANGES: SelectOption<SenseRange>[] = [
  { value: 'required', label: t('uiSettings.senseDefinitionEditor_needsARange') },
  { value: 'optional', label: t('uiSettings.senseDefinitionEditor_rangeOptional') },
  { value: 'unlimited', label: t('uiSettings.senseDefinitionEditor_noRange') },
];

const IN_DIM: SelectOption<SenseSight['dim']>[] = [
  { value: 'none', label: t('uiSettings.senseDefinitionEditor_seesNothing') },
  { value: 'normal', label: t('uiSettings.senseDefinitionEditor_seesItAsItIs') },
  { value: 'as-bright', label: t('uiSettings.senseDefinitionEditor_seesItAsBrightLight') },
];

const IN_DARK: SelectOption<SenseSight['dark']>[] = [
  { value: 'none', label: t('uiSettings.senseDefinitionEditor_seesNothing') },
  { value: 'as-dim', label: t('uiSettings.senseDefinitionEditor_seesItAsDimLight') },
  { value: 'as-bright', label: t('uiSettings.senseDefinitionEditor_seesItAsBrightLight') },
];

const LOOKS: SelectOption<SenseLook>[] = [
  { value: 'colour', label: t('uiSettings.senseDefinitionEditor_inColour') },
  { value: 'monochrome', label: t('uiSettings.senseDefinitionEditor_inGrey') },
  { value: 'black-and-white', label: t('uiSettings.senseDefinitionEditor_inBlackAndWhite') },
  { value: 'heat', label: t('uiSettings.senseDefinitionEditor_asHeatTones') },
];

interface ChoiceProps<T extends string> {
  label: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  wide?: boolean;
}

function Choice<T extends string>({ label, value, options, onChange, wide = false }: ChoiceProps<T>): React.ReactElement {
  const id = useId();
  return (
    <div className={`atlas-csm-field${wide ? ' atlas-csm-sense-editor__wide' : ''}`}>
      <span id={id} className="atlas-csm-label">{label}</span>
      <Select value={value} options={options} onChange={onChange} labelledBy={id} />
    </div>
  );
}

function Switch({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }): React.ReactElement {
  const id = useId();
  return (
    <div className="atlas-csm-sense-editor__switch">
      <span id={id} className="atlas-csm-toggle-label">{label}</span>
      <ToggleSwitch value={value} onChange={() => onChange(!value)} labelledBy={id} />
    </div>
  );
}

interface SenseDefinitionEditorProps {
  sense: SenseDefinition;
  /** Every sense of the collection, for the name check. */
  all: readonly SenseDefinition[];
  /** Game unit of the collection, e.g. "ft". */
  unit: string;
  onChange: (sense: SenseDefinition) => void;
}

/** The fields of one of the collection's own senses, in plain words. */
export function SenseDefinitionEditor({ sense, all, unit, onChange }: SenseDefinitionEditorProps): React.ReactElement {
  const nameId = useId();
  const rangeId = useId();
  const problemId = useId();
  const fields = useRef<HTMLDivElement>(null);
  const problem = senseProblem(sense, all);
  const isSense = senseKind(sense) === 'sense';

  // The fields open at the end of a list that scrolls. Newer browsers return a promise from
  // scrollIntoView, which an effect must not hand back.
  useEffect(() => {
    void fields.current?.scrollIntoView?.({ block: 'nearest' });
  }, []);
  const set = (changes: Partial<SenseDefinition>): void => onChange({ ...sense, ...changes });

  const setRange = (range: SenseRange): void => {
    const { defaultRange: _defaultRange, ...rest } = sense;
    // Only a sense that needs a range has a default one.
    onChange(range === 'required' ? { ...sense, range } : { ...rest, range });
  };

  const setDefaultRange = (text: string): void => {
    const { defaultRange: _defaultRange, ...rest } = sense;
    const defaultRange = positiveNumber(parseNumberText(text));
    onChange(defaultRange === undefined ? rest : { ...rest, defaultRange });
  };

  return (
    <div ref={fields} className="atlas-csm-sense-editor">
      <div className="atlas-csm-field atlas-csm-sense-editor__wide">
        <label className="atlas-csm-label" htmlFor={nameId}>{t('uiSettings.senseDefinitionEditor_name')}</label>
        <input
          id={nameId}
          type="text"
          className="atlas-csm-input"
          value={sense.name}
          placeholder={t('uiSettings.senseDefinitionEditor_senseName')}
          aria-invalid={senseNameProblem(sense, all) ? true : undefined}
          aria-describedby={problem ? problemId : undefined}
          onChange={(event) => set({ name: event.target.value })}
        />
      </div>
      <Choice label={t('uiSettings.senseDefinitionEditor_kind')} value={senseKind(sense)} options={KINDS} onChange={(kind) => onChange(withSenseKind(sense, kind))} wide />
      {isSense && (
        <>
          <Choice label={t('uiSettings.senseDefinitionEditor_range')} value={sense.range} options={RANGES} onChange={setRange} />
          {sense.range === 'required' ? (
            <div className="atlas-csm-field">
              <label className="atlas-csm-label" htmlFor={rangeId}>{withUnit(t('uiSettingsDetails.senseDefinitionEditor_defaultRange'), unit)}</label>
              <input
                id={rangeId}
                type="number"
                className="atlas-csm-input"
                min={0}
                value={numberText(sense.defaultRange)}
                placeholder={t('uiSettings.senseDefinitionEditor_none')}
                onChange={(event) => setDefaultRange(event.target.value)}
              />
            </div>
          ) : <span />}
          <Choice label={t('uiSettings.senseDefinitionEditor_inDimLight')} value={sense.sees.dim} options={IN_DIM} onChange={(dim) => set({ sees: { ...sense.sees, dim } })} />
          <Choice label={t('uiSettings.senseDefinitionEditor_inDarkness')} value={sense.sees.dark} options={IN_DARK} onChange={(dark) => set({ sees: { ...sense.sees, dark } })} />
          {sense.sees.dark !== 'none' && sense.reveals === 'all' && (
            <Choice label={t('uiSettings.senseDefinitionEditor_lookInDarkness')} value={sense.look} options={LOOKS} onChange={(look) => set({ look })} wide />
          )}
          <Switch label={t('uiSettings.senseDefinitionEditor_throughWalls')} value={!sense.lineOfSight} onChange={(on) => set({ lineOfSight: !on })} />
          <Switch label={t('uiSettings.senseDefinitionEditor_seesInvisibleCreatures')} value={sense.seesInvisible} onChange={(seesInvisible) => set({ seesInvisible })} />
          <Switch label={t('uiSettings.senseDefinitionEditor_worksWhileBlinded')} value={sense.worksWhileBlinded} onChange={(worksWhileBlinded) => set({ worksWhileBlinded })} />
          <Switch label={t('uiSettings.senseDefinitionEditor_creaturesOnly')} value={sense.reveals === 'creatures'} onChange={(on) => set(on ? { reveals: 'creatures' } : { reveals: 'all', precise: true })} />
          {/* A sense that shows the map sees what it perceives; one that feels creatures may only sense them. */}
          {sense.reveals === 'creatures' && (
            <Switch label={t('uiSettings.senseDefinitionEditor_showsAsOutlines')} value={!sense.precise} onChange={(on) => set({ precise: !on })} />
          )}
        </>
      )}
      {problem && <p id={problemId} className="atlas-csm-hint atlas-csm-hint--error atlas-csm-sense-editor__wide">{problem}</p>}
    </div>
  );
}
