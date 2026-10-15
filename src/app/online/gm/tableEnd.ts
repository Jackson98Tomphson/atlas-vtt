import { getLocale, t } from '../../i18n';
import { CLOSE } from '../protocol/index.ts';

/**
 * How the relay closed a table's connection for good: another Obsidian took the table over (it lives
 * on there), its account may not host, its account started another table, or the server closed it
 * for any other reason. The relay decides each; the GM's side only says which it was.
 */
export type TableEnd = 'replaced' | 'no-access' | 'superseded' | 'refused';

/** The ends after which the table is gone from the server, so the saved table is dropped. */
export type LostTable = Exclude<TableEnd, 'replaced'>;

export function tableEndOf(closeCode: number | null): TableEnd {
  if (closeCode === CLOSE.replaced) return 'replaced';
  if (closeCode === CLOSE.noAccess) return 'no-access';
  if (closeCode === CLOSE.superseded) return 'superseded';
  return 'refused';
}

const END_TEXT: Readonly<Record<TableEnd, string>> = {
  replaced: t('uiMessages.tableReplaced'),
  'no-access': t('uiMessages.tableNoHosting'),
  superseded: t('uiMessages.tableSuperseded'),
  refused: t('uiMessages.tableRefused'),
};

/** What the GM is told when a table ended that way. */
export const tableEndText = (end: TableEnd): string => END_TEXT[end];

/**
 * When a table closes because its account may no longer host, written out in the GM's own time:
 * "12 October 2026 at 14:30". The relay names the moment; the account page is where access comes from.
 */
export function closingText(closesAt: number, locale = getLocale(), timeZone?: string): string {
  const when = new Date(closesAt).toLocaleString(locale, { dateStyle: 'long', timeStyle: 'short', ...(timeZone !== undefined && { timeZone }) });
  return t('uiMessages.tableClosing', { when });
}
