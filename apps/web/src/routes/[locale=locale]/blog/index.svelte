<script context="module" lang="ts">
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import code from 'svelte-awesome/icons/code';

  import { getPostLocalesForBlogIndex } from '$lib/services/api/graphql/queries/Post.gq';
  import type { PostLocalesForBlogIndexQuery } from '$lib/services/api/graphql/queries/Post.gq';
  import { t } from '$lib/services/i18n';
  import type { Locale } from '$lib/services/i18n';
  import { AppRoutes, to } from '$lib/services/navigation';
  import { blogDate } from '$lib/utils/datetime';

  import type { Load } from '.svelte-kit/types/src/routes/[locale=locale]/blog/__types/[...path]';

  export const load: Load = async ({ fetch, params }) => {
    const locale = params.locale;

    const { postLocales } = await getPostLocalesForBlogIndex({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetch: fetch as any,
      variables: {
        locale: locale as Locale,
      },
    });
    return {
      props: {
        postLocales,
        locale,
      },
      stuff: {
        meta: {
          title: 'Blog | vnphanquang',
          description: "Quang Phan's blog listing",
          og: {
            title: 'Blog of vnphanquang',
            image: '/images/screenshots/blog.png',
          },
        },
      },
    };
  };
</script>

<script lang="ts">
  export let locale: Locale;
  export let postLocales: PostLocalesForBlogIndexQuery['postLocales'] = [];

  function getCornerIcon(category: string) {
    switch (category) {
      case 'code':
        return code;
      default:
        break;
    }
  }
</script>

<!-- TODO: breadcumbs -->
<main class="mx-auto flex h-full w-full max-w-5xl flex-col py-20 px-8 md:px-20">
  <h1 class="text-center text-6xl font-bold">{$t('blog.title')}</h1>
  <p class="mt-8 text-center text-lg italic">{$t('blog.subtitle')}</p>
  <section class="mt-20 flex-1">
    <ul class="flex flex-col gap-y-10">
      {#each postLocales as { updatedAt, id, published, title, summary, post } (id)}
        {@const category = post.category}
        {@const tags = post.tags}
        {@const href = `${to(AppRoutes.blog.index)}/${post.slug}`}
        <li
          class="relative grid grid-cols-1 gap-y-6 rounded-xl border-2 border-border bg-bg p-8 shadow-center-lg hover:shadow-center-xl"
        >
          <p class="flex gap-x-2">
            {#each [category, ...tags] as tag}
              <span class="c-tag">{tag}</span>
            {/each}
          </p>
          <h2 class="text-2xl font-bold">{title}</h2>
          <p class="">{blogDate(updatedAt, locale)}</p>
          {#if !published}
            <p>Not published</p>
          {/if}
          <p>{summary}</p>
          <a {href} class="c-btn w-fit" sveltekit:prefetch>{$t('blog.readOn')}</a>
          <p
            class="absolute left-0 top-0 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bg-accent p-3"
          >
            <Icon data={getCornerIcon(category)} scale={2} />
          </p>
        </li>
      {/each}
    </ul>
    <p class="mt-20 text-center">{$t('blog.etc')}</p>
  </section>
</main>
