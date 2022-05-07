<script lang="ts">
  import neverAskedQuestions from '$lib/data/neverAskedQuestions.json';
  import testimonials from '$lib/data/testimonials.json';
  import { NeverAskedQuestions, Testimonials } from '$lib/ui/components';
</script>

<title>Home | vnphanquang</title>

<h1>certified crappy website by nobody</h1>

<main class="mb-20 grid flex-1 place-items-center gap-y-20 px-6 sm:px-10 md:px-32">
  <Testimonials data={testimonials} class="w-full max-w-4xl" />
  <NeverAskedQuestions data={neverAskedQuestions} class="w-full max-w-4xl" />
</main>
