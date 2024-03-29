<script lang="ts">
  import { browser } from '$app/env';
  import { beforeNavigate } from '$app/navigation';
  import { navigating, page } from '$app/stores';
  import { AppRoutes } from '$generated/routing';
  import BackToTopBtn from '$lib/components/BackToTopBtn/BackToTopBtn.svelte';
  import CommandPaletteWrapper from '$lib/components/CommandPalette/CommandPalette.wrapper.svelte';
  import { Locale } from '$lib/services/i18n';
  import '$lib/styles/app.css';

  import { AppConfig } from '$config';

  $: locale = $page.params.locale;
  $: originalUrl = $page.url.href;

  $: meta = $page.stuff.meta;

  $: title = meta?.title ?? 'vnphanquang';
  $: description = meta?.description ?? "Quang Phan's website";

  $: ogTitle = meta?.og?.title ?? 'vnphanquang';
  $: ogDescription = meta?.og?.description ?? description;
  $: ogType = meta?.og?.type ?? 'website';
  $: ogImage = meta?.og?.image ?? `${AppConfig.urls.web}/images/screenshots/index.png`;

  $: twitterCard = meta?.twitter?.card ?? 'summary_large_image';
  $: twitterImageAlt = meta?.twitter?.imageAlt ?? 'vnphanquang website';
  $: twitterSite = meta?.twitter?.site ?? '@vnphanquang';

  $: langAlternatives = meta?.langAlternatives ?? Object.values(Locale);

  $: facebookAppId = AppConfig.env.facebookAppId;

  $: gtagMeasurementId = AppConfig.env.gtagMeasurementId;
  $: gtagEnabled = AppConfig.mode === 'production';

  // eslint-disable-next-line no-undef
  $: if (browser && gtagEnabled && gtag) {
    // eslint-disable-next-line no-undef
    gtag('config', gtagMeasurementId, {
      page_title: document.title,
      page_location: $page.url.href,
      page_path: $page.url.pathname,
    });
  }

  beforeNavigate(({ from, to }) => {
    if (to?.pathname.endsWith(AppRoutes.login.index) && from.pathname !== to.pathname) {
      const redirectUrl = `${AppConfig.urls.web}${from.pathname}`;
      to.searchParams.append('redirectUrl', redirectUrl);
    }
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <meta property="og:title" content={ogTitle} />
  <meta property="og:description" content={ogDescription} />
  <meta property="og:type" content={ogType} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content={originalUrl} />

  <meta name="twitter:card" content={twitterCard} />
  <meta name="twitter:image:alt" content={twitterImageAlt} />
  <meta name="twitter:site" content={twitterSite} />

  <meta property="fb:app_id" content={facebookAppId} />

  {#if meta?.article}
    {@const { author, section, tags = [], publishedTime, modifiedTime } = meta.article}
    <meta property="article:author" content={author} />
    <meta property="article:section" content={section} />
    {#each tags as tag}
      <meta property="article:tag" content={tag} />
    {/each}
    <meta property="article:published_time" content={publishedTime} />
    <meta property="article:modified_time" content={modifiedTime} />
  {/if}

  {#if meta?.profile}
    {@const { firstName, lastName, gender, username } = meta.profile}
    <meta property="profile:first_name" content={firstName} />
    <meta property="profile:last_name" content={lastName} />
    <meta property="profile:gender" content={gender} />
    <meta property="profile:username" content={username} />
  {/if}

  <link
    rel="alternate"
    hreflang="x-default"
    href={locale === Locale.En ? originalUrl : originalUrl.replace(`/${locale}/`, '/en/')}
  />
  {#each langAlternatives.filter((le) => le !== locale) as l}
    <link rel="alternate" hreflang={l} href={originalUrl.replace(`/${locale}/`, `/${l}/`)} />
  {/each}

  {#if gtagEnabled}
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={gtagMeasurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
    </script>
  {/if}
</svelte:head>

<slot />

<CommandPaletteWrapper />
<BackToTopBtn />

<!-- TODO: extract custom store and reuse for api loading -->
{#if !!$navigating}
  <div class="fixed z-overlay inset-0 grid place-items-center bg-bg-accent/90">
    <!-- https://codepen.io/t_afif/pen/gOmooGQ -->
    <div class="global-loader" />
  </div>
{/if}

<style lang="postcss">
  .global-loader {
    @apply text-primary scale-125;

    width: 40px;
    height: 20px;
    --c: radial-gradient(farthest-side, currentColor 93%, #0000);
    background: var(--c) 0 0, var(--c) 50% 0;
    background-size: 8px 8px;
    background-repeat: no-repeat;
    position: relative;
    clip-path: inset(-200% -100% 0 0);
    animation: loader-0 1.5s linear infinite;
  }
  .global-loader:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 12px;
    background: currentColor;
    left: -16px;
    top: 0;
    animation: loader-1 1.5s linear infinite, loader-2 0.5s cubic-bezier(0, 200, 0.8, 200) infinite;
  }
  .global-loader:after {
    content: '';
    position: absolute;
    inset: 0 0 auto auto;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
    animation: loader-3 1.5s linear infinite;
  }

  @keyframes loader-0 {
    0%,
    30% {
      background-position: 0 0, 50% 0;
    }
    33% {
      background-position: 0 100%, 50% 0;
    }
    41%,
    63% {
      background-position: 0 0, 50% 0;
    }
    66% {
      background-position: 0 0, 50% 100%;
    }
    74%,
    100% {
      background-position: 0 0, 50% 0;
    }
  }

  @keyframes loader-1 {
    90% {
      transform: translateY(0);
    }
    95% {
      transform: translateY(15px);
    }
    100% {
      transform: translateY(15px);
      left: calc(100% - 8px);
    }
  }

  @keyframes loader-2 {
    100% {
      top: -0.1px;
    }
  }

  @keyframes loader-3 {
    0%,
    80%,
    100% {
      transform: translate(0);
    }
    90% {
      transform: translate(26px);
    }
  }
</style>
