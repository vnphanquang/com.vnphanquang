<script lang="ts">
  import { browser } from '$app/env';
  import { page } from '$app/stores';

  export let enabled = false;
  export let measurementId: string;

  // eslint-disable-next-line no-undef
  $: if (browser && enabled && gtag) {
    // eslint-disable-next-line no-undef
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: $page.url.href,
      page_path: $page.url.pathname,
    });
  }
</script>

<svelte:head>
  {#if enabled}
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={measurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
    </script>
  {/if}
</svelte:head>
