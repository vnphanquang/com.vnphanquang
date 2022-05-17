<script>
  import { clickoutside } from '@svelte-put/clickoutside';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import close from 'svelte-awesome/icons/close';
  import { fly, fade } from 'svelte/transition';

  import { AnimatedMail } from '$lib/ui/components';

  let letter = false;
</script>

<div class={$$props.class}>
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
            My name is Quang Phan. In one sentence, i am currently a learner, a developer, a bicycle
            commuter, and an enthusiast for music theory & many other things. For more details,
            visit
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
</div>
