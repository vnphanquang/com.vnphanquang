<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import close from 'svelte-awesome/icons/close';

  import type { Testimonial, TestimonialDismissReason } from './Testimonials.type';

  export let data: Testimonial;

  const dispatch = createEventDispatcher<{
    dismiss: TestimonialDismissReason;
  }>();
</script>

<article
  class="grid max-w-sm grid-cols-1 place-items-center gap-y-4 rounded border-2 border-border bg-bg/[.98] p-8 text-center shadow-lg hover:shadow-xl {$$props.class}"
>
  <button
    type="button"
    on:click={() => dispatch('dismiss', 'closeBtnClick')}
    class="c-btn-icon absolute top-2 right-4"
    aria-label="Close"
  >
    <Icon data={close} scale={1.25} />
  </button>
  <img src={data.avatar} alt={data.author} class="rounded-full" width="60" height="60" />
  <div class="">
    <a class="font-bold text-secondary hover:text-primary" href={data.ref} target="_blank"
      >{data.author}</a
    >
    <p class="mt-2 italic opacity-50 active:cursor-text">{data.title}</p>
  </div>
  <blockquote class="active:cursor-text md:px-4">
    {#each data.quote.split('/n') as paragraph}
      <p>"{paragraph}"</p>
    {/each}
  </blockquote>
</article>
