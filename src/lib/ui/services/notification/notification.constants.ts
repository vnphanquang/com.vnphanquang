import checkCircle from 'svelte-awesome/icons/checkCircle';
import exclamationCircle from 'svelte-awesome/icons/exclamationCircle';
import exclamationTriangle from 'svelte-awesome/icons/exclamationTriangle';
import infoCircle from 'svelte-awesome/icons/infoCircle';
import trophy from 'svelte-awesome/icons/trophy';
import { v4 as uuidv4 } from 'uuid';

import type {
  AppNotificationVariant,
  AppNotification,
  AppNotificationInput,
} from './notification.types';

export function createNotification(notification: AppNotificationInput): AppNotification {
  return {
    id: uuidv4(),
    duration: 4000,
    variant: 'info',
    title: VariantToTitleMap[notification.variant ?? 'info'],
    text: '',
    hideDismiss: false,
    persistent: false,
    progress: !notification.persistent,
    ...notification,
  };
}

export const VariantToIconMap: Record<AppNotificationVariant, unknown> = {
  info: infoCircle,
  success: checkCircle,
  warning: exclamationTriangle,
  error: exclamationCircle,
  achievement: trophy,
};

export const VariantToTitleMap: Record<AppNotificationVariant, string> = {
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
  achievement: 'Achievement',
};
