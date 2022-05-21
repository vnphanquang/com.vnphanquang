<script lang="ts">
  import { Navbar, Footer } from '$lib/ui/components';
  import { NotificationContainer } from '$lib/ui/services/notification';
</script>

<div class="flex h-full flex-col">
  <Navbar class="fixed top-0 left-0 right-0 z-navbar" />

  <div class="w-full flex-1 pt-[theme('spacing.20')]">
    <slot />
  </div>

  <Footer class="px-6 sm:px-10" />
</div>

<NotificationContainer class="fixed bottom-6 left-6 z-notification" />
