import { t } from '../../../i18n';
/**
 * The glyphs and plain names the template editor's side panes show for
 * blocks, field types and meanings. The catalogue names its icons as lucide
 * names; these are the components behind them.
 */

import {
  AlignLeft, CircleDot, CircleHelp, Code, Columns3, Dices, Gauge, Hash, Heading, Image, List, ListTree, Minus, PanelTop, ScrollText,
  SquareSplitHorizontal, SquareStack, Star, Subtitles, Table, Tags, Text, Type, type LucideIcon,
} from 'lucide-react';
import { blockSpec, type BlockIcon } from '../../model/blockCatalogue';
import type { BlockType, FieldType } from '../../model/templateTypes';

const BLOCK_GLYPHS: Readonly<Record<BlockIcon, LucideIcon>> = {
  heading: Heading, text: Text, hash: Hash, subtitles: Subtitles, list: List, table: Table, gauge: Gauge, image: Image,
  'square-stack': SquareStack, 'columns-3': Columns3, minus: Minus, code: Code, 'circle-help': CircleHelp, 'panel-top': PanelTop,
  'square-split-horizontal': SquareSplitHorizontal,
};

export function blockGlyph(type: BlockType): LucideIcon {
  return BLOCK_GLYPHS[blockSpec(type).icon];
}

/** What a field holds, in the words the editor uses. */
export const FIELD_TYPE_LABELS: Readonly<Record<FieldType, string>> = {
  text: t('uiTemplateEditor.editorGlyphs_text'), markdown: t('uiTemplateDetails.editorGlyphs_paragraphs'), number: t('uiTemplateDetails.editorGlyphs_number'), rating: t('uiTemplateDetails.editorGlyphs_rating'), dice: t('uiTemplateDetails.editorGlyphs_dice'), choice: t('uiTemplateDetails.editorGlyphs_oneOfAList'),
  list: t('uiTemplateDetails.editorGlyphs_words'), scores: t('uiTemplateDetails.editorGlyphs_tableValues'), entries: t('uiTemplateDetails.editorGlyphs_namesAndText'), pairs: t('uiTemplateDetails.editorGlyphs_labelsAndValues'), image: t('uiTemplateDetails.editorGlyphs_picture'),
  spells: t('uiTemplateDetails.editorGlyphs_groupsWithItems'),
};

const FIELD_TYPE_GLYPHS: Readonly<Record<FieldType, LucideIcon>> = {
  text: Type, markdown: AlignLeft, number: Hash, rating: Star, dice: Dices, choice: CircleDot,
  list: Tags, scores: Table, entries: ScrollText, pairs: List, image: Image, spells: ListTree,
};

export function fieldTypeGlyph(type: FieldType): LucideIcon {
  return FIELD_TYPE_GLYPHS[type];
}

