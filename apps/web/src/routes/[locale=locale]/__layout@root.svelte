<script lang="ts" context="module">
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import { Footer } from '$lib/components/Footer';
  import { Navbar } from '$lib/components/Navbar';
  import { locale, loadTranslations } from '$lib/services/i18n';
  import { NotificationContainer } from '$lib/services/notification';

  import type { Load } from './__types';

  export const load: Load = ({ params, url }) => {
    locale.set(params.locale);
    loadTranslations(params.locale, url.pathname);
    return {
      props: {
        pathnameWithoutLocale: url.pathname.substring(3),
      },
    };
  };
</script>

<script lang="ts">
  export let pathnameWithoutLocale: string;

  const TRANSITION_DURATION = 300;
  const yIn = 12;
  const yOut = -12;
</script>

<div class="flex h-full flex-col">
  <Navbar class="fixed top-0 left-0 right-0 z-navbar" />

  {#key pathnameWithoutLocale}
    <div
      class="w-full flex-1 pt-[theme('spacing.20')]"
      in:fly={ {
        y: yIn,
        duration: TRANSITION_DURATION,
        delay: TRANSITION_DURATION,
        easing: cubicOut,
      }}
      out:fly={{
        y: yOut,
        duration: TRANSITION_DURATION,
        easing: cubicIn,
      }}
    >
      <slot />
    </div>
  {/key}

  <Footer class="px-6 sm:px-10" />
</div>

<NotificationContainer class="fixed bottom-6 left-6 z-notification" />
