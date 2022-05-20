<script lang="ts">
  import socials from '$lib/data/socials.json';
</script>

<footer
  id="footer"
  class="flex flex-col items-center bg-bg-accent py-8 shadow-xl md:px-32 {$$props.class} relative mt-16"
>
  <ul class="grid grid-cols-7 place-items-center gap-x-6">
    {#each Object.values(socials) as { href, icon, id } (id)}
      <li id="social-{id}" class="">
        <a {href}>
          <img src={icon} alt={id} width="30" height="30" />
        </a>
      </li>
    {/each}
  </ul>
  <div
    class="mt-6 grid grid-cols-1 place-items-center gap-y-2 gap-x-5 font-quang font-bold md:grid-cols-[auto,auto,auto]"
  >
    <p>Burnt with calories</p>
    <p>🦠</p>
    <p>vnphanquang © {new Date().getFullYear()}</p>
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

<style>
</style>
