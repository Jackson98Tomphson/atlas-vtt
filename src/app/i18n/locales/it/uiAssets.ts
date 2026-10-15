import type { Message } from '../../types';

export const uiAssets = {
  'uiAssets.createCollectionModal_eGCurseOfTheCrimsonThrone': 'ad es. La maledizione del Trono Cremisi',
  'uiAssets.createCollectionModal_setsHowDistancesAreMeasuredAndWhichConditionsTokensCanHaveYouCanChange': 'Determina come si misurano le distanze e quali condizioni possono avere i token. Puoi modificarlo in seguito nelle impostazioni della collezione.',
  'uiAssets.contentsList_whatSIncluded': 'Contenuti inclusi',
  'uiAssets.tagListSkeleton_loadingTags': 'Caricamento delle etichette',
  'uiAssets.advancedFilterPanel_readingStatblocks': 'Lettura dei blocchi statistiche…',
  'uiAssets.assetContextMenu_createScene': 'Crea scena',
  'uiAssets.customSystemStep_eGMyHomebrew': 'ad es. Il mio sistema personalizzato',
  'uiAssets.customSystemStep_resources': 'Risorse',
  'uiAssets.filterSuggestions_yes': 'sì',
  'uiAssets.filterSuggestions_no': 'no',
  'uiAssets.statblockImportContent_ready': 'pronti',
  'uiAssets.statblockImportContent_alreadyImported': 'già importati',
  'uiAssets.statblockImportContent_needAttention': 'da controllare',
  'uiAssets.statblockImportContent_selected': 'selezionati',
  'uiAssets.statblockList_loadingStatblocks': 'Caricamento dei blocchi statistiche…',
  'uiAssets.statblockRoleSelect_none': 'Nessuno',
  'uiAssets.statblockRoleSelect_statblocks': 'Blocchi statistiche',
} as const satisfies Record<string, Message>;
