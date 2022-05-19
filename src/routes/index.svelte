<script lang="ts">
  import { intersect } from '@svelte-put/intersect';

  import neverAskedQuestions from '$lib/data/neverAskedQuestions.json';
  import testimonials from '$lib/data/testimonials.json';
  import { ScrollDownMouse } from '$lib/ui/components';

  import {
    NeverAskedQuestions,
    Testimonials,
    Mail,
    Hero,
    ExperimentationSectors,
  } from './_components';

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
  <meta property="og:title" content="vnphanquang">
  <meta property="og:type" content="website" />
  <meta property="og:image" content="%svelte.assets%/images/screenshot.png">
  <meta property="og:url" content="https://vnphanquang.com">
  <meta name="twitter:card" content="summary_large_image">
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

  <section
    id="sectors"
    class="
      grid w-full place-items-center bg-bg-accent/30 px-6 pt-14 pb-28 sm:px-10 md:px-32
      {fadeIns.sectors ? 'animate-fade-in-up' : 'opacity-0'}
    "
    use:intersect={{ threshold: intersectionThreshold, enabled: !fadeIns.sectors }}
    on:intersectonce={() => (fadeIns.sectors = true)}
  >
    <ExperimentationSectors />
  </section>

  <section
    id="testimonials"
    class="
      grid w-full place-items-center bg-bg/50 py-14 px-6 sm:px-10 md:px-32
      {fadeIns.testimonials ? 'animate-fade-in-up' : 'opacity-0'}
    "
    use:intersect={{ threshold: intersectionThreshold, enabled: !fadeIns.testimonials }}
    on:intersectonce={() => (fadeIns.testimonials = true)}
  >
    <Testimonials data={testimonials} class="w-full max-w-5xl" />
  </section>

  <section
    id="never-asked-questions"
    class="
      grid w-full place-items-center bg-bg-accent/30 py-14 px-6 sm:px-10 md:px-32
      {fadeIns.neverAskedQuestions ? 'animate-fade-in-up' : 'opacity-0'}
    "
    use:intersect={{ threshold: intersectionThreshold, enabled: !fadeIns.neverAskedQuestions }}
    on:intersectonce={() => (fadeIns.neverAskedQuestions = true)}
  >
    <NeverAskedQuestions data={neverAskedQuestions} class="w-full max-w-5xl" />
  </section>

  <section
    id="mail"
    class="
      grid w-full place-items-center py-14 px-6 sm:px-10 md:px-32
      {fadeIns.mail ? 'animate-fade-in-up' : 'opacity-0'}
    "
    use:intersect={{ threshold: intersectionThreshold, enabled: !fadeIns.mail }}
    on:intersectonce={() => (fadeIns.mail = true)}
  >
    <Mail />
  </section>
</main>
