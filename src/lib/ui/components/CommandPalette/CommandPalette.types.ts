export type CommandType = 'open' | 'run';
export interface CommandInfo {
  id: string;
  description: string;
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
