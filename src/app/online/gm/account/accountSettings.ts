import { t } from '../../../i18n';
import type { AtlasSettingSection } from '../../../settings/settingSections';
import type { AccountControl } from './AccountControl.ts';
import { accessText, accountText, planText, UNREACHABLE_TEXT, type AccountView } from './accountView.ts';

/** What the account row says. */
function accountDesc(view: AccountView): string {
  switch (view.kind) {
    case 'waiting': return t('uiOnlineDetails.accountSettings_approveTheSignInInYourBrowser');
    case 'checking': return t('uiOnlineDetails.accountSettings_checkingYourAccount');
    case 'unreachable': return UNREACHABLE_TEXT;
    case 'no-access': return t('uiOnlineDetails.accountSettings_signedInAsAccountAccess', { account: accountText(view.account), access: accessText(view.reason) });
    case 'can-host': return t('uiOnlineDetails.accountSettings_signedInAsAccountPlan', { account: accountText(view.account), plan: planText(view.access) });
    default: return t('uiOnlineDetails.accountSettings_notSignedInSignInToHostOnlineTablesWithYourAtlasAccount');
  }
}

const signedIn = (view: AccountView): boolean => view.kind === 'no-access' || view.kind === 'can-host' || view.kind === 'unreachable' || view.kind === 'checking';

/**
 * The settings' Account section: who is signed in, what the account may host or why it may not, and
 * the way to the account page, where invite keys are redeemed and the account's data is exported and deleted.
 */
export function accountSections(account: AccountControl): AtlasSettingSection[] {
  return [{
    heading: t('uiOnlineDetails.accountSettings_onlineAccount'),
    rows: [{
      name: t('uiOnlineDetails.accountSettings_atlasAccount'),
      desc: accountDesc(account.view()),
      // The row is drawn from the account as it is now and again whenever it changes, while the settings are open.
      render: (setting) => {
        const draw = (): void => {
          const view = account.view();
          setting.setDesc(accountDesc(view));
          setting.clear();
          if (signedIn(view)) setting.addButton((button) => button.setButtonText(t('uiOnline.accountSettings_signOut')).onClick(() => void account.signOut()));
          else if (view.kind === 'signed-out') setting.addButton((button) => button.setButtonText(t('uiOnline.accountSettings_signIn')).setCta().onClick(() => void account.signIn()));
          else if (view.kind === 'waiting') setting.addButton((button) => button.setButtonText(t('uiOnline.accountSettings_cancel')).onClick(() => account.cancelSignIn()));
          setting.addButton((button) => {
            button.setButtonText(t('uiOnline.accountSettings_openAccountPage')).onClick(() => account.openAccountPage());
            if (view.kind === 'no-access') button.setCta();
          });
        };
        draw();
        return account.onChange(draw);
      },
    }],
  }];
}
