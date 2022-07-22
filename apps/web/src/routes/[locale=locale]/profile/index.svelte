<script lang="ts" context="module">
  export let prerender = false;

  // import { session } from '$app/stores';
  import { AppRoutes, to } from '$lib/services/navigation';

  import type { Load } from '.svelte-kit/types/src/routes/[locale=locale]/profile/__types';

  export const load: Load = ({ session }) => {
    if (!session.jwt) {
      return {
        status: 302,
        redirect: to(AppRoutes.login.index),
      };
    }
    return {
      stuff: {
        meta: {
          title: 'Profile | vnphanquang',
          description: 'User profile of logged visitor',
        },
      },
    };
  };
</script>

<script lang="ts">
</script>
