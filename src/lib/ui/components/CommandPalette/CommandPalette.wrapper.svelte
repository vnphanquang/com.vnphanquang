<script lang="ts">
  import { fade, fly } from 'svelte/transition';

  import { beforeNavigate } from '$app/navigation';
  import { shortcut } from '$lib/ui/actions/shortcut';
  import { CommandPalette } from '$lib/ui/components';

  let commandPalette = false;

  function onOpenCommandPalette() {
    commandPalette = true;
  }
  function onCloseCommandPalette() {
    commandPalette = false;
  }

  beforeNavigate(() => {
    commandPalette = false;
  });
</script>

<svelte:window
  use:shortcut={{
    trigger: [
      {
        key: 'k',
        modifier: 'ctrl',
        callback: onOpenCommandPalette,
        preventDefault: true,
      },
      {
        key: 'Escape',
        callback: onCloseCommandPalette,
        enabled: commandPalette,
        preventDefault: true,
      },
    ],
  }}
/>

{#if commandPalette}
  <div transition:fade={{ duration: 200 }} class="fixed inset-0 z-command bg-fg/30" />
  <div class="fixed inset-0 z-command" transition:fly={{ y: 80, duration: 200 }}>
    <CommandPalette
      class="absolute top-[20%] left-1/2 -translate-x-1/2"
      on:execute={onCloseCommandPalette}
    />
  </div>
{/if}
