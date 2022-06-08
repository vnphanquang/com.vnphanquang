<script lang="ts">
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import { AppConfig } from '$config';

  const MEASUREMENT_ID = 'G-8WJ72291KL';

  $: if (browser && AppConfig.mode === 'production' && gtag) {
    gtag('config', MEASUREMENT_ID, {
      page_title: document.title,
      page_location: $page.url.href,
      page_path: $page.url.pathname,
    });
  }
</script>

<svelte:head>
  {#if AppConfig.mode === 'production'}
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={MEASUREMENT_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-8WJ72291KL');
    </script>
  {/if}
</svelte:head>
