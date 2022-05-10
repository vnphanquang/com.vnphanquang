<script lang="ts">
  import { Footer } from '$lib/ui/components';
  import '$lib/ui/styles/base.css';
</script>

<div class="flex h-full flex-col">
  <!-- <navbar id="navbar" class="h-[80px] bg-primary">
    Navigation Bar
  </navbar> -->

  <slot />

  <Footer class="px-6 sm:px-10" />
</div>
