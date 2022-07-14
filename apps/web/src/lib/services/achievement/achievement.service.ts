import { AchievementCache } from '$lib/cache/achievement.cache';
import { t } from '$lib/services/i18n';

import { notificationService, type NotificationService } from '../notification';

import type { AchievementId } from './achievement.enum';

export class AchievementService {
  constructor(
    private readonly i18nService: typeof t,
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

      const title = this.i18nService.get(`achievement.${achievementId}.title`);
      const text = this.i18nService.get(`achievement.${achievementId}.notification`);
      await this.notificationService.push({
        text,
        title,
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
  t,
  new AchievementCache(),
  notificationService,
);
