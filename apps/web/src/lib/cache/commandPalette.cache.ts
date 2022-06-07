import type { Command } from '$lib/components/CommandPalette';

import { BrowserCache } from './base/browser.cache';

interface CommandPaletteCacheData {
  limit: number;
  recentCommands: Array<Command['id']>;
}

export class CommandPaletteCache extends BrowserCache<CommandPaletteCacheData> {
  public defaultCache: CommandPaletteCacheData;

  constructor() {
    const defaultCache = {
      limit: 5,
      recentCommands: [],
    };
    super(defaultCache);
    this.defaultCache = defaultCache;
  }

  public get key() {
    return 'command-palette';
  }

  public get storage() {
    return localStorage;
  }

  public setLimit(limit: number) {
    this.set({
      ...(this.get() ?? this.defaultCache),
      limit,
    });
    return limit;
  }

  public addRecentCommand(commandId: Command['id']) {
    const cache = this.get() ?? this.defaultCache;
    const recentCommands = [
      commandId,
      ...cache.recentCommands.filter((id) => id !== commandId),
    ].slice(0, cache.limit);
    this.set({
      ...cache,
      recentCommands,
    });
    return recentCommands;
  }
  public getRecentCommands(): Array<Command['id']> {
    const cache = this.get() ?? this.defaultCache;
    return cache.recentCommands;
  }

  public get(): CommandPaletteCacheData {
    return super.get() ?? this.defaultCache;
  }
}
