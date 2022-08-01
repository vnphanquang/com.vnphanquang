<script lang="ts">
  import { clickoutside } from '@svelte-put/clickoutside';
  import { slide } from 'svelte/transition';

  export let id: string;
  export let ulClass = '';
  export let closeOnClick = true;
  export let expanded = false;

  function onClickOutside() {
    expanded = false;
  }

  function onUlClick() {
    if (closeOnClick) {
      expanded = false;
    }
  }
</script>

<div
  class="relative {$$props.class}"
  use:clickoutside={{ enabled: expanded }}
  on:clickoutside={onClickOutside}
>
  <label for={id}>
    <slot />
  </label>
  <input type="checkbox" id={id} hidden bind:checked={expanded} />
  {#if expanded}
    <ul
      class="absolute top-full right-0 mt-2 w-max rounded bg-bg py-2 shadow-center-xl {ulClass}"
      transition:slide={{ duration: 200 }}
      on:click={onUlClick}
    >
      <slot name="items" />
    </ul>
  {/if}
</div>
