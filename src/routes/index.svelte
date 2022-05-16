<script lang="ts">
  import { clickoutside } from '@svelte-put/clickoutside';
  import { intersect } from '@svelte-put/intersect';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import close from 'svelte-awesome/icons/close';
  import { fly, fade } from 'svelte/transition';

  import neverAskedQuestions from '$lib/data/neverAskedQuestions.json';
  import testimonials from '$lib/data/testimonials.json';
  import {
    AnimatedMail,
    NeverAskedQuestions,
    Testimonials,
    ScrollDownMouse,
    CornerRibbon,
    RubberStamp,
    TestTube,
    SkewedFlipCard,
  } from '$lib/ui/components';

  let letter = false;
  let heroNode: HTMLElement;
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

<title>Home | vnphanquang</title>

<main class="flex flex-1 flex-col">
  <section
    id="hero"
    class="relative flex h-screen w-full flex-col items-center bg-bg p-6 pt-10"
    bind:this={heroNode}
  >
    <div
      class="hero relative grid w-full max-w-5xl flex-1 place-content-center place-items-center gap-y-0 bg-bg-accent p-5 md:gap-y-10"
    >
      <CornerRibbon class="text-[1.5em] text-bg">NO AWARD</CornerRibbon>

      <div class="mx-10 text-center font-[PhanQuangCalligraphr]">
        <h1 class="text-4xl font-bold md:text-7xl">A Personal Digital Laboratory</h1>
        <p class="mt-5 text-xl italic sm:mt-12 md:text-3xl">"It's not a lavatory!" - Quang Phan</p>
      </div>

      <TestTube class="scale-75 text-[#a89984] shadow-lg" percentage={70} />

      <div class="stamp-in absolute bottom-12 right-5 md:bottom-28 md:right-20">
        <RubberStamp class="whitespace-nowrap bg-fg/10">
          <p class="text-center text-base">CERTIFIED CRAPPY WEBSITE</p>
          <p class="mr-5 text-right text-xs italic opacity-50">by absolutely noone</p>
        </RubberStamp>
      </div>
    </div>
    <ScrollDownMouse class="mt-6" variant="button" on:click={scrollDownFromHero} />
  </section>

  <section
    id="sectors"
    class="
      grid w-full place-items-center bg-bg-accent/30 pt-14 pb-28 px-6 sm:px-10 md:px-32
      {fadeIns.sectors ? 'animate-fade-in-up' : 'opacity-0'}
    "
    use:intersect={{ threshold: 0.4, enabled: !fadeIns.sectors }}
    on:intersectonce={() => (fadeIns.sectors = true)}
  >
    <div class="w-full max-w-5xl">
      <div class="text-center">
        <h2 class="text-3xl font-bold">Experimentation Sectors</h2>
        <p class="mt-4 italic">Projects go boom 💥</p>
      </div>
      <div class="mt-20 grid place-items-center grid-cols-1 md:grid-cols-2 gap-28">
        <article>
          <SkewedFlipCard class="w-80 h-64" id="open-source" skew="right">
            <h3 slot="front" class="text-3xl">
              <span class="enclosed">open</span>source
            </h3>
            <div slot="back" class="text-sm p-8 prose">
              <p class="text-lg">
                Broken applications, unfinished features, failed tests, ...
              </p>
              <p class="">
                This is where my code never see the light of day.
              </p>
              <p class="">
                Visit <a href="https://github.com/vnphanquang" class="underline hover:text-secondary">github</a> for "free" softwares.
              </p>
            </div>
          </SkewedFlipCard>
        </article>
        <article>
          <SkewedFlipCard class="w-80 h-64" id="something" skew="left">
            <h3 slot="front" class="text-3xl">
              <span class="enclosed">blog</span>posts
            </h3>
            <div slot="back" class="text-sm p-8 prose">
              <p class="text-lg">
                Cringeworthy writing, irrational logics, irrelevant topics, ...
              </p>
              <p class="">
                This is what I'll definitely regret two years from now.
              </p>
              <p class="">
                See <a href="/blogs" class="underline hover:text-secondary">blog page</a> for more confusion.
              </p>
            </div>
          </SkewedFlipCard>
        </article>
        <article>
          <SkewedFlipCard class="w-80 h-64 p-4" id="gallery" skew="right">
            <h3 slot="front" class="text-3xl">
              <span class="enclosed">captured</span>photos
            </h3>
            <div slot="back" class="text-sm p-8 prose">
              <p class="text-lg">
                Underexposed photos, unbalanced composition, out-of-focus subjects,...
              </p>
              <p class="">
                Maybe one of these photo is worth one banh mi?
              </p>
              <p class="">
                See <a href="/gallery" class="underline hover:text-secondary">gallery</a> for (perhaps) joy?
              </p>
            </div>
          </SkewedFlipCard>
        </article>
        <article>
          <SkewedFlipCard class="w-80 h-64" id="blog" skew="left">
            <h3 slot="front" class="text-3xl">
              <span class="enclosed">more</span>things
            </h3>
            <div slot="back" class="text-sm p-8 prose">
              <p class="text-base">
                Absolutely nothing here. Maybe the possibilities are infinite? Perhaps it reflects my empty soul. But really it's just here to balance this UI grid 🤷.
              </p>
          </SkewedFlipCard>
        </article>
      </div>
    </div>
  </section>

  <section
    id="testimonials"
    class="
      grid w-full place-items-center bg-bg/50 py-14 px-6 sm:px-10 md:px-32
      {fadeIns.testimonials ? 'animate-fade-in-up' : 'opacity-0'}
    "
    use:intersect={{ threshold: 0.4, enabled: !fadeIns.testimonials }}
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
    use:intersect={{ threshold: 0.4, enabled: !fadeIns.neverAskedQuestions }}
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
    use:intersect={{ threshold: 0.4, enabled: !fadeIns.mail }}
    on:intersectonce={() => (fadeIns.mail = true)}
  >
    <div class="text-center">
      <h2 class="text-3xl font-bold">A Message From Quang</h2>
      <p class="mt-4 italic">Tip: real people open suspicious red envelopes</p>
    </div>
    <div class="relative mt-10 h-[200px]">
      <AnimatedMail on:click={() => (letter = true)} />
    </div>

    {#if letter}
      <div class="fixed inset-0 z-10 grid place-items-center bg-bg-accent/75" out:fade>
        <div
          class="border-letter relative max-h-[80vh] w-10/12 max-w-3xl overflow-auto bg-bg p-6 shadow-2xl md:w-8/12 md:p-20"
          transition:fly={{ y: 80 }}
          use:clickoutside
          on:clickoutside={() => (letter = false)}
        >
          <button
            type="button"
            on:click={() => (letter = false)}
            class="c-btn-icon absolute top-4 right-4"
          >
            <Icon data={close} scale={1.5} />
          </button>
          <div class="prose">
            <p class="italic">Vietnam</p>
            <p class="italic">
              {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(new Date())}
            </p>
            <p>Dear visitor,</p>
            <p
              class="first-letter:float-left first-letter:text-7xl first-letter:font-bold first-letter:text-primary"
            >
              Thank you for taking the time to stop by my personal website & digital playground.
            </p>
            <p>
              My name is Quang Phan. In one sentence, i am currently a learner, a developer, a
              bicycle commuter, and an enthusiast for music theory and many other things. For more
              details, visit
              <a href="/about" class="hover:text-primary">the about page</a>.
            </p>
            <p>
              You can also find me at <span class="text-primary">@vnphanquang</span> on most social platforms
              (also listed at the footer of this site). See you out there!
            </p>
            <p>Cheers,</p>
            <img src="/images/signature.svg" alt="Signature of Quang Phan" width="200" />
          </div>
        </div>
      </div>
    {/if}
  </section>

  <section class="mt-8">
    <ul
      class="mx-auto grid max-w-[200px] grid-cols-8 place-content-center place-items-center gap-x-1 text-xl"
    >
      {#each ['𝄞', '♭', '♪', '♫', '♮', '♬', '♩', '♯'] as note, index}
        <li
          style:animation-delay="{index}00ms"
          class="animate-dance [text-shadow:0_4px_4px_rgba(1,2,0,0.2)] {[
            'text-primary',
            'text-fg',
            'text-secondary',
            'text-border',
          ][index % 4]}"
        >
          {note}
        </li>
      {/each}
    </ul>
  </section>
