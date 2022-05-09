<script lang="ts">
  import neverAskedQuestions from '$lib/data/neverAskedQuestions.json';
  import testimonials from '$lib/data/testimonials.json';
  import { NeverAskedQuestions, Testimonials } from '$lib/ui/components';
</script>

<title>Home | vnphanquang</title>

<h1>certified crappy website by nobody</h1>

<main class="mb-8 flex flex-1 flex-col">
  <section class="grid w-full place-items-center bg-bg-accent/30 py-14 px-6 sm:px-10 md:px-32">
    <Testimonials data={testimonials} class="w-full max-w-5xl" />
  </section>
  <section class="grid w-full place-items-center py-14 px-6 sm:px-10 md:px-32">
    <NeverAskedQuestions data={neverAskedQuestions} class="w-full max-w-5xl" />
  </section>
</main>
