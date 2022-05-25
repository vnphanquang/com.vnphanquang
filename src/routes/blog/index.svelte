<script lang="ts">
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import code from 'svelte-awesome/icons/code';

  import { AppRoutes } from '$generated/routing';
  import { BLOG_METADATA } from '$lib/data/blogs';
  import { blogDate } from '$lib/utils/datetime';

  function getCornerIcon(tags: string[]) {
    if (tags.includes('code')) {
      return code;
    }
  }
</script>

<svelte:head>
  <title>Blog | vnphanquang</title>
  <meta name="description" content="Quang Phan's blog page" />

  <meta property="og:title" content="Blog of vnphanquang" />
  <meta property="og:image" content="https://vnphanquang.com/images/screenshot-about.png" />
  <meta property="og:url" content="https://vnphanquang.com{AppRoutes.blog.index}" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<!-- TODO: breadcumbs -->
<main class="flex flex-col h-full py-20 px-8 md:px-20 w-full max-w-5xl mx-auto">
  <h1 class="text-center font-quang text-6xl font-bold">Yet Another Blog</h1>
  <p class='text-center mt-8 font-quang text-2xl'>
    You write, i write, we all write
  </p>
  <section class="flex-1 mt-20">
    <ul>
      {#each Object.values(BLOG_METADATA) as { title, description, tags, href, updatedAt }}
        <li class="relative grid grid-cols-1 gap-y-6 shadow-center-lg hover:shadow-center-xl p-8 rounded-xl bg-bg border-2 border-border">
          <p class="flex gap-x-2">
            {#each tags as tag}
              <span class="c-tag">{tag}</span>
            {/each}
          </p>
          <h2 class="text-2xl font-bold">{title}</h2>
          <p class="">{blogDate(updatedAt)}</p>
          <p>{description}</p>
          <a {href} class="c-btn w-fit">Read on</a>
          <p class="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 bg-bg-accent rounded-full grid place-items-center p-3">
            <Icon data={getCornerIcon(tags)} scale={2} />
          </p>
        </li>
      {/each}
    </ul>
    <p class="text-center mt-20">More to come...</p>
  </section>
</main>
