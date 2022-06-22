<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  import { NotFoundBlog } from '$lib/errors';
  import { loadTranslations, locale, Locale } from '$lib/services/i18n';

  export const load: Load = ({ error, status }) => {
    loadTranslations(locale.get() ?? Locale.en);
    return {
      props: {
        error,
        status,
      },
    };
  };
</script>

<script lang="ts">
  import { t } from '$lib/services/i18n';

  export let error: Error;
  export let status: number;

  let isNotFoundBlog = error?.name === NotFoundBlog.name;
</script>

<main class="grid h-full place-content-center place-items-center gap-y-10 py-10 px-8 md:px-10">
  <h1 class="status grid grid-cols-3 gap-x-2 font-bold uppercase">
    {#each status.toString() as letter}
      <span>{letter}</span>
    {/each}
  </h1>
  <p>
    {error.message}
  </p>
  <h2 class="max-w-xl text-center text-xl">
    {#if status === 404}
      {#if isNotFoundBlog}
        {$t('error.NotFound.blog')}
      {:else}
        {$t('error.NotFound.others')}
      {/if}
    {:else}
      {$t('error.ServerError')}
    {/if}
    {$t('error.prompt')}
  </h2>
  <div class="relative">
    <img src="/images/chemistry/flasks.svg" alt="chemistry flasks" width="100" height="100" loading="lazy" />
    <img
      src="/images/chemistry/molecule1.svg"
      alt="molecule 1"
      width="35"
      height="35"
      class="absolute bottom-[80%] left-[80%] rotate-12"
      loading="lazy"
    />
    <img
      src="/images/chemistry/molecule2.svg"
      alt="molecule 2"
      width="35"
      height="35"
      class="absolute bottom-[90%] right-[80%] rotate-12"
      loading="lazy"
    />
  </div>
  <button class="c-btn text-sm uppercase" type="button" on:click={() => history.back()}>
    {$t('error.cta')}
  </button>
</main>

<style lang="postcss">
  .status span {
    @apply relative grid h-24 w-24 place-items-center overflow-hidden bg-primary text-6xl text-bg sm:h-32 sm:w-32 sm:text-7xl lg:text-8xl;
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
    opacity: 0.25;
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
    background-image: url('/images/forest-mountain.webp');
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
