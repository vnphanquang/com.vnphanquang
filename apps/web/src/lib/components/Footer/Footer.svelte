<script lang="ts">
  import socials from '$lib/data/socials.json';
  import { intersect } from '@svelte-put/intersect';

  let intersected = false;
</script>

<footer id="footer" class="bg-bg-accent py-10 shadow-xl md:px-32 {$$props.class} relative mt-16">
  <div
    class="flex flex-col items-center {intersected ? 'animate-fade-in-up' : 'opacity-0'}"
    use:intersect={{ threshold: 0.35, enabled: !intersected }}
    on:intersectonce={() => (intersected = true)}
  >
    <ul class="grid grid-cols-7 place-items-center gap-x-6">
      {#each Object.values(socials) as { href, icon, id } (id)}
        <li id="social-{id}" class="hover:-translate-y-1 transition-transform duration-200 active:scale-90">
          <a {href} target="_blank">
            <img src={icon} alt={id} width="30" height="30" />
          </a>
        </li>
      {/each}
    </ul>
    <p
      class="mt-10 grid grid-cols-1 place-items-center gap-y-1 gap-x-5 font-quang font-bold md:grid-cols-[repeat(3,auto)]"
    >
      <span>Burnt with calories</span>
      <span>🦠</span>
      <span>vnphanquang © {new Date().getFullYear()}</span>
    </p>
  </div>

  <ul
    class="absolute bottom-full left-1/2 mx-auto grid max-w-[200px] -translate-x-1/2 grid-cols-8 place-content-center place-items-center gap-x-1 text-xl"
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
</footer>
