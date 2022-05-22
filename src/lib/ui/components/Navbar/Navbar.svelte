<script>
  import classnames from 'classnames';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import lightbulb from 'svelte-awesome/icons/lightbulbO';
  import moon from 'svelte-awesome/icons/moonO';
  import { elasticInOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';

  import { AppRoutes } from '$generated/routing';
  import { HamburgerBtn } from '$lib/ui/components/HamburgerBtn';
  import { theme } from '$lib/ui/stores/theme';

  let navbarMenuOpen = false;
  const navlinks = {
    blog: {
      href: AppRoutes.blog.index,
      text: 'blog',
    },
    gallery: {
      href: AppRoutes.gallery.index,
      text: 'gallery',
    },
    about: {
      href: AppRoutes.about.index,
      text: 'about',
    },
  };

  function toggleTheme() {
    theme.toggle();
  }

  $: isLightTheme = $theme === 'light';
</script>

<nav
  class={classnames(
    'grid place-items-center px-6 shadow-lg hover:shadow-xl',
    $$props.class,
    navbarMenuOpen
      ? 'fixed top-0 left-0 bg-bg-accent'
      : 'bg-bg-accent/90 backdrop-blur-sm hover:bg-bg-accent/95',
  )}
>
  <div class="grid h-20 w-full max-w-5xl grid-cols-[auto,auto,1fr] items-center gap-x-6">
    <HamburgerBtn
      id="navbar-menu"
      class="hover:text-primary md:hidden"
      variant="random"
      bind:open={navbarMenuOpen}
    />
    <p class="font-quang text-xl font-bold text-primary hover:text-secondary">
      <a href="/" on:click={() => (navbarMenuOpen = false)}>vnphanquang</a>
    </p>

    <ul class="hidden grid-cols-[repeat(3,auto)] gap-x-4 font-quang text-lg font-bold md:grid">
      {#each Object.values(navlinks) as { href, text }}
        <li class="navlink relative px-2 hover:text-primary">
          <a {href}>{text}</a>
        </li>
      {/each}
    </ul>
    {#if navbarMenuOpen}
      <ul
        class="
          fixed
          top-20 bottom-0 left-0 right-0 grid
          grid-cols-1 grid-rows-[repeat(3,auto)] place-content-center place-items-center gap-y-20 bg-bg-accent
          font-quang text-3xl font-bold uppercase md:hidden
        "
        transition:fade={{ duration: 200 }}
      >
        {#each [{ href: AppRoutes.index, text: 'home' }, ...Object.values(navlinks)] as { href, text }}
          <li class="navlink relative px-3 hover:text-primary">
            <a {href} on:click={() => (navbarMenuOpen = false)} sveltekit:prefetch>{text}</a>
          </li>
        {/each}
      </ul>
    {/if}

    <ul class="flex items-center justify-end">
      <li>
        <input
          type="checkbox"
          id="theme-toggler"
          checked={isLightTheme}
          hidden
          on:change={toggleTheme}
        />
        <label class="cursor-pointer hover:text-primary" for="theme-toggler">
          <span class="light">
            <Icon data={moon} scale={2} />
          </span>
          <span class="dark">
            <Icon data={lightbulb} scale={2} />
          </span>
        </label>
      </li>
    </ul>
  </div>
</nav>

{#if !isLightTheme}
  <div transition:fade={{ duration: 800 }} class="backdrop fixed inset-0 z-navbar" />
  <label
    for="theme-toggler"
    transition:fly={{ y: -500, easing: elasticInOut, duration: 1000 }}
    class="fixed top-[10vh] left-1/2 z-navbar -translate-x-1/2 cursor-pointer"
  >
    <div class="wire" />
    <div class="bulb on">
      <span />
      <span />
    </div>
  </label>
{/if}

<style lang="postcss">
  .navlink::after {
    @apply absolute top-full left-0 h-[2px] w-full origin-right scale-x-0 bg-primary transition-transform;
    content: '';
  }

  .navlink:hover::after {
    @apply origin-left scale-x-100;
  }

  label[for='theme-toggler'] {
    @apply grid place-content-center;
  }
  #theme-toggler:checked ~ label[for='theme-toggler'] {
    filter: drop-shadow(0 0 14px #ffad00);
  }

  label[for='theme-toggler'] > .light,
  label[for='theme-toggler'] > .dark {
    @apply col-start-1 row-start-1;
    @apply duration-300 ease-in-out;
    transition-property: transform, opacity;
  }
  #theme-toggler:checked ~ label[for='theme-toggler'] > .light {
    @apply rotate-0 opacity-100;
  }
  #theme-toggler:checked ~ label[for='theme-toggler'] > .dark {
    @apply rotate-45 opacity-0;
  }

  #theme-toggler:not(:checked) ~ label[for='theme-toggler'] > .light {
    @apply -rotate-45 opacity-0;
  }
  #theme-toggler:not(:checked) ~ label[for='theme-toggler'] > .dark {
    @apply rotate-0 opacity-100;
  }

  .bulb {
    position: relative;
    width: 80px;
    height: 80px;
    background: rgb(107, 107, 107);
    border-radius: 50%;
    z-index: 2;
  }
  .bulb.on {
    background: #fff5b6;
    box-shadow: 0 0 50px #fff5b6, 0 0 100px #fff5b6, 0 0 150px #fff5b6, 0 0 200px #fff5b6,
      0 0 250px #fff5b6, 0 0 300px #fff5b6, 0 0 350px #fff5b6;
  }

  .bulb::before {
    content: '';
    position: absolute;
    top: -50px;
    left: 22.5px;
    width: 35px;
    height: 80px;
    background: rgb(107, 107, 107);
    border-top: 30px solid theme('colors.fg');
    border-radius: 10px;
  }

  .bulb.on::before {
    background: #fff5b6;
  }

  .bulb.on::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    background: #fff5b6;
    border-radius: 50%;
    filter: blur(40px);
  }

  .bulb span:nth-child(1) {
    position: absolute;
    top: -16px;
    left: -4px;
    display: block;
    width: 30px;
    height: 30px;
    background: transparent;
    transform: rotate(342deg);
    border-bottom-right-radius: 40px;
    box-shadow: 20px 20px 0 10px rgb(107, 107, 107);
  }

  .bulb.on span:nth-child(1) {
    box-shadow: 20px 20px 0 10px #fff5b6;
  }

  .bulb span:nth-child(2) {
    position: absolute;
    top: -16px;
    right: -4px;
    display: block;
    width: 30px;
    height: 30px;
    background: transparent;
    transform: rotate(17deg);
    border-bottom-left-radius: 40px;
    box-shadow: -20px 20px 0 10px rgb(107, 107, 107);
  }

  .bulb.on span:nth-child(2) {
    box-shadow: -20px 20px 0 10px #fff5b6;
  }

  .wire {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 100%;
    width: 4px;
    height: 20vh;
    background: black;
    z-index: 1;
  }

  .backdrop {
    pointer-events: none;
    background: radial-gradient(
      circle farthest-corner at 50vw 20vh,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 1) 100%
    );
  }
</style>
