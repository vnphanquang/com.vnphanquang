<script context="module">
  import { NotFoundBlog } from '$lib/ui/errors';

  /** @type {import('./[...path]').Load} */
  export function load({ params }) {
    return {
      status: 404,
      error: new NotFoundBlog(`Not found: /blog/${params.path}`)
    };
  }
</script>
