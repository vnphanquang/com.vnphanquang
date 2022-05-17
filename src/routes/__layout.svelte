<script lang="ts">
  import { Navbar, Footer } from '$lib/ui/components';
  import '$lib/ui/styles/app.css';
</script>

<div class="flex h-full flex-col overflow-y-auto">
  <Navbar
    class="sticky top-0 z-50 bg-bg-accent/80 px-6 shadow-lg hover:bg-bg-accent/95 hover:shadow-xl"
  />

  <slot />

  <Footer class="px-6 sm:px-10" />
</div>
