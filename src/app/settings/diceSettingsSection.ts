import { t } from '../i18n';
import type { Setting } from 'obsidian';
import { DICE_DISPLAY_HINTS, DICE_DISPLAY_OPTIONS, isDiceDisplay } from '../dice3d/diceDisplay';
import { DICE_COLOUR_OPTIONS, DICE_FONT_OPTIONS, isDiceColour, isDiceFont } from '../dice3d/diceLook';
import type { SettingsService } from '../services/SettingsService';
import type { AtlasSettingSection } from './settingSections';

type Options = readonly { value: string; label: string }[];

function optionLabels(options: Options): Record<string, string> {
  return Object.fromEntries(options.map(({ value, label }) => [value, label]));
}

const DISPLAY_LABELS = optionLabels(DICE_DISPLAY_OPTIONS);

/** A dropdown for one part of the dice look, which can also change from the command palette. */
function addLookDropdown(
  setting: Setting,
  settings: SettingsService,
  options: Options,
  read: () => string,
  write: (value: string) => void,
): (() => void) | undefined {
  let unsubscribe: (() => void) | undefined;
  setting.addDropdown((dropdown) => {
    dropdown.addOptions(optionLabels(options)).setValue(read()).onChange(write);
    unsubscribe = settings.onChange(() => { dropdown.setValue(read()); });
  });
  return unsubscribe;
}

/** How dice rolls are shown. */
export function diceSettingsSection(settings: SettingsService): AtlasSettingSection {
  return {
    heading: t('uiGeneral.diceDisplay_dice'),
    rows: [{
      name: t('uiGeneral.commandPalette_rollDisplay'),
      desc: DICE_DISPLAY_HINTS[settings.getDiceDisplay()],
      aliases: ['dice', 'roll', 'animation', '3d', 'toast', 'speed', 'fast'],
      render: (setting) => {
        let unsubscribe: (() => void) | undefined;
        setting.addDropdown((dropdown) => {
          dropdown.addOptions(DISPLAY_LABELS)
            .setValue(settings.getDiceDisplay())
            .onChange((value) => {
              if (isDiceDisplay(value)) settings.setDiceDisplay(value);
            });
          // The choice can also change from the command palette.
          unsubscribe = settings.onChange(() => {
            const display = settings.getDiceDisplay();
            dropdown.setValue(display);
            setting.setDesc(DICE_DISPLAY_HINTS[display]);
          });
        });
        return unsubscribe;
      },
    }, {
      name: t('uiGeneral.diceColourStrip_diceColour'),
      desc: t('uiMessages.diceColourHint'),
      aliases: ['dice', 'colour', 'color', 'skin', 'accent', 'dark'],
      render: (setting) => addLookDropdown(
        setting,
        settings,
        DICE_COLOUR_OPTIONS,
        () => settings.getDiceLook().colour,
        (value) => {
          if (isDiceColour(value)) settings.setDiceLook({ colour: value });
        },
      ),
    }, {
      name: t('uiMessages.diceNumbers'),
      desc: t('uiMessages.diceNumbersHint'),
      aliases: ['dice', 'font', 'numbers', 'sci-fi', 'medieval', 'cyberpunk'],
      render: (setting) => addLookDropdown(
        setting,
        settings,
        DICE_FONT_OPTIONS,
        () => settings.getDiceLook().font,
        (value) => {
          if (isDiceFont(value)) settings.setDiceLook({ font: value });
        },
      ),
    }],
  };
}
