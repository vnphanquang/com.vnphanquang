<script lang="ts" context="module">
  import { t } from '$lib/services/i18n';
  import { AppRoutes, to } from '$lib/services/navigation';

  import type { Load } from '.svelte-kit/types/src/routes/[locale=locale]/experiment/__types';

  export const load: Load = () => {
    return {
      stuff: {
        meta: {
          title: 'Experiments | vnphanquang',
          description: 'Just some experiments from vnphanquang',
        },
      },
    };
  };
</script>

<script lang="ts">
  const EXPERIMENTS = {
    webWordFrequency: {
      id: 'web-word-frequency',
      href: to(AppRoutes.experiment.webWordFrequency.index),
      title: 'Web Word Frequency',
      description: 'Scrape an URL and count word occurrence',
    },
  } as const;
</script>

<main class="mx-auto flex max-w-5xl flex-col py-20 px-8 md:px-20">
  <h1 class="text-center text-6xl font-bold">{$t('experiment.title')}</h1>
  <p class="mt-8 text-center text-lg italic">{$t('experiment.subtitle')}</p>
  <section class="mt-20 flex-1">
    <ul class="flex flex-col gap-y-10">
      {#each Object.values(EXPERIMENTS) as { id, href, title, description } (id)}
        <li
          class="grid grid-cols-1 gap-y-6 rounded-xl border-2 border-border bg-bg p-8 shadow-center-lg hover:shadow-center-xl"
        >
          <p class="text-2xl font-bold">{title}</p>
          <p>{description}</p>
          <a {href} class="c-btn w-fit">{$t('experiment.explore')}</a>
        </li>
      {/each}
    </ul>
    <p class="mt-20 text-center">{$t('experiment.etc')}</p>
  </section>
</main>
