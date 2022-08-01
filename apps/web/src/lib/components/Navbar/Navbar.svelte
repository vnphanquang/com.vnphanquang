<script lang="ts">
  import classnames from 'classnames';
  import { onMount } from 'svelte';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import language from 'svelte-awesome/icons/language';
  import lightbulb from 'svelte-awesome/icons/lightbulbO';
  import moon from 'svelte-awesome/icons/moonO';
  import signIn from 'svelte-awesome/icons/signIn';
  import signOut from 'svelte-awesome/icons/signOut';
  import user from 'svelte-awesome/icons/user';
  import { elasticInOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';

  import { goto } from '$app/navigation';
  import { page, session } from '$app/stores';
  import { tooltip } from '$lib/actions/tooltip';
  import { I18NCache } from '$lib/cache/i18n.cache';
  import { Avatar } from '$lib/components/Avatar';
  import { Dropdown } from '$lib/components/Dropdown';
  import { HamburgerBtn } from '$lib/components/HamburgerBtn';
  import { Locale, locale, t } from '$lib/services/i18n';
  import { AppRoutes, to } from '$lib/services/navigation';
  import { notificationService } from '$lib/services/notification';
  import { theme } from '$lib/stores/theme';
  import { AppConfig } from '$config';

  let navbarMenuOpen = false;

  $: navlinks = {
    blog: {
      href: `/${$locale}${AppRoutes.blog.index}`,
      text: 'blog',
    },
    experiment: {
      href: `/${$locale}${AppRoutes.experiment.index}`,
      text: 'experiments',
    },
    about: {
      href: `/${$locale}${AppRoutes.about.index}`,
      text: 'about',
    },
  } as const;

  const locales = {
    [Locale.En]: {
      id: Locale.En,
      icon: '/images/locale/en.png',
      text: 'English',
      hint: 'Fish and chips',
    },
    [Locale.Vi]: {
      id: Locale.Vi,
      icon: '/images/locale/vi.png',
      text: 'Tiếng Việt',
      hint: 'Bánh mì',
    },
  };

  let showLocaleDropdown = false;

  let i18nCache: I18NCache;

  function toggleTheme() {
    theme.toggle();
  }

  async function changeLocale(newLocale: Locale) {
    showLocaleDropdown = false;
    if ($locale !== newLocale) {
      const path = `/${newLocale}/${location.pathname.substring(4)}`;
      $locale = newLocale;
      await goto(path, {
        noscroll: true,
      });
      if (!i18nCache.getUserSwitchedOnce()) {
        notificationService.warning($t('navbar.localeChangeNotice'), { duration: 10000 });
        i18nCache.setUserSwitchedOnce(true);
      }
      document?.querySelector('html')?.setAttribute('lang', newLocale);
    }
  }

  $: isLightTheme = $theme === 'light';

  $: currentUrl = `${AppConfig.urls.web}/${$page.url.pathname}`;
  $: logoutHref = `${AppConfig.urls.api.index}/auth/logout?redirectUrl=${encodeURIComponent(currentUrl)}`;

  onMount(() => {
    i18nCache = new I18NCache();
  });
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
  <div class="flex h-20 w-full max-w-5xl items-center gap-x-6">
    <HamburgerBtn
      id="navbar-menu"
      class="hover:text-primary md:hidden"
      variant="random"
      bind:open={navbarMenuOpen}
    />
    <p class="hidden font-quang text-xl font-bold text-primary hover:text-secondary md:block">
      <a href={to(AppRoutes.index)} on:click={() => (navbarMenuOpen = false)}>vnphanquang</a>
    </p>

    <ul class="hidden grid-cols-[repeat(3,auto)] gap-x-4 font-quang text-lg font-bold md:grid">
      {#each Object.values(navlinks) as { href, text }}
        <li
          class="navlink relative px-2 hover:text-primary"
          data-active={$page.url.pathname.startsWith(href) ? 'true' : 'false'}
        >
          <a {href} sveltekit:prefetch>{text}</a>
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
        {#each [{ href: to(AppRoutes.index), text: 'home' }, ...Object.values(navlinks)] as { href, text }}
          <li
            class="navlink relative px-3 hover:text-primary"
            data-active={(href === to(AppRoutes.index) && href === $page.url.pathname) ||
            (href !== to(AppRoutes.index) && $page.url.pathname.startsWith(href))
              ? 'true'
              : 'false'}
          >
            <a {href} on:click={() => (navbarMenuOpen = false)} sveltekit:prefetch>{text}</a>
          </li>
        {/each}
      </ul>
    {/if}

    <ul class="flex flex-1 items-center justify-end gap-x-6">

      <li>
        <Dropdown id="locale-dropdown" items={Object.values(locales)}>
          <span
            class="c-btn-icon"
            use:tooltip={{ content: $t('navbar.tooltip.locale') }}
          >
            <Icon data={language} scale={2} />
          </span>

          <svelte:fragment slot="items">
            {#each Object.values(locales) as { id, hint, text, icon } (id)}
              <li lang={id}>
                <button
                  on:click={() => changeLocale(id)}
                  class="flex w-full items-center gap-x-4 py-2 px-4 hover:bg-primary"
                >
                  <img
                    src={icon}
                    alt={hint}
                    width="32"
                    height="32"
                    use:tooltip={{ content: hint }}
                  />
                  <span>{text}</span>
                </button>
              </li>
            {/each}
          </svelte:fragment>
        </Dropdown>
      </li>

      <li use:tooltip={{ content: $t('navbar.tooltip.theme'), placement: 'bottom' }}>
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

      {#if !$session.jwt}
        <li use:tooltip={{ content: $t('navbar.tooltip.login'), placement: 'bottom' }}>
          <a href={to(AppRoutes.login.index)} class="hover:text-primary">
            <Icon data={signIn} scale={2} />
          </a>
        </li>
      {:else}
        <li>
          <Dropdown id="user-actions">
            <span
              class="c-btn-icon"
              use:tooltip={{ content: $t('navbar.tooltip.user') }}
            >
              <Avatar user={$session.jwt} />
            </span>

            <svelte:fragment slot="items">
              <li class="w-full py-2 px-4 hover:bg-primary">
                <a class="flex items-center gap-x-4" href={to(AppRoutes.profile.index)} alt="to profile page">
                  <span>
                    <Icon data={user} scale={1.5} />
                  </span>
                  <span >{$t('navbar.userActions.profile')}</span>
                </a>
              </li>
              <li class="w-full py-2 px-4 hover:bg-primary">
                <a class="flex items-center gap-x-4" href={logoutHref} alt="logout">
                  <span>
                    <Icon data={signOut} scale={1.5} />
                  </span>
                  <span>{$t('navbar.userActions.logout')}</span>
                </a>
              </li>
            </svelte:fragment>
          </Dropdown>
        </li>
      {/if}

    </ul>
  </div>
</nav>

{#if !isLightTheme}
  <div transition:fade={{ duration: 800 }} class="backdrop fixed inset-0 z-overlay" />
  <label
    for="theme-toggler"
    transition:fly={{ y: -500, easing: elasticInOut, duration: 1000 }}
    class="fixed top-[10vh] left-1/2 z-overlay -translate-x-1/2 cursor-pointer"
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

  .navlink[data-active='true'] {
    @apply text-primary;
  }

  .navlink[data-active='true']::after,
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
