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

<input type="checkbox" {id} hidden bind:checked={open}>

{#if $$slots.static}
  <label for={id} class="cursor-pointer">
    <slot {open} name="static" />
  </label>
{/if}

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
  <aside
    class="fixed inset-0 z-overlay" transition:fade={{ duration: 200 }}
  >
    <label
      class="absolute inset-0 cursor-pointer bg-bg-accent/90"
      for={id}
    />
    <button
      type="button"
      on:click={onClose}
      class="c-btn-icon absolute top-4 right-4"
      aria-label="Close"
    >
      <Icon data={close} scale={2} />
    </button>
    <div class="absolute inset-center w-fit h-fit max-w-[90vw] max-h-[90vh]">
      <slot {open} />
    </div>
  </aside>
{/if}
