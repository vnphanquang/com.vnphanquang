<script lang="ts">
  import { onMount } from 'svelte';
  import arrows from 'svelte-awesome/icons/arrows';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import { movable, type MovableEventDetails } from 'svelte-movable';
  import { fade } from 'svelte/transition';

  import { clickoutside } from '$lib/ui/actions/clickoutside';

  import TestimonialCard from './TestimonialCard.svelte';
  import type { Testimonial } from './Testimonials.type';

  export let data: Testimonial[];

  let activeIndex: number | undefined;
  let enableClickoutside = true;

  let containerNode: HTMLElement;
  let testimonialCardMovableTrigger: HTMLElement;
  const TESTIMONIAL_CARD_POSITION_CACHE_ID = 'testimonial-card-position-cache';
  let testimonialCardPositionCache: MovableEventDetails['position'] = {
    left: 0,
    top: 0,
  };

  function onDismiss() {
    activeIndex = undefined;
  }

  function getHtmlId(id: number) {
    return `testimonial-${id}`;
  }

  function updateTestimonialCardPositionCache(position: typeof testimonialCardPositionCache) {
    testimonialCardPositionCache = position;
    sessionStorage.setItem(
      TESTIMONIAL_CARD_POSITION_CACHE_ID,
      JSON.stringify(testimonialCardPositionCache),
    );
  }

  function onMovableStart() {
    enableClickoutside = false;
  }
  function onMovableEnd(event: CustomEvent<MovableEventDetails>) {
    enableClickoutside = true;
    updateTestimonialCardPositionCache(event.detail.position);
  }

  onMount(() => {
    const cache = sessionStorage.getItem(TESTIMONIAL_CARD_POSITION_CACHE_ID);
    if (cache) {
      testimonialCardPositionCache = JSON.parse(cache);
    }
  });
</script>

<div id="testimonials" class={$$props.class} bind:this={containerNode}>
  <div class="text-center">
    <h2 class="text-3xl font-bold">Things People Say</h2>
    <p class="mt-4 italic">Nobody was harmed in the making of this</p>
  </div>
  <ul class="relative grid h-80 w-full gap-10">
    {#each data as { avatar, author, position, id }, index (id)}
      {@const htmlId = getHtmlId(id)}
      <li class="absolute z-0" style:left={position.x} style:bottom={position.y}>
        <label for={htmlId}>
          <input
            type="radio"
            id={htmlId}
            name="active-testimonial"
            value={index}
            bind:group={activeIndex}
            hidden
          />
          <img
            src={avatar}
            alt={author}
            width="50"
            data-active={activeIndex === index ? 'true' : 'false'}
            class="avatar-trigger"
          />
        </label>
      </li>
    {/each}
    {#if activeIndex !== undefined}
      <div
        class="inset-center absolute z-10 w-full max-w-sm"
        style:top={testimonialCardPositionCache.top
          ? `${testimonialCardPositionCache.top}px`
          : '50%'}
        style:left={testimonialCardPositionCache.left
          ? `${testimonialCardPositionCache.left}px`
          : '50%'}
        transition:fade={{ duration: 200 }}
        use:clickoutside={{ enabled: enableClickoutside, inside: containerNode }}
        on:clickoutside={onDismiss}
        use:movable={{
          limit: {
            delta: '20%',
            parent: containerNode,
          },
          trigger: testimonialCardMovableTrigger,
        }}
        on:movablestart={onMovableStart}
        on:movableend={onMovableEnd}
      >
        <button
          bind:this={testimonialCardMovableTrigger}
          class="c-btn-icon absolute top-2 right-10 hover:cursor-move"
          type="button"
        >
          <Icon data={arrows} />
        </button>
        <TestimonialCard data={data[activeIndex]} on:dismiss={onDismiss} />
      </div>
    {/if}
  </ul>
  <p class="mt-2 text-center italic opacity-50">Click on a face to see what they say</p>
</div>

<style>
  .avatar-trigger {
    @apply cursor-pointer rounded-full transition-transform;

    &:hover {
      @apply scale-105;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 5px 0px;
    }
    &[data-active='true'] {
      @apply scale-105;
      box-shadow: theme(colors.secondary) 0px 0px 15px;
    }
  }
</style>
