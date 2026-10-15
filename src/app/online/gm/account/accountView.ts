import { t } from '../../../i18n';
import type { AccessRefusal, AccountAnswer, AccountInfo, HostAccess } from './relayAccount.ts';

/**
 * What the dock and the settings show of the GM's account, as pure rules. The GM signs in with an
 * Atlas account, and the relay says what it may host or why it may not: nothing here decides that.
 */

/** A line that tells the GM why they are signed out. */
export type SignedOutNotice = 'timed-out' | 'declined' | 'server' | 'unreachable' | null;

export type AccountView =
  | { readonly kind: 'signed-out'; readonly notice: SignedOutNotice }
  /** The sign-in waits for approval in the browser; the code is null until the service gave one. */
  | { readonly kind: 'waiting'; readonly userCode: string | null }
  | { readonly kind: 'checking' }
  | { readonly kind: 'unreachable' }
  /** The relay says the account may not host; `reason` is null for one this version does not know. */
  | { readonly kind: 'no-access'; readonly account: AccountInfo; readonly reason: AccessRefusal | null }
  | { readonly kind: 'can-host'; readonly account: AccountInfo; readonly access: HostAccess };

/** What the account control knows when it decides what to show. */
export interface AccountFacts {
  readonly signingIn: boolean;
  readonly userCode: string | null;
  readonly token: boolean;
  /** The last answer of `/api/me` for this token; null until one came. */
  readonly me: AccountAnswer | 'unreachable' | null;
  readonly notice: SignedOutNotice;
}

export function accountView(facts: AccountFacts): AccountView {
  if (facts.signingIn) return { kind: 'waiting', userCode: facts.userCode };
  if (!facts.token) return { kind: 'signed-out', notice: facts.notice };
  if (facts.me === null) return { kind: 'checking' };
  if (facts.me === 'unreachable') return { kind: 'unreachable' };
  const { account } = facts.me;
  return facts.me.access === null ? { kind: 'no-access', account, reason: facts.me.reason } : { kind: 'can-host', account, access: facts.me.access };
}

const ACCESS_TEXT: Readonly<Record<AccessRefusal, string>> = {
  'no-access': t('uiMessages.noAccess'),
  'access-ended': t('uiMessages.accessEnded'),
  'access-revoked': t('uiMessages.accessRevoked'),
  'account-restricted': t('uiMessages.accountRestricted'),
  'terms-not-accepted': t('uiMessages.acceptTerms'),
};

/** What is said of an account that may not host, whatever the reason. */
export const NO_HOSTING_TEXT = t('uiMessages.noHosting');

/** Why the relay says the account may not host, and where the way on is: the account page. */
export const accessText = (reason: AccessRefusal | null): string => (reason === null ? t('uiMessages.noHostingAccount') : ACCESS_TEXT[reason]);

export const UNREACHABLE_TEXT = t('uiMessages.unreachableSignIn');
export const SERVER_SIGNED_OUT_TEXT = t('uiMessages.serverSignedOut');

/** The line under the sign-in button that says how the last sign-in ended. */
export function noticeText(notice: SignedOutNotice): string | null {
  switch (notice) {
    case 'timed-out': return t('uiMessages.signInTimedOut');
    case 'declined': return t('uiMessages.signInDeclined');
    case 'server': return SERVER_SIGNED_OUT_TEXT;
    case 'unreachable': return UNREACHABLE_TEXT;
    default: return null;
  }
}

const PLAN_NAMES: Readonly<Record<string, string>> = { beta: t('uiMessages.earlyAccess'), free: t('uiMessages.freePlan'), host: 'Host', staff: 'Staff' };

/** The plan in words: "Early access · up to 12 players". */
export function planText(access: HostAccess): string {
  return t('uiMessages.planPlayers', { plan: PLAN_NAMES[access.plan] ?? access.plan, count: access.maxPlayers });
}

/** "Mara (@mara)", or the handle alone where the name is the handle. */
export function accountText(account: AccountInfo): string {
  return account.name === '' || account.name === account.handle ? `@${account.handle}` : `${account.name} (@${account.handle})`;
}
