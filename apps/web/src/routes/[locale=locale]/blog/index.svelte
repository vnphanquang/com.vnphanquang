<script lang="ts">
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import code from 'svelte-awesome/icons/code';

  import { BLOG_METADATA } from '$lib/data/blogs';
  import { AppRoutes, to } from '$lib/services/navigation';
  import { blogDate } from '$lib/utils/datetime';

  import { AppConfig } from '$config';

  function getCornerIcon(category: string) {
    switch (category) {
      case 'code':
        return code;
      default:
        break;
    }
  }
</script>

<svelte:head>
  <title>Blog | vnphanquang</title>
  <meta name="description" content="Quang Phan's blog page" />

  <meta property="og:title" content="Blog of vnphanquang" />
  <meta property="og:image" content="{AppConfig.urls.web}/images/screenshots/blog.png" />
  <meta property="og:url" content="{AppConfig.urls.web}{to(AppRoutes.blog.index)}" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<!-- TODO: breadcumbs -->
<main class="mx-auto flex h-full w-full max-w-5xl flex-col py-20 px-8 md:px-20">
  <h1 class="text-center font-quang text-6xl font-bold">Yet Another Blog</h1>
  <p class="mt-8 text-center font-quang text-2xl">You write, i write, we all write</p>
  <section class="mt-20 flex-1">
    <ul class="flex flex-col gap-y-10">
      {#each Object.values(BLOG_METADATA) as { title, description, category, tags, href, updatedAt }}
        <li
          class="relative grid grid-cols-1 gap-y-6 rounded-xl border-2 border-border bg-bg p-8 shadow-center-lg hover:shadow-center-xl"
        >
          <p class="flex gap-x-2">
            {#each [category, ...tags] as tag}
              <span class="c-tag">{tag}</span>
            {/each}
          </p>
          <h2 class="text-2xl font-bold">{title}</h2>
          <p class="">{blogDate(updatedAt)}</p>
          <p>{description}</p>
          <a {href} class="c-btn w-fit" sveltekit:prefetch>Read on</a>
          <p
            class="absolute left-0 top-0 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bg-accent p-3"
          >
            <Icon data={getCornerIcon(category)} scale={2} />
          </p>
        </li>
      {/each}
    </ul>
    <p class="mt-20 text-center">More to come...</p>
  </section>
</main>
