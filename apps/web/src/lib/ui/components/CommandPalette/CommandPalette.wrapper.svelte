<script lang="ts">
  import { shortcut } from '@svelte-put/shortcut';
  import { fade } from 'svelte/transition';

  import { beforeNavigate } from '$app/navigation';
  import { CommandPalette } from '$lib/ui/components';

  let commandPalette = false;

  function closeCommandPalette() {
    commandPalette = false;
  }
  function toggleCommandPalette() {
    commandPalette = !commandPalette;
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
        modifier: ['ctrl', 'meta'],
        callback: toggleCommandPalette,
        preventDefault: true,
      },
      {
        key: 'Escape',
        callback: closeCommandPalette,
        enabled: commandPalette,
        preventDefault: true,
      },
    ],
  }}
/>

{#if commandPalette}
  <div
    transition:fade={{ duration: 200 }}
    class="fixed inset-0 z-command bg-fg/30"
    on:click={closeCommandPalette}
    aria-roledescription="backdrop"
    role="button"
  />
  <CommandPalette
    class="fixed top-[20%] left-1/2 z-command -translate-x-1/2"
    on:execute={closeCommandPalette}
  />
{/if}