</main>

<style>
  .hero {
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.1);
    filter: drop-shadow(6px 6px 3px rgba(0, 0, 0, 0.5));
  }
  .hero::after,
  .hero::before {
    @apply bg-bg-accent;
    content: '';
    position: absolute;
  }

  .hero::after {
    height: 2px;
    left: 0;
    right: 0;
    bottom: -2px;
    clip-path: polygon(
      0% 0%,
      2% 100%,
      4% 0%,
      6% 100%,
      8% 0%,
      10% 100%,
      12% 0%,
      14% 100%,
      16% 0%,
      18% 100%,
      20% 0%,
      22% 100%,
      24% 0%,
      26% 100%,
      28% 0%,
      30% 100%,
      32% 0%,
      34% 100%,
      36% 0%,
      38% 100%,
      40% 0%,
      42% 100%,
      44% 0%,
      46% 100%,
      48% 0%,
      50% 100%,
      52% 0%,
      54% 100%,
      56% 0%,
      58% 100%,
      60% 0%,
      62% 100%,
      64% 0%,
      66% 100%,
      68% 0%,
      70% 100%,
      72% 0%,
      74% 100%,
      76% 0%,
      78% 100%,
      80% 0%,
      82% 100%,
      84% 0%,
      86% 100%,
      88% 0%,
      90% 100%,
      92% 0%,
      94% 100%,
      96% 0%,
      98% 100%,
      100% 0%
    );
  }
  .hero::before {
    width: 2px;
    top: 0;
    bottom: 0;
    right: -2px;
    clip-path: polygon(
      0% 0%,
      100% 3%,
      0% 6%,
      100% 9%,
      0% 12%,
      100% 15%,
      0% 18%,
      100% 21%,
      0% 24%,
      100% 27%,
      0% 30%,
      100% 33%,
      0% 36%,
      100% 39%,
      0% 42%,
      100% 45%,
      0% 48%,
      100% 51%,
      0% 54%,
      100% 57%,
      0% 60%,
      100% 63%,
      0% 66%,
      100% 69%,
      0% 72%,
      100% 75%,
      0% 78%,
      100% 81%,
      0% 84%,
      100% 87%,
      0% 90%,
      100% 93%,
      0% 96%,
      100% 98%,
      0% 100%
    );
  }
  .stamp-in {
    animation-name: stamp;
    animation-delay: 1s;
    animation-duration: 500ms;
    opacity: 0;
    animation-fill-mode: forwards;
  }

  @keyframes stamp {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
      transform-origin: 50% 50%;
      transform: rotate(0deg) scale(5);
    }
    100% {
      opacity: 0.5;
      transform: rotate(12deg) scale(1);
    }
  }

.enclosed {
  @apply text-yellow;
  background: theme('colors.fg');
  padding: 0 5px;
  display: inline-block;
  transform: scale(0.75);
  transform-origin: right center;
}
</style>
