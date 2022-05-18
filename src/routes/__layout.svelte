<script lang="ts">
  import { Navbar, Footer } from '$lib/ui/components';
  import '$lib/ui/styles/app.css';
</script>

<div class="flex h-full flex-col">
  <Navbar
    class="fixed top-0 z-50 left-0 right-0 bg-bg-accent/80 px-6 shadow-lg hover:bg-bg-accent/95 hover:shadow-xl"
  />

  <div class="flex-1 w-full pt-[theme('spacing.20')]">
    <slot />
  </div>

  <Footer class="px-6 sm:px-10" />
</div>
