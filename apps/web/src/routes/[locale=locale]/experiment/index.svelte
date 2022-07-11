<script lang="ts">
  import { AppRoutes, to } from '$lib/services/navigation';

  const EXPERIMENTS = {
    webWordFrequency: {
      id: 'web-word-frequency',
      href: to(AppRoutes.experiment.webWordFrequency.index),
      title: 'Web Word Frequency',
      description: 'Scrape an URL and count word occurrence',
    },
  } as const;
</script>

<svelte:head>
  <title>Experiments | vnphanquang</title>
  <meta name="description" content="Just some experiments from vnphanquang" />
</svelte:head>

<main class="mx-auto flex max-w-5xl flex-col py-20 px-8 md:px-20">
  <h1 class="text-center font-quang text-6xl font-bold">Experiments</h1>
  <p class="mt-8 text-center font-quang text-2xl">Once in a while, a wild flower blooms</p>
  <section class="mt-20 flex-1">
    <ul class="flex flex-col gap-y-10">
      {#each Object.values(EXPERIMENTS) as { id, href, title, description } (id)}
        <li
          class="grid grid-cols-1 gap-y-6 rounded-xl border-2 border-border bg-bg p-8 shadow-center-lg hover:shadow-center-xl"
        >
          <p class="text-2xl font-bold">{title}</p>
          <p>{description}</p>
          <a {href} class="c-btn w-fit">Explore</a>
        </li>
      {/each}
    </ul>
    <p class="mt-20 text-center">Wild flowers are out there, but none has fully bloomed yet...</p>
  </section>
</main>
