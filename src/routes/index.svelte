<script lang="ts">
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
  } from '$lib/ui/components';
</script>

<title>Home | vnphanquang</title>

<main class="flex flex-1 flex-col">
  <section class="relative flex h-screen w-full flex-col items-center bg-bg p-6 sm:p-10">
    <div
      class="hero relative grid w-full flex-1 place-content-center place-items-center gap-y-0 bg-bg-accent p-5 md:gap-y-10"
    >
      <CornerRibbon class="text-[1.5em] text-bg">NO AWARD</CornerRibbon>

      <div class="text-center font-[PhanQuangCalligraphr]">
        <h1 class="mx-10 text-6xl font-bold md:text-8xl">A Personal Digital Laboratory</h1>
        <p class="mt-2 text-2xl italic sm:mt-12 md:text-4xl">"It's not a lavatory!" - Quang Phan</p>
      </div>

      <TestTube class="scale-75 text-[#a89984] shadow-lg" />

      <div class="stamp-in absolute bottom-12 right-5">
        <RubberStamp class="whitespace-nowrap bg-fg/10">
          <p class="text-center text-base">CERTIFIED CRAPPY WEBSITE</p>
          <p class="mr-5 text-right text-xs italic opacity-50">by absolutely noone</p>
        </RubberStamp>
      </div>
    </div>
    <ScrollDownMouse class="mt-6 sm:mt-10" />
  </section>

  <section class="grid h-[400px] w-full place-items-center py-14 px-6 sm:px-10 md:px-32" />

  <section class="grid w-full place-items-center bg-bg/50 py-14 px-6 sm:px-10 md:px-32">
    <Testimonials data={testimonials} class="w-full max-w-5xl" />
  </section>
  <section class="grid w-full place-items-center bg-bg-accent/30 py-14 px-6 sm:px-10 md:px-32">
    <NeverAskedQuestions data={neverAskedQuestions} class="w-full max-w-5xl" />
  </section>

  <section class="grid h-[400px] w-full place-items-center py-14 px-6 sm:px-10 md:px-32">
    <AnimatedMail />
  </section>

  <section class="mt-8">
    <ul
      class="mx-auto grid max-w-[200px] grid-cols-8 place-content-center place-items-center gap-x-1 text-xl"
    >
      {#each ['𝄞', '♭', '♪', '♫', '♮', '♬', '♩', '♯'] as note, index}
        <li
          style:animation-delay="{index}00ms"
          class="animate-dance [text-shadow:0_4px_4px_rgba(1,2,0,0.2)]"
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
    animation-delay: 1.5s;
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
</style>
