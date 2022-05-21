export type CommandType = 'open' | 'run';
export type CommandScope = 'global' | 'about' | 'secret';
export interface CommandInfo {
  id: string;
  type: CommandType;
  description: string;
  scopes: CommandScope[];
  cacheable: boolean;
  secret?: string;
}
export interface CommandOpen extends CommandInfo {
  id: `open.${'internal' | 'external'}.${string}`;
  type: 'open';
  href: string;
}
export interface CommandRun extends CommandInfo {
  type: 'run';
}
export type Command = CommandOpen | CommandRun;
