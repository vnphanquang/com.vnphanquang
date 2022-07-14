<script lang="ts">
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import { quintOut } from 'svelte/easing';
  import { fly, fade } from 'svelte/transition';

  import { t } from '$lib/services/i18n';

  import { notificationService } from '../notification.store';
  import type { AppNotification } from '../notification.types';

  import NotificationComponent from './Notification.svelte';

  const timeOutIdMap: Map<string, ReturnType<typeof setTimeout>> = new Map();

  function addAutoTimeout(notification: AppNotification): void {
    const { id, duration, persistent } = notification;
    if (!persistent) {
      timeOutIdMap.set(
        id,
        setTimeout(() => notificationService.pop(id), duration),
      );
    }
  }

  function onDismiss(event: CustomEvent<{ id: string }>) {
    const id = event.detail.id;
    const timeOutId = timeOutIdMap.get(id);
    if (timeOutId) {
      clearTimeout(timeOutId);
      timeOutIdMap.delete(id);
    }
    notificationService.pop(id);
  }

  onMount(() => {
    const unhook = notificationService.hook('push', addAutoTimeout);
    return unhook;
  });
</script>

<aside class={$$props.class}>
  <ul class="row-auto grid grid-cols-1 gap-y-4">
    {#each $notificationService as { onPopped, title, ...notification } (notification.id)}
      {@const localeTitle = title || $t(`notification.title.${notification.variant}`)}
      <li
        in:fly={{ x: 200, duration: 500 }}
        out:fade={{ duration: 350 }}
        animate:flip={{ easing: quintOut, duration: 500 }}
      >
        <NotificationComponent {...notification} title={localeTitle} on:dismiss={onDismiss} />
      </li>
    {/each}
  </ul>
</aside>
