import { t } from '../../../i18n';
import React, { useState } from 'react';
import type { ConflictChoice } from '../../library/TemplateSession';
import { EditorBar } from './EditorBar';
import type { EditorSession, SessionSnapshot } from './sessionTypes';

/**
 * What happened to the file while the editor held unsaved changes (§8.7):
 * changed elsewhere (another device, git) or deleted. The editor writes
 * nothing until one of the choices is made.
 */
export function ConflictBar({ session, snapshot }: { session: EditorSession; snapshot: SessionSnapshot }): React.JSX.Element | null {
  const [busy, setBusy] = useState(false);
  if (!snapshot.conflict) return null;

  const choose = (choice: ConflictChoice): void => {
    setBusy(true);
    void session.resolveConflict(choice).finally(() => setBusy(false));
  };
  const text = snapshot.conflict === 'deleted'
    ? t('uiTemplateDetails.conflictBar_thisTemplateSFileWasDeletedWhileYouWereEditingIt')
    : t('uiTemplateDetails.conflictBar_thisTemplateWasChangedSomewhereElseWhileYouWereEditingI');
  const actions = snapshot.conflict === 'deleted'
    ? [
      { label: t('uiTemplateEditor.conflictBar_recreateIt'), primary: true, disabled: busy, onClick: () => choose('recreate') },
      { label: t('uiTemplateEditor.conflictBar_saveAsACopy'), disabled: busy, onClick: () => choose('save-copy') },
    ]
    : [
      { label: t('uiTemplateEditor.conflictBar_keepMine'), primary: true, disabled: busy, onClick: () => choose('keep-mine') },
      { label: t('uiTemplateEditor.conflictBar_useTheOther'), disabled: busy, onClick: () => choose('use-other') },
      { label: t('uiTemplateEditor.conflictBar_saveMineAsACopy'), disabled: busy, onClick: () => choose('save-copy') },
    ];

  return (
    <EditorBar tone="warning" text={text} actions={actions}>
      {snapshot.saveProblem && <p className="atlas-te-bar__detail">{snapshot.saveProblem}</p>}
    </EditorBar>
  );
}
