<script lang="ts">
  import BackToTopBtn from '$lib/ui/components/BackToTopBtn/BackToTopBtn.svelte';
  import CommandPaletteWrapper from '$lib/ui/components/CommandPalette/CommandPalette.wrapper.svelte';
  import '$lib/ui/styles/app.css';
</script>

<slot />

<CommandPaletteWrapper />
<BackToTopBtn />
