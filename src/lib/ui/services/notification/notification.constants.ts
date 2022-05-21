import checkCircle from 'svelte-awesome/icons/checkCircle';
import exclamationCircle from 'svelte-awesome/icons/exclamationCircle';
import exclamationTriangle from 'svelte-awesome/icons/exclamationTriangle';
import infoCircle from 'svelte-awesome/icons/infoCircle';
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
    text: '',
    hideDismiss: false,
    persistent: false,
    progress: false,
    ...notification,
  };
}

export const VariantToIconMap: Record<AppNotificationVariant, unknown> = {
  info: infoCircle,
  success: checkCircle,
  warning: exclamationTriangle,
  error: exclamationCircle,
};
