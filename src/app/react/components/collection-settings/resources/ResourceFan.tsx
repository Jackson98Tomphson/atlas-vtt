import { t } from '../../../../i18n';
import React from 'react';
import { ArrowDown, ArrowUp, Eye, EyeOff, Hash, Skull, Trash2 } from 'lucide-react';
import type { ResourceDefinition, ResourceDirection } from '../../../../resources/resourceTypes';
import { RadialFan, type FanButton } from '../fan/RadialFan';
import { fanOffsets, type SocketPlace } from './resourceSockets';

interface ResourceFanProps {
  place: SocketPlace;
  resource: ResourceDefinition;
  onChange: (partial: Partial<ResourceDefinition>) => void;
  onRemove: () => void;
}

/** How a resource counts, in the order the button steps through them. */
const DIRECTIONS: ReadonlyArray<{ direction: ResourceDirection; label: string; icon: React.ReactNode }> = [
  { direction: 'drains', label: t('uiSettings.resourceFan_drainsStartsFullAndCountsDown'), icon: <ArrowDown /> },
  { direction: 'fills', label: t('uiSettings.resourceFan_fillsStartsEmptyAndCountsUp'), icon: <ArrowUp /> },
  { direction: 'static', label: t('uiSettings.resourceFan_staticAFixedValueLikeAnArmourClass'), icon: <Hash /> },
];

/**
 * The round buttons that fan out of a selected socket: how the resource counts (drains,
 * fills, or a static value), whether it defeats its token, whether players see it, and remove. They leave the socket
 * one after the other along an arc on its outer side.
 */
export function ResourceFan({ place, resource, onChange, onRemove }: ResourceFanProps): React.ReactElement {
  const step = DIRECTIONS.findIndex(({ direction }) => direction === resource.direction);
  const counting = DIRECTIONS[step] ?? DIRECTIONS[0]!;
  const next = DIRECTIONS[(step + 1) % DIRECTIONS.length]!.direction;
  const fixed = resource.direction === 'static';
  const defeats = resource.defeatedWhenSpent === true && !fixed;
  const buttons: FanButton[] = [
    {
      label: counting.label,
      icon: counting.icon,
      // A static value is never spent, so it cannot defeat its token
      onClick: () => onChange(next === 'static' ? { direction: next, defeatedWhenSpent: false } : { direction: next }),
    },
    {
      label: fixed ? t('uiSettingsDetails.resourceFan_aStaticValueNeverDefeatsTheToken') : defeats ? t('uiSettingsDetails.resourceFan_defeatsTheTokenWhenSpent') : t('uiSettingsDetails.resourceFan_doesNotDefeatTheToken'),
      icon: <Skull />, pressed: defeats, disabled: fixed,
      onClick: () => onChange({ defeatedWhenSpent: !defeats }),
    },
    {
      label: resource.visibleToPlayers ? t('uiSettingsDetails.resourceFan_playersSeeIt') : t('uiSettingsDetails.resourceFan_hiddenFromPlayers'),
      icon: resource.visibleToPlayers ? <Eye /> : <EyeOff />, pressed: resource.visibleToPlayers,
      onClick: () => onChange({ visibleToPlayers: !resource.visibleToPlayers }),
    },
    { label: t('uiSettings.resourceFan_remove'), icon: <Trash2 />, danger: true, onClick: onRemove },
  ];
  // On the fan's outer side, so a tooltip never covers the buttons beside it
  const spots = fanOffsets(buttons.length, place.fanSide).map((offset) => ({ ...offset, side: place.fanSide }));
  return <RadialFan buttons={buttons} spots={spots} x={place.fanX} y={place.y} label={resource.name.trim() || undefined} />;
}
