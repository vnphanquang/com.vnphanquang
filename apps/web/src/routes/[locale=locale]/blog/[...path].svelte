<script context="module" lang="ts">
  import { NotFoundBlog } from '$lib/errors';
  import { AppRoutes, to } from '$lib/services/navigation';
  import type { Load } from './__types/[...path]';

  export const load: Load = ({ params }) => {
    return {
      status: 404,
      error: new NotFoundBlog(`Not found: ${to(AppRoutes.blog.index)}/${params.path}`),
    };
  };
</script>
