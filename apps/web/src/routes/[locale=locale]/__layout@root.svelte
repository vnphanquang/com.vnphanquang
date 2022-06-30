<script lang="ts" context="module">
  import { Navbar, Footer } from '$lib/components';
  import { locale, loadTranslations } from '$lib/services/i18n';
  import { NotificationContainer } from '$lib/services/notification';

  import type { Load } from './__types';

  export const load: Load = ({ params, url, session }) => {
    console.log(`Turbo ~ file: __layout@root.svelte ~ line 7 ~ session`, session);
    locale.set(params.locale);
    loadTranslations(params.locale, url.pathname);
    return {};
  };
</script>

<div class="flex h-full flex-col">
  <Navbar class="fixed top-0 left-0 right-0 z-navbar" />

  <div class="w-full flex-1 pt-[theme('spacing.20')]">
    <slot />
  </div>

  <Footer class="px-6 sm:px-10" />
</div>

<NotificationContainer class="fixed bottom-6 left-6 z-notification" />
