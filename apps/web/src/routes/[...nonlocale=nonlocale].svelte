<script lang="ts" context="module">
  import { locale, Locale } from '$lib/services/i18n';
  import type { Load } from './__types/[...nonlocale=nonlocale]';

  export const load: Load = ({ params }) => {
    return {
      status: 301,
      redirect: `/${locale.get() ?? Locale.en}/${params.nonlocale}`,
    };
  };
</script>
