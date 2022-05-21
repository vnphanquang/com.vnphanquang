import type { Command } from '$lib/ui/components/CommandPalette';

import { BrowserCache } from './base/browser.cache';

interface CommandPaletteCacheMap {
  limit: number;
  recentCommands: Array<Command['id']>;
}

export class CommandPaletteCache extends BrowserCache<CommandPaletteCacheMap> {
  public defaultCache: CommandPaletteCacheMap;

  constructor() {
    const defaultCache = {
      limit: 5,
      recentCommands: [],
    };
    super(defaultCache);
    this.defaultCache = defaultCache;
  }

  public get key(): string {
    return 'command-palette';
  }

  public get storage(): Storage {
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
    const recentCommands = [commandId, ...cache.recentCommands].slice(0, cache.limit);
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

  public get(): CommandPaletteCacheMap {
    return super.get() ?? this.defaultCache;
  }
}
