<script lang="ts">
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import close from 'svelte-awesome/icons/close';
  import { fade } from 'svelte/transition';

  import { shortcut } from '$lib/ui/actions/shortcut';

  export let id: string;
  export let open = false;
  // TODO: find solution to make overlay works for multiple items with carousel style

  function onClose() {
    open = false;
  }
</script>

<input type="checkbox" {id} hidden bind:checked={open} />

<label for={id} class="cursor-pointer {$$props.class}">
  <slot {open} />
</label>

<svelte:window
  use:shortcut={{
    trigger: {
      key: 'Escape',
      callback: onClose,
      preventDefault: true,
      enabled: open,
    },
  }}
/>

{#if open}
  <aside class="fixed inset-0 z-overlay" transition:fade={{ duration: 200 }}>
    <label class="absolute inset-0 cursor-pointer bg-bg-accent/90" for={id} />
    <button
      type="button"
      on:click={onClose}
      class="c-btn-icon absolute top-4 right-4"
      aria-label="Close"
    >
      <Icon data={close} scale={2} />
    </button>
    <div class="inset-center absolute h-fit max-h-[90vh] w-fit max-w-[90vw]">
      {#if $$slots.overlay}
        <slot {open} name="overlay" />
      {:else}
        <slot {open} />
      {/if}
    </div>
  </aside>
{/if}
