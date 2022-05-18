<script lang="ts">
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import codepen from 'svelte-awesome/icons/codepen';
  import github from 'svelte-awesome/icons/github';
  import instagram from 'svelte-awesome/icons/instagram';
  import jsfiddle from 'svelte-awesome/icons/jsfiddle';
  import linkedin from 'svelte-awesome/icons/linkedin';
  import stackOverflow from 'svelte-awesome/icons/stackOverflow';
  import twitter from 'svelte-awesome/icons/twitter';

  const socials = [
    {
      id: 'github',
      href: 'https://github.com/vnphanquang',
      icon: github,
    },
    {
      id: 'twitter',
      href: 'https://twitter.com/vnphanquang',
      icon: twitter,
    },
    {
      id: 'instagram',
      href: 'https://instagram.com/vnphanquang',
      icon: instagram,
    },
    {
      id: 'linkedin',
      href: 'https://linkedin.com/in/vnphanquang',
      icon: linkedin,
    },
    {
      id: 'codepen',
      href: 'https://codepen.io/vnphanquang',
      icon: codepen,
    },
    {
      id: 'jsfiddle',
      href: 'https://jsfiddle.net/user/vnphanquang',
      icon: jsfiddle,
    },
    {
      id: 'stack-overflow',
      href: 'https://stackoverflow.com/users/9943094/vnphanquang',
      icon: stackOverflow,
    },
  ];
</script>

<footer
  id="footer"
  class="flex flex-col items-center bg-bg-accent py-8 shadow-xl md:px-32 {$$props.class} relative mt-16"
>
  <ul class="grid grid-cols-7 place-items-center gap-x-6">
    {#each socials as { href, icon, id } (id)}
      <li id="social-{id}" class="">
        <a {href}>
          <Icon data={icon} scale={2} class="c-btn-icon" />
        </a>
      </li>
    {/each}
  </ul>
  <div
    class="mt-6 grid grid-cols-1 place-items-center gap-y-2 gap-x-5 font-[PhanQuangCalligraphr] font-bold md:grid-cols-[auto,auto,auto]"
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
