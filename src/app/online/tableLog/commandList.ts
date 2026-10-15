import { t } from '../../i18n';
/** A command of the message field, as the suggestions and the help list it. */
export interface CommandInfo {
  /** Its shortest spelling, without the slash. */
  readonly name: string;
  /** Its other spellings. */
  readonly aliases: readonly string[];
  /** What comes after it, as an example. */
  readonly usage: string;
  readonly description: string;
  /** Does what it does with nothing after it: Enter on it sends instead of completing it. */
  readonly standsAlone?: true;
}

/** Foundry VTT's chat commands, in the order they are offered. */
export const COMMANDS: readonly CommandInfo[] = [
  { name: 'r', aliases: ['roll'], usage: '1d20+5 # Attack', description: t('uiOnline.commandList_rollDiceInYourRollMode') },
  { name: 'pr', aliases: ['publicroll'], usage: '1d20', description: t('uiOnline.commandList_rollForEveryoneToSee') },
  { name: 'gmr', aliases: ['gmroll'], usage: '1d20', description: t('uiOnline.commandList_rollForYourselfAndTheGM') },
  { name: 'br', aliases: ['broll', 'blindr', 'blindroll'], usage: '1d20', description: t('uiOnline.commandList_rollBlindOnlyTheGMSeesTheResult') },
  { name: 'sr', aliases: ['selfroll'], usage: '1d20', description: t('uiOnline.commandList_rollForYourselfAlone') },
  { name: 'w', aliases: ['whisper'], usage: t('uiOnlineDetails.commandList_karaHelloOrWKaraGMHello'), description: t('uiOnline.commandList_whisperToSomeone') },
  { name: 'gm', aliases: [], usage: t('uiOnlineDetails.commandList_hello'), description: t('uiOnline.commandList_whisperToTheGM'), standsAlone: true },
  { name: 'players', aliases: [], usage: t('uiOnlineDetails.commandList_hello'), description: t('uiOnline.commandList_whisperToEveryPlayer'), standsAlone: true },
  { name: 'reply', aliases: [], usage: t('uiOnlineDetails.commandList_hello'), description: t('uiOnline.commandList_whisperBackToYourLastWhisper'), standsAlone: true },
  { name: 'ic', aliases: [], usage: t('uiOnlineDetails.commandList_hello'), description: t('uiOnline.commandList_sayItInCharacterAsYourToken') },
  { name: 'ooc', aliases: [], usage: t('uiOnlineDetails.commandList_hello'), description: t('uiOnline.commandList_sayItOutOfCharacterAsYourself') },
  { name: 'em', aliases: ['emote', 'me'], usage: t('uiOnlineDetails.commandList_drawsHerSword'), description: t('uiOnline.commandList_describeWhatYouDo') },
  { name: 'help', aliases: [], usage: '', description: t('uiOnline.commandList_showTheCommandsAndTheDiceNotation'), standsAlone: true },
];

/** The command a spelling names (any case), or null. */
export function commandNamed(word: string): CommandInfo | null {
  const spelling = word.toLowerCase();
  return COMMANDS.find((command) => command.name === spelling || command.aliases.includes(spelling)) ?? null;
}
