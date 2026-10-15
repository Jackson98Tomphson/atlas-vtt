import { t } from '../i18n';
// Type-only: that module imports SettingsService at runtime, which imports this catalog.
import type { ExperimentalFeatureId } from '../experimental/experimentalFeatures';
import type { MapHotkeyId } from '../keyboard/mapHotkeys';
import { AMBIENT_AUDIO_ENABLED } from '../featureFlags';

/** One control of the main toolbar, as the settings and the toolbar editor know it. */
export interface ToolbarControlDefinition {
  id: string;
  /** Heading of the editor's card and the name screen readers hear in the editor. */
  label: string;
  /** One plain sentence for the editor's card. */
  description: string;
  hotkey: MapHotkeyId;
  /** Only in the GM's bar; the player view's bar has move, measure and dice. */
  dmOnly: boolean;
  /** Build gate, as `MAP_HOTKEYS` writes it. */
  enabled?: boolean;
  /** Runtime gate: on only while the GM has the feature switched on. */
  experimental?: ExperimentalFeatureId;
  /** Every control can be hidden except the way into the editor. */
  hideable: boolean;
}

/** The main toolbar's controls in their default order. Never rename an id: stored layouts use them. */
export const TOOLBAR_CONTROLS = [
  {
    id: 'move', label: t('uiToolbar.toolbarCatalog_moveAndSelect'), hotkey: 'move', dmOnly: false, hideable: true,
    description: t('uiToolbar.toolbarCatalog_selectAndMoveTokensOrPointAtTheMapWithTheLaserPointer'),
  },
  {
    id: 'fog', label: t('uiToolbar.toolbarCatalog_fogOfWar'), hotkey: 'fog', dmOnly: true, hideable: true,
    description: t('uiToolbar.toolbarCatalog_hidePartsOfTheMapFromYourPlayersAndRevealThemAsTheyExplore'),
  },
  {
    id: 'draw', label: t('uiToolbar.toolbarCatalog_draw'), hotkey: 'draw', dmOnly: true, hideable: true,
    description: t('uiToolbar.toolbarCatalog_drawLinesAndPlaceIconsOnTheMapAndEraseThemAgain'),
  },
  {
    id: 'text', label: t('uiToolbar.toolbarCatalog_text'), hotkey: 'text', dmOnly: true, hideable: true,
    description: t('uiToolbar.toolbarCatalog_writeLabelsAndShortNotesStraightOntoTheMap'),
  },
  {
    id: 'measure', label: t('uiToolbar.toolbarCatalog_measure'), hotkey: 'measure', dmOnly: false, hideable: true,
    description: t('uiToolbar.toolbarCatalog_measureADistanceOrTheReachOfACircleOrConeInYourGridSUnits'),
  },
  {
    id: 'wall', label: t('uiToolbar.toolbarCatalog_lighting'), hotkey: 'wall', dmOnly: true, hideable: true, experimental: 'dynamicLighting',
    description: t('uiToolbar.toolbarCatalog_drawWallsAndDoorsPlaceLightsAndDecideWhatEachTokenCanSee'),
  },
  {
    id: 'pin', label: t('uiToolbar.toolbarCatalog_notePin'), hotkey: 'pin', dmOnly: true, hideable: true,
    description: t('uiToolbar.toolbarCatalog_pinANoteOrALinkToAnotherSceneOntoASpotOnTheMap'),
  },
  {
    id: 'audio', label: t('uiToolbar.toolbarCatalog_ambientSound'), hotkey: 'audio', dmOnly: true, hideable: true, enabled: AMBIENT_AUDIO_ENABLED,
    description: t('uiToolbar.toolbarCatalog_placeSoundsOnTheMapThatGrowLouderAsTokensComeNear'),
  },
  {
    id: 'dice', label: t('uiToolbar.toolbarCatalog_dice'), hotkey: 'diceTray', dmOnly: false, hideable: true,
    description: t('uiToolbar.toolbarCatalog_rollAnyMixOfDiceAndShowTheResultToEveryoneAtTheTable'),
  },
  {
    id: 'loot', label: t('uiToolbar.toolbarCatalog_randomTables'), hotkey: 'lootRoller', dmOnly: true, hideable: true,
    description: t('uiToolbar.toolbarCatalog_rollOnTheRandomTablesInYourNotesAndLootBases'),
  },
  {
    id: 'assets', label: t('uiToolbar.toolbarCatalog_assetManager'), hotkey: 'assets', dmOnly: true, hideable: true,
    description: t('uiToolbar.toolbarCatalog_findAndPlaceYourMapsTokensScenesAndEncounters'),
  },
  {
    id: 'palette', label: t('uiToolbar.toolbarCatalog_commandPalette'), hotkey: 'palette', dmOnly: true, hideable: false,
    description: t('uiToolbar.toolbarCatalog_findAnyAtlasCommandOrSettingByTypingItsName'),
  },
] as const satisfies readonly ToolbarControlDefinition[];

