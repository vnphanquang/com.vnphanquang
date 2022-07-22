<script lang="ts" context="module">
  export let prerender = false;

  import Icon from 'svelte-awesome/components/Icon.svelte';
  import list from 'svelte-awesome/icons/list';
  import signIn from 'svelte-awesome/icons/signIn';
  import spinner from 'svelte-awesome/icons/spinner';
  import { fade } from 'svelte/transition';

  import { page } from '$app/stores';
  import { tooltip } from '$lib/actions/tooltip';
  import OrbitalList from '$lib/components/OrbitalList/OrbitalList.svelte';
  import { t } from '$lib/services/i18n';
  import { AppRoutes, to } from '$lib/services/navigation';

  import { AppConfig } from '$config';
  import type { Load } from '.svelte-kit/types/src/routes/[locale=locale]/login/__types';

  export const load: Load = ({ session, url }) => {
    if (session.jwt) {
      return {
        status: 302,
        redirect: to(AppRoutes.index),
      };
    }
    return {
      stuff: {
        meta: {
          title: 'Login | vnphanquang',
          description: 'Authentication for visitor',
        },
      },
    };
  };
</script>

<script lang="ts">
  const OAUTH_PROVIDERS = {
    google: {
      id: 'google',
      icon: '/images/brands/google.svg',
    },
    facebook: {
      id: 'facebook',
      icon: '/images/brands/facebook.svg',
    },
    github: {
      id: 'github',
      icon: '/images/brands/github.svg',
    },
    discord: {
      id: 'discord',
      icon: '/images/brands/discord.svg',
    },
    spotify: {
      id: 'spotify',
      icon: '/images/brands/spotify.svg',
    },
  } as const;

  const DISPLAY_MODE = [
    {
      id: 'orbital',
      icon: spinner,
    },
    {
      id: 'buttons',
      icon: list,
    },
  ] as const;
  let displayMode: typeof DISPLAY_MODE[number]['id'] = 'orbital';

  $: redirectUrl = $page.url.searchParams.get('redirectUrl') ?? '';

  function getOauthUrl(id: string) {
    return `${AppConfig.urls.api.index}/oauth?provider=${id}${
      redirectUrl ? `&redirectUrl=${redirectUrl}` : ''
    }`;
  }
</script>

<main class="flex flex-col items-center gap-y-10 py-20 px-8 md:px-20">
  <h1 class="text-center text-5xl font-bold md:text-6xl">{$t('login.title')}</h1>
  <p class="text-center italic">{$t('login.subtitle')}</p>

  <div class="mx-auto flex w-full items-end justify-end md:w-8/12">
    <div class="flex-1 border-b-2 border-border border-opacity-50">
      <p class="hidden font-bold md:block">{$t('login.displayMode.title')}</p>
    </div>
    <div class="c-tabs">
      {#each DISPLAY_MODE as { id, icon } (id)}
        {@const active = id === displayMode}
        <label class="c-tab {active ? 'c-tab-active' : ''} flex gap-x-2" for={`view-${id}`}>
          <span>{$t(`login.displayMode.${id}`)}</span>
          <input
            type="radio"
            name="view-mode"
            id={`view-${id}`}
            value={id}
            hidden
            bind:group={displayMode}
          />
          <Icon data={icon} scale={1} />
        </label>
      {/each}
    </div>
  </div>

  {#if displayMode === 'orbital'}
    <section class="grid h-96 place-items-center" in:fade={{ duration: 250 }}>
      <OrbitalList items={Object.values(OAUTH_PROVIDERS)} class="" radius={125} orbitDuration={40}>
        <div
          slot="center"
          class="grid h-20 w-20 place-items-center rounded-full bg-bg-accent text-primary shadow-lg"
          use:tooltip={{ content: $t('login.orbitalCenterTooltip') }}
        >
          <Icon data={signIn} scale={2} />
        </div>

        <div class="rounded-full bg-bg-accent shadow-lg" slot="item" let:item>
          <a
            href={getOauthUrl(item.id)}
            alt="redirect to open authentication for {item.id}"
            class="grid h-20 w-20 place-items-center"
            use:tooltip={{
              content: `${$t('login.cta')} ${
                item.id.charAt(0).toUpperCase() + item.id.substring(1)
              }`,
            }}
          >
            <img src={item.icon} alt={item.id} width="36" height="36" />
          </a>
        </div>
      </OrbitalList>
    </section>
  {:else if displayMode === 'buttons'}
    <section class="grid h-96 place-items-center" in:fade={{ duration: 250 }}>
      <ul class="grid h-96 grid-cols-1 content-center items-stretch gap-6 md:grid-cols-2">
        {#each Object.values(OAUTH_PROVIDERS) as { id, icon } (id)}
          <li>
            <a
              class="flex w-full items-center overflow-hidden rounded-md border border-primary bg-primary text-bg hover:border-primary-hover hover:bg-primary-hover active:scale-[98%] active:border-primary-active active:bg-primary-active"
              href={getOauthUrl(id)}
              alt="redirect to open authentication for {id}"
            >
              <span class="bg-bg p-3">
                <img src={icon} alt={id} width="24" height="24" />
              </span>
              <span class="flex-1 px-3"
                >{$t('login.cta')} {id.charAt(0).toUpperCase() + id.substring(1)}</span
              >
            </a>
          </li>
        {/each}
      </ul>
    </section>
  {:else}
    <!-- should never reach -->
  {/if}
</main>

<style lang="postcss">
  /* FIXME: extract this to tailwind plugin */
  .c-tabs {
    @apply flex flex-wrap items-end;
  }
  .c-tab {
    @apply text-center leading-loose opacity-50 hover:opacity-100;
    @apply relative flex-wrap items-center justify-center;
    @apply inline-flex h-8 cursor-pointer select-none px-4;
    @apply border-b-2 border-solid border-border;

    &.c-tab-active {
      @apply border-fg opacity-100;
    }
    &:focus {
      @apply outline-none;
    }
    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: -3px;
    }
  }
</style>
