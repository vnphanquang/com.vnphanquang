import { AchievementId } from './achievement.enum';
import type { Achievement } from './achievement.types';

export const ACHIEVEMENTS: Record<AchievementId, Achievement> = {
  [AchievementId.powerUser]: {
    id: AchievementId.powerUser,
    name: 'Power User',
    notification:
      'Congratulations! You have unlocked this achievement by opening the Command Palette for the first time.',
  },
};