export type ToolbarControlId = (typeof TOOLBAR_CONTROLS)[number]['id'];

/**
 * The undo/redo bar, which the editor hides and shows as one unit like a
 * control. It is a bar of its own left of the main toolbar, never part of the
 * main bar's order. Never rename its id: stored layouts use it.
 */
export const UNDO_BAR = {
  id: 'undo', label: t('uiToolbar.toolbarCatalog_undoAndRedo'), hotkey: 'undo', dmOnly: true, hideable: true,
  description: t('uiToolbar.toolbarCatalog_stepBackThroughYourChangesOnTheMapOrForwardAgain'),
} as const satisfies ToolbarControlDefinition;

export const UNDO_BAR_ID = UNDO_BAR.id;

/** What the editor can hide and show: the main toolbar's controls and the undo/redo bar. */
export type ToolbarUnitId = ToolbarControlId | typeof UNDO_BAR_ID;

export const DEFAULT_TOOLBAR_ORDER: readonly ToolbarControlId[] = TOOLBAR_CONTROLS.map(control => control.id);

const CONTROLS_BY_ID = new Map<string, ToolbarControlDefinition>(TOOLBAR_CONTROLS.map(control => [control.id, control]));
const UNITS_BY_ID = new Map<string, ToolbarControlDefinition>([...CONTROLS_BY_ID, [UNDO_BAR_ID, UNDO_BAR]]);

export function isToolbarControlId(id: string): id is ToolbarControlId {
  return CONTROLS_BY_ID.has(id);
}

export function toolbarControl(id: ToolbarControlId): ToolbarControlDefinition {
  const control = CONTROLS_BY_ID.get(id);
  if (!control) throw new Error(`Unknown toolbar control: ${id}`);
  return control;
}

export function isToolbarUnitId(id: string): id is ToolbarUnitId {
  return UNITS_BY_ID.has(id);
}

/** A control of the main toolbar, or the undo/redo bar. */
export function toolbarUnit(id: ToolbarUnitId): ToolbarControlDefinition {
  const unit = UNITS_BY_ID.get(id);
  if (!unit) throw new Error(`Unknown toolbar unit: ${id}`);
  return unit;
}

/**
 * Whether the user may hide the control or the undo/redo bar; false for the
 * Command palette and for ids this version does not know.
 */
export function isHideableToolbarControl(id: string): boolean {
  return UNITS_BY_ID.get(id)?.hideable ?? false;
}

/** The controls a view offers, gated like its hotkeys (`availableHotkeys`). */
export function availableToolbarControls(player: boolean, isOn: (feature: ExperimentalFeatureId) => boolean): ReadonlySet<ToolbarControlId> {
  const offered = TOOLBAR_CONTROLS.filter((control: ToolbarControlDefinition) =>
    control.enabled !== false
    && (control.experimental === undefined || isOn(control.experimental))
    && !(player && control.dmOnly));
  return new Set(offered.map(control => control.id));
}
