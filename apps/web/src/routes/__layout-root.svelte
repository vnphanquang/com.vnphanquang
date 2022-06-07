<script lang="ts">
  import BackToTopBtn from '$lib/components/BackToTopBtn/BackToTopBtn.svelte';
  import CommandPaletteWrapper from '$lib/components/CommandPalette/CommandPalette.wrapper.svelte';
  import '$lib/styles/app.css';
</script>

<slot />

<CommandPaletteWrapper />
<BackToTopBtn />
