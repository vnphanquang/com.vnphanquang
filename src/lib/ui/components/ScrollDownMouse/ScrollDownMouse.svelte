<script lang="ts">
  export let id: string | undefined = undefined;
  export let variant: 'static' | 'button' = 'static';

  const containerClass = `w-8 h-12 rounded-3xl border-2 flex justify-center border-current pt-2 text-fg ${$$props.class}`;
  const scrollerClass = 'scroller bg-current';
</script>

{#if variant === 'button'}
  <button class={containerClass} type="button" on:click {id}>
    <span class={scrollerClass} />
  </button>
{:else}
  <div class={containerClass} {id}>
    <span class={scrollerClass} />
  </div>
{/if}

<style>
  .scroller {
    margin-right: 1px;
    width: 3px;
    height: 8px;
    border-radius: 25%;
    animation-name: scroll;
    animation-duration: 2.2s;
    animation-timing-function: cubic-bezier(0.15, 0.41, 0.69, 0.94);
    animation-iteration-count: infinite;
  }

  @keyframes scroll {
    0% {
      opacity: 0;
    }
    10% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(10px);
      opacity: 0;
    }
  }
</style>
