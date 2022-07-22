<script lang="ts">
  import { page } from '$app/stores';
  import BackToTopBtn from '$lib/components/BackToTopBtn/BackToTopBtn.svelte';
  import CommandPaletteWrapper from '$lib/components/CommandPalette/CommandPalette.wrapper.svelte';
  import Analytics from '$lib/services/analytics/Analytics.svelte';
  import { Locale } from '$lib/services/i18n';
  import '$lib/styles/app.css';

  import { AppConfig } from '$config';

  $: locale = $page.params.locale;
  $: pathname = $page.url.pathname.substring(3);
  $: originalUrl = `${AppConfig.urls.web}${pathname}`;

  // seo
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

  <meta property="fb:app_id" content={AppConfig.env.facebookAppId} />

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

  <link rel="alternate" hreflang="x-default" href="{AppConfig.urls.web}/en{pathname}" />
  {#each Object.values(Locale).filter((le) => le !== locale) as l}
    <link rel="alternate" hreflang={l} href="{AppConfig.urls.web}/{l}{pathname}" />
  {/each}
</svelte:head>

<Analytics
  measurementId={AppConfig.env.gtagMeasurementId}
  enabled={AppConfig.mode === 'production'}
/>

<slot />

<CommandPaletteWrapper />
<BackToTopBtn />
