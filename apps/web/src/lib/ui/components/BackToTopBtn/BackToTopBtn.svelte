<script lang="ts">
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import arrowUp from 'svelte-awesome/icons/arrowUp';
  import { fly } from 'svelte/transition';

  let scrollY = 0;
  let innerHeight = 0;
  $: shown = scrollY > innerHeight;

  function onClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<svelte:window bind:scrollY bind:innerHeight />

{#if shown}
  <button
    transition:fly={{ y: 100, duration: 200 }}
    type="button"
    on:click={onClick}
    class="c-btn-icon fixed bottom-4 right-4 z-navbar grid place-items-center rounded-full bg-fg p-4 text-bg shadow-lg"
    arial-label="Back to top"
  >
    <Icon data={arrowUp} scale={1.5} />
  </button>
{/if}
