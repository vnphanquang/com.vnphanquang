<script context="module" lang="ts">
  import type { Load } from './__types/[...notfound]';

  export const load: Load = ({ params }) => {
    return {
      status: 404,
      error: new Error(`Not found: ${params.notfound}`),
    };
  }
</script>

