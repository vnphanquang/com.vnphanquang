<script lang="ts" context="module">
  import { NotFoundBlog } from '$lib/errors';
  import { getPostLocaleById } from '$lib/services/api/graphql/queries/Post.gq';

  import type { Load } from '.svelte-kit/types/src/routes/[locale=locale]/blog/__types/__layout';

  export const load: Load = async ({ fetch, url }) => {
    const slug = url.pathname.substring(url.pathname.lastIndexOf('/') + 1);
    const { postLocaleBySlug } = await getPostLocaleById({
      fetch: fetch as any,
      variables: { slug },
    });
    if (!postLocaleBySlug) {
      return {
        status: 404,
        error: new NotFoundBlog(`Not found: ${url.pathname}`),
      };
    }
    return {
      stuff: {
        postLocale: postLocaleBySlug,
      },
    };
  };
</script>

<slot />
