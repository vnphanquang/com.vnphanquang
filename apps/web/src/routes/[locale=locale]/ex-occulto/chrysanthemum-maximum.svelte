<script lang="ts" context="module">
  import type { Load } from '.svelte-kit/types/src/routes/[locale=locale]/ex-occulto/__types/chrysanthemum-maximum';

  export const load: Load = () => {
    return {
      stuff: {
        meta: {
          title: 'Chrysanthemum | Socius',
        },
      },
    };
  };
</script>

<main class="grid animate-fade-in-up place-items-center gap-y-10 py-20 px-5 font-quang" />
