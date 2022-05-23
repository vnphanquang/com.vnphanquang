import type { ValuesOf, FlattenRecord } from '$lib/types';

export type CommandType = 'open' | 'run';
export type CommandScope = 'global' | 'about' | 'secret';

export const COMMAND_ID_DICTIONARY = {
  run: {
    theme: {
      toggle: 'theme.toggle',
    },
  },
  open: {
    internal: {
      home: 'open.internal.home',
      about: 'open.internal.about',
      gallery: 'open.internal.gallery',
      blog: 'open.internal.blog',
      resume: 'open.internal.resume',
      exOcculto: {
        solanumLycopersicum: 'open.internal.exOcculto.solanumLycopersicum',
      },
    },
    external: {
      github: 'open.external.github',
      twitter: 'open.external.twitter',
      instagram: 'open.external.instagram',
      linkedin: 'open.external.linkedin',
      jsfiddle: 'open.external.jsfiddle',
      stackoverflow: 'open.external.stackoverflow',
      strava: 'open.external.strava',
    },
  },
} as const;
export type CommandIdDictionary = typeof COMMAND_ID_DICTIONARY;
export type CommandId = ValuesOf<FlattenRecord<CommandIdDictionary>>;

export interface CommandInfo {
  id: CommandId;
  type: CommandType;
  description: string;
  scopes: CommandScope[];
  cacheable: boolean;
  secret?: string;
}

export interface CommandOpen extends CommandInfo {
  id: ValuesOf<FlattenRecord<CommandIdDictionary['open']>>;
  type: 'open';
  href: string;
}

export interface CommandRun extends CommandInfo {
  id: ValuesOf<FlattenRecord<CommandIdDictionary['run']>>;
  type: 'run';
}

export type Command = CommandOpen | CommandRun;
