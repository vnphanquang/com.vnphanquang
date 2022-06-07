import type { AchievementId } from '../services/achievement/achievement.enum';

import { BrowserCache } from './base/browser.cache';

interface AchievementCacheData {
  unlocked: AchievementId[];
}

export class AchievementCache extends BrowserCache<AchievementCacheData> {
  public defaultCache: AchievementCacheData;

  constructor() {
    const defaultCache: AchievementCacheData = {
      unlocked: [],
    };
    super(defaultCache);
    this.defaultCache = defaultCache;
  }

  public get key() {
    return 'achievement';
  }

  public get storage() {
    return localStorage;
  }

  public unlocked(achievementId: AchievementId) {
    const cache = this.get() ?? this.defaultCache;
    return cache.unlocked.includes(achievementId);
  }

  public unlock(achievementId: AchievementId) {
    const cache = this.get() ?? this.defaultCache;
    this.set({
      ...cache,
      unlocked: [achievementId, ...cache.unlocked.filter((id) => id !== achievementId)],
    });
    return achievementId;
  }

  public lock(achievementId: AchievementId) {
    const cache = this.get() ?? this.defaultCache;
    this.set({
      ...cache,
      unlocked: cache.unlocked.filter((id) => id !== achievementId),
    });
    return achievementId;
  }
}
