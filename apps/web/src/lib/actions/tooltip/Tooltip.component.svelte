<script lang="ts">
  export let content = '';
  export let html = '';
</script>

<div id="tooltip" role="tooltip">
  {#if html}
    {@html html}
  {/if}
  {#if content}
    <p>{content}</p>
  {/if}
  <div id="arrow" data-popper-arrow />
</div>

<style lang="postcss">
  #tooltip {
    @apply z-tooltip rounded-lg bg-tooltip-bg py-2 px-3 text-sm text-tooltip-fg;
  }

  #arrow,
  #arrow::before {
    position: absolute;
    z-index: -1;
    width: 12px;
    height: 12px;
  }

  #arrow::before {
    @apply bg-tooltip-bg;

    content: '';
    transform: rotate(45deg);
  }

  :global(#tooltip[data-popper-placement^='bottom'] > #arrow) {
    top: -4px;
  }

  :global(#tooltip[data-popper-placement^='top'] > #arrow) {
    bottom: -4px;
  }

  :global(#tooltip[data-popper-placement^='left'] > #arrow) {
    right: -4px;
  }

  :global(#tooltip[data-popper-placement^='right'] > #arrow) {
    left: -4px;
  }
</style>
