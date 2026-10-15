import { t } from '../../i18n';
/** Online play's commands. Each is offered only while online play is switched on and has something to do. */
export const ONLINE_COMMANDS = [
  { id: 'start-online-table', name: t('uiMessages.startOnlineTable') },
  { id: 'toggle-online-panel', name: t('uiMessages.toggleOnlinePanel') },
  { id: 'copy-online-table-link', name: t('uiMessages.copyOnlineLink') },
  { id: 'make-selected-player-tokens', name: t('uiMessages.makePlayerTokens') },
  { id: 'make-selected-gm-tokens', name: t('uiMessages.makeGmTokens') },
  { id: 'stop-online-table', name: t('uiMessages.stopOnlineTable') },
] as const;

export type OnlineCommandId = (typeof ONLINE_COMMANDS)[number]['id'];
