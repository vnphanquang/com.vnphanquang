<script lang="ts">
  import classnames from 'classnames';
  import { createEventDispatcher, onMount } from 'svelte';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import closeIcon from 'svelte-awesome/icons/close';
  import { linear } from 'svelte/easing';
  import { tweened } from 'svelte/motion';

  import { VariantToIconMap, VariantToTitleMap } from '../notification.constants';
  import type { AppNotificationVariant } from '../notification.types';

  const TICK = 20; // 20 miliseconds

  export let id = '';
  export let variant: AppNotificationVariant;
  export let icon = VariantToIconMap[variant];
  export let title = VariantToTitleMap[variant];
  export let text = '';
  export let duration = 0;
  export let progress = false;
  export let persistent = false;
  export let hideDismiss = false;

  const percentage = tweened(0, {
    duration: 100,
    easing: linear,
  });

  const dispatch = createEventDispatcher<{
    dismiss: { id: string };
    timeout: void;
  }>();

  function onDismiss() {
    dispatch('dismiss', { id });
  }

  const perTick = 1 / (duration / 20);

  onMount(() => {
    if (progress) {
      const interval = setInterval(() => {
        percentage.update((p) => {
          const newPercentage = Math.min(p + perTick, 1);
          if (newPercentage === 1) {
            dispatch('timeout');
            clearInterval(interval);
          }
          return newPercentage;
        });
      }, TICK);
      return () => clearInterval(interval);
    }
  });
</script>

<section class={classnames('noti', `noti--${variant}`, progress && 'noti--progress')}>
  <div class="noti__content">
    <p class="noti__icon mt-[2px]">
      <Icon data={icon} scale={2} />
    </p>
    <div class="">
      <h6 class="text-lg font-bold">
        {title}
      </h6>
      <p class="mt-2 text-sm">
        {text}
      </p>
    </div>
  </div>
  {#if progress}
    <progress value={$percentage} class="block h-1 w-full {variant}" />
  {/if}
  {#if !hideDismiss && !persistent}
    <button type="button" class="c-btn-icon absolute top-2 right-2" on:click={onDismiss}>
      <Icon data={closeIcon} scale={1.2} />
    </button>
  {/if}
</section>

<style lang="postcss">
  .noti {
    & .noti__content {
      @apply relative min-w-[240px] max-w-md rounded border-l-[6px] bg-bg-accent py-3 px-4 shadow-lg;
      @apply grid grid-cols-[auto,1fr] items-start gap-x-4;
    }

    & .noti__icon {
    }

    &.noti--progress {
      & .noti__content {
        @apply rounded-none rounded-t;
      }
    }

    &.noti--info {
      & .noti__content {
        @apply border-blue-500 border-opacity-50;

        border-left-color: theme('colors.blue.500');
      }

      & .noti__icon {
        @apply text-blue-500;
      }
    }

    &.noti--success {
      & .noti__content {
        @apply border-green-500 border-opacity-50;

        border-left-color: theme('colors.green.500');
      }

      & .noti__icon {
        @apply text-green-500;
      }
    }

    &.noti--warning {
      & .noti__content {
        @apply border-orange-500 border-opacity-50;

        border-left-color: theme('colors.orange.500');
      }

      & .noti__icon {
        @apply text-orange-500;
      }
    }

    &.noti--error {
      & .noti__content {
        @apply border-red-500 border-opacity-50;

        border-left-color: theme('colors.red.500');
      }

      & .noti__icon {
        @apply text-red-500;
      }
    }

    &.noti--achievement {
      & .noti__content {
        @apply border-amber-600 border-opacity-50;

        border-left-color: theme('colors.amber.600');
      }

      & .noti__icon {
        @apply text-amber-600;
      }
    }
  }
</style>
