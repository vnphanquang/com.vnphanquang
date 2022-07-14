<script lang="ts">
  import BackToTopBtn from '$lib/components/BackToTopBtn/BackToTopBtn.svelte';
  import CommandPaletteWrapper from '$lib/components/CommandPalette/CommandPalette.wrapper.svelte';
  import Analytics from '$lib/services/analytics/Analytics.svelte';
  import '$lib/styles/app.css';

  import { AppConfig } from '$config';
</script>

<Analytics
  measurementId={AppConfig.env.gtagMeasurementId}
  enabled={AppConfig.mode === 'production'}
/>

<slot />

<CommandPaletteWrapper />
<BackToTopBtn />
