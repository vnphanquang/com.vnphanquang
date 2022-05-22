import type { AchievementId } from './achievement.enum';

export interface Achievement {
  id: AchievementId;
  name: string;
  notification: string;
}
