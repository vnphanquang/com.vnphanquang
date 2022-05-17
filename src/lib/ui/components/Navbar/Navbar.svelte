<script>
  import classnames from 'classnames';
  import { fade } from 'svelte/transition';

  import { HamburgerBtn } from '$lib/ui/components/HamburgerBtn';

  let navbarMenuOpen = false;
  const navlinks = {
    blogs: {
      href: '/blogs',
      text: 'blogs',
    },
    gallery: {
      href: '/gallery',
      text: 'gallery',
    },
    about: {
      href: '/about',
      text: 'about',
    },
  };
</script>

<nav
  class={classnames(
    'grid place-items-center',
    $$props.class,
    navbarMenuOpen && 'fixed top-0 left-0',
  )}
>
  <div class="grid h-20 w-full max-w-5xl grid-cols-[auto,auto,1fr] items-center gap-x-6">
    <HamburgerBtn
      id="navbar-menu"
      class="hover:text-primary md:hidden"
      variant="random"
      bind:open={navbarMenuOpen}
    />
    <p class="font-[PhanQuangCalligraphr] text-xl font-bold text-primary hover:text-secondary">
      <a href="/" on:click={() => (navbarMenuOpen = false)}>vnphanquang</a>
    </p>

    <ul
      class="hidden grid-cols-[repeat(3,auto)] gap-x-4 font-[PhanQuangCalligraphr] text-lg font-bold md:grid"
    >
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
          font-[PhanQuangCalligraphr] text-3xl font-bold uppercase md:hidden
        "
        transition:fade={{ duration: 200 }}
      >
        {#each Object.values(navlinks) as { href, text }}
          <li class="navlink relative px-3 hover:text-primary">
            <a {href} on:click={() => (navbarMenuOpen = false)}>{text}</a>
          </li>
        {/each}
      </ul>
    {/if}

    <ul class="flex items-center justify-end" />
  </div>
</nav>

<style>
  .navlink::after {
    @apply absolute top-full left-0 h-[2px] w-full origin-right scale-x-0 bg-primary transition-transform;
    content: '';
  }

  .navlink:hover::after {
    @apply origin-left scale-x-100;
  }
</style>
