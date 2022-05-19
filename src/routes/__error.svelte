<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  import { NotFoundBlog } from '$lib/ui/errors';

  export const load: Load = ({ error, status }) => {
    return {
      props: {
        error,
        status,
      },
    };
  };
</script>

<script lang="ts">

  export let error: Error;
  export let status: number;

  let isNotFoundBlog = error?.name === NotFoundBlog.name;
</script>

<main class="h-full grid place-items-center place-content-center px-8 md:px-10 gap-y-10">
  <h1 class="text-8xl font-bold uppercase grid grid-cols-3 gap-x-2 status">
    {#each status.toString() as letter}
      <span>{letter}</span>
    {/each}
  </h1>
  <p>
    {error.message}
  </p>
  <h2 class="text-xl text-center max-w-xl">
    {#if status === 404}
      {#if isNotFoundBlog}
        Oops, no blog with that name exists yet.
      {:else}
        The resource you are looking for is not available.
      {/if}
    {:else}
      Something went bonkers!
    {/if}
    Maybe try a different formula?
  </h2>
  <div class="relative">
    <img src="/images/chemistry/flasks.svg" alt="chemistry flasks" width="100">
    <img src="/images/chemistry/molecule1.svg" alt="molecule 1" width="30" class="absolute bottom-[80%] left-[80%] rotate-12">
    <img src="/images/chemistry/molecule2.svg" alt="molecule 2" width="30" class="absolute bottom-[90%] right-[80%] rotate-12">
  </div>
  <button class="c-btn uppercase text-sm" type="button" on:click={() => history.back()}>
    Go Back
  </button>
</main>

<style>
  .status span {
    @apply text-bg relative h-32 w-32 grid place-items-center overflow-hidden bg-primary;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }
  .status span::before {
    @apply absolute inset-0;
    content: '';
    z-index: -1;
  }

  .status span::after {
    @apply absolute inset-0;
    z-index: 1;
    content: '';
  }
  .status span:nth-of-type(1)::before {
    background-image: url('/images/chemistry/test-tube.svg');
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: 13% 92%;
  }
  .status span:nth-of-type(1)::after {
    background-image: url('/images/chemistry/burrette.svg');
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: 82% 30%;
  }
  .status span:nth-of-type(2)::before {
    opacity: .25;
    background-image: url('/images/binary.svg');
    background-size: 40%;
    background-repeat: repeat;
  }
  .status span:nth-of-type(2)::after {
    background-image: url('/images/bug.svg');
    background-size: 30%;
    background-repeat: no-repeat;
    background-position-y: bottom;
    background-position-x: 50%;
    transform: rotate(140deg);
  }
  .status span:nth-of-type(3)::before {
    opacity: 0.5;
    background-image: url('/images/forest-mountain.png');
    background-size: 90%;
    background-repeat: no-repeat;
    background-position-y: 15%;
    background-position-x: right;
  }
  .status span:nth-of-type(3)::after {
    background-image: url('/images/owl.svg');
    background-repeat: no-repeat;
    background-size: 38%;
    background-position-x: 50%;
    background-position-y: 94%;
    transform: rotate(28deg);
  }
</style>
