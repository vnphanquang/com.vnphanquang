<script context="module" lang="ts">
  import { AppRoutes } from '$generated/routing';
  import { NotFoundBlog } from '$lib/ui/errors';

  /** @type {import('./[...path]').Load} */
  export function load({ params }) {
    return {
      status: 404,
      error: new NotFoundBlog(`Not found: ${AppRoutes.blog.index}/${params.path}`),
    };
  }
</script>
