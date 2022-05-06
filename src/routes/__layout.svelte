<script lang="ts">
  import { Footer } from '$lib/ui/components';
  import '$lib/ui/styles/base.css';
</script>

<div class="flex h-full flex-col">
  <navbar id="navbar" />

  <main class="flex-1 px-6 sm:px-10 md:px-32">
    <slot />
  </main>

  <Footer class="px-6 sm:px-10" />
</div>
