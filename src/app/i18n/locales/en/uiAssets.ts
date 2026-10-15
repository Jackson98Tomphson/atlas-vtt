import type { Message } from '../../types';

export const uiAssets = {
  'uiAssets.createCollectionModal_eGCurseOfTheCrimsonThrone': 'e.g. Curse of the Crimson Throne',
  'uiAssets.createCollectionModal_setsHowDistancesAreMeasuredAndWhichConditionsTokensCanHaveYouCanChange': 'Sets how distances are measured and which conditions tokens can have. You can change it later in the collection\'s settings.',
  'uiAssets.contentsList_whatSIncluded': 'What’s included',
  'uiAssets.tagListSkeleton_loadingTags': 'Loading tags',
  'uiAssets.advancedFilterPanel_readingStatblocks': 'Reading statblocks…',
  'uiAssets.assetContextMenu_createScene': 'Create Scene',
  'uiAssets.customSystemStep_eGMyHomebrew': 'e.g. My homebrew',
  'uiAssets.customSystemStep_resources': 'Resources',
  'uiAssets.filterSuggestions_yes': 'yes',
  'uiAssets.filterSuggestions_no': 'no',
  'uiAssets.statblockImportContent_ready': 'ready',
  'uiAssets.statblockImportContent_alreadyImported': 'already imported',
  'uiAssets.statblockImportContent_needAttention': 'need attention',
  'uiAssets.statblockImportContent_selected': 'selected',
  'uiAssets.statblockList_loadingStatblocks': 'Loading statblocks…',
  'uiAssets.statblockRoleSelect_none': 'None',
  'uiAssets.statblockRoleSelect_statblocks': 'Statblocks',
} as const satisfies Record<string, Message>;
