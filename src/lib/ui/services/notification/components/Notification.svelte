<script lang="ts">
  import classnames from 'classnames';
  import { createEventDispatcher, onMount } from 'svelte';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import closeIcon from 'svelte-awesome/icons/close';
  import { linear } from 'svelte/easing';
  import { tweened } from 'svelte/motion';

  import { VariantToIconMap } from '../notification.constants';
  import type { AppNotificationVariant } from '../notification.types';

  const TICK = 20; // 20 miliseconds

  export let id = '';
  export let variant: AppNotificationVariant;
  export let icon = VariantToIconMap[variant];
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
    <span class="noti__icon">
      <Icon data={icon} scale={1.2} />
    </span>
    <p class="text-sm self-end">
      {text} Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat odio accusamus maiores! Numquam sit rem necessitatibus fugit consectetur similique cumque beatae ex, fuga tempore sint quam, minus architecto ab impedit.
    </p>
    {#if !hideDismiss || !persistent}
      <button type="button" class="c-btn-icon" on:click={onDismiss}>
        <Icon data={closeIcon} scale={1.2} />
      </button>
    {/if}
  </div>
  {#if progress}
    <progress value={$percentage} class="block h-1 w-full {variant}" />
  {/if}
</section>

<style lang="postcss">
  .noti {
    & .noti__content {
      @apply grid min-w-[240px] max-w-md grid-cols-[auto,1fr,auto] border-l-[6px] bg-bg-accent py-3 rounded shadow-lg gap-x-4 px-4 items-start;
    }

    & .noti__icon {}

    &.noti--progress {
      & .noti__content {
        border-bottom: 0;
      }
    }

    &.noti--info {
      & .noti__content {
        @apply border-blue-500 border-opacity-50;

        border-left-color: blue;
      }

      & .noti__icon {
        @apply text-blue-500;
      }
    }

    &.noti--success {
      & .noti__content {
        @apply border-green-500 border-opacity-50;

        border-left-color: green;
      }

      & .noti__icon {
        @apply text-green-500;
      }
    }

    &.noti--warning {
      & .noti__content {
        @apply border-orange-500 border-opacity-50;

        border-left-color: border-orange-500;
      }

      & .noti__icon {
        @apply text-orange-500;
      }
    }

    &.noti--error {
      & .noti__content {
        @apply border-red-500 border-opacity-50;

        border-left-color: red;
      }

      & .noti__icon {
        @apply text-red-500;
      }
    }
  }
</style>
