import { AchievementCache } from '$lib/ui/cache/achievement.cache';

import { notificationService, type NotificationService } from '../notification';

import { ACHIEVEMENTS } from './achievement.constants';
import type { AchievementId } from './achievement.enum';

export class AchievementService {
  constructor(
    private readonly achievementCache: AchievementCache,
    private readonly notificationService: NotificationService,
  ) {
    this.achievementCache = achievementCache;
    this.notificationService = notificationService;
  }

  /**
   * Unlock an achievement and send toast notification.
   * If achievement is already unlocked, operation & notification are skipped,
   *
   * @param achievementId
   * @returns whether the operation was skipped because the achievement had already been unlocked
   */
  public async unlock(achievementId: AchievementId) {
    if (!this.achievementCache.unlocked(achievementId)) {
      this.achievementCache.unlock(achievementId);

      const achievement = ACHIEVEMENTS[achievementId];
      await this.notificationService.push({
        text: achievement.notification,
        title: achievement.name,
        variant: 'achievement',
        duration: 10000,
      });
      return false;
    }
    return true;
  }

  public async lock(achievementId: AchievementId) {
    this.achievementCache.lock(achievementId);
  }
}

export const achievementService = new AchievementService(
  new AchievementCache(),
  notificationService,
);
