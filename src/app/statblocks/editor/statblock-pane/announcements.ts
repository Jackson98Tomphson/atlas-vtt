import { t } from '../../../i18n';
import { Platform } from 'obsidian';

/** What the pane says after taking something out of the note: what went, and how to get it back. */
export function removedMessage(what: string, verb: 'Deleted' | 'Removed' = 'Deleted'): string {
  return t(verb === 'Removed' ? 'uiMessages.removedUndo' : 'uiMessages.deletedUndo', { what, key: Platform.isMacOS ? 'Cmd+Z' : 'Ctrl+Z' });
}
