<script context="module" lang="ts">
  import { intersect } from '@svelte-put/intersect';
  import type { Load } from '@sveltejs/kit';

  import { ScrollDownMouse } from '$lib/components';
  import neverAskedQuestions from '$lib/data/neverAskedQuestions.json';
  import { getTestimonials, testimonials } from '$lib/services/api/graphql/queries/Testimonial.gq';

  import {
    NeverAskedQuestions,
    Testimonials,
    Mail,
    Hero,
    ExperimentationSectors,
  } from './_components';

  import { AppConfig } from '$config';

  export const load: Load = async ({ fetch }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await getTestimonials({ fetch: fetch as any });
    return {};
  };
</script>

<script lang="ts">
  let heroNode: HTMLElement;
  const intersectionThreshold = 0.35;
  let fadeIns = {
    hero: false,
    sectors: false,
    testimonials: false,
    neverAskedQuestions: false,
    mail: false,
  };

  function scrollDownFromHero() {
    window.scrollTo({
      top: heroNode.offsetTop + heroNode.clientHeight,
      behavior: 'smooth',
    });
  }
</script>

<svelte:head>
  <title>Home | vnphanquang</title>
  <meta name="description" content="Quang Phan's personal website" />
  <meta property="og:title" content="vnphanquang" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="{AppConfig.urls.web}/images/screenshots/index.png" />
  <meta property="og:url" content={AppConfig.urls.web} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<main class="flex flex-col">
  <section
    id="hero"
    class="relative flex h-[calc(100vh-theme('spacing.20'))] w-full flex-col items-center bg-bg p-6"
    bind:this={heroNode}
  >
    <Hero />
    <ScrollDownMouse class="mt-6" variant="button" on:click={scrollDownFromHero} />
  </section>

  <section id="sectors" class="bg-bg-accent/30 px-6 pt-14 pb-28 sm:px-10 md:px-32">
    <div
      class="grid w-full place-items-center {fadeIns.sectors ? 'animate-fade-in-up' : 'opacity-0'}"
      use:intersect={{ threshold: intersectionThreshold, enabled: !fadeIns.sectors }}
      on:intersectonce={() => (fadeIns.sectors = true)}
    >
      <ExperimentationSectors />
    </div>
  </section>

  <section id="testimonials" class="bg-bg/50 py-14 px-6 sm:px-10 md:px-32">
    <div
      class="grid w-full place-items-center {fadeIns.testimonials
        ? 'animate-fade-in-up'
        : 'opacity-0'}"
      use:intersect={{ threshold: intersectionThreshold, enabled: !fadeIns.testimonials }}
      on:intersectonce={() => (fadeIns.testimonials = true)}
    >
      <Testimonials data={$testimonials.testimonials} class="w-full max-w-5xl" />
    </div>
  </section>

  <section id="never-asked-questions" class="bg-bg-accent/30 py-14 px-6 sm:px-10 md:px-32">
    <div
      class="grid w-full place-items-center {fadeIns.neverAskedQuestions
        ? 'animate-fade-in-up'
        : 'opacity-0'}"
      use:intersect={{ threshold: intersectionThreshold, enabled: !fadeIns.neverAskedQuestions }}
      on:intersectonce={() => (fadeIns.neverAskedQuestions = true)}
    >
      <NeverAskedQuestions data={neverAskedQuestions} class="w-full max-w-5xl" />
    </div>
  </section>

  <section id="mail" class="py-14 px-6 sm:px-10 md:px-32">
    <div
      class="grid w-full place-items-center {fadeIns.mail ? 'animate-fade-in-up' : 'opacity-0'}"
      use:intersect={{ threshold: intersectionThreshold, enabled: !fadeIns.mail }}
      on:intersectonce={() => (fadeIns.mail = true)}
    >
      <Mail />
    </div>
  </section>
</main>
