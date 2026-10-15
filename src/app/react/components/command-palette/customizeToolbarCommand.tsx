import { t } from '../../../i18n';
import React from 'react';
import { PanelBottom } from 'lucide-react';
import type { CommandOption } from './types';

/** The palette's way into the toolbar editor: it starts edit mode in this view and closes the palette. */
export function customizeToolbarCommand(start: () => void, close: () => void): CommandOption {
  return {
    id: 'customize-toolbar',
    icon: <PanelBottom />,
    label: t('uiGeneral.customizeToolbarCommand_customizeToolbar'),
    keywords: ['toolbar', 'hide', 'reorder', 'arrange', 'tools', 'edit', 'customise'],
    section: 'settings',
    action: () => {
      start();
      close();
    },
  };
}
