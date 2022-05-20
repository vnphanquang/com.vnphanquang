<script lang="ts">
  import { AppRoutes } from '$generated/routing';
  import { SkewedFlipCard } from '$lib/ui/components';

  const sectors = [
    {
      id: 'open-source',
      title: ['open', 'source'],
      headline: 'Broken applications, unfinished features, failed tests, ...',
      paragraphs: [
        'This is where my code never see the light of day.',
        `Visit <a
          href="https://github.com/vnphanquang"
          class="c-link"
          target="_blank">github</a
        > for "free" softwares.`,
      ],
    },
    {
      id: 'blog-posts',
      title: ['blog', 'posts'],
      headline: 'Cringeworthy writing, irrational logics, irrelevant topics, ...',
      paragraphs: [
        "This is what I'll definitely regret two years from now.",
        `See <a href="${AppRoutes.blog.index}" class="c-link" sveltekit:prefetch>blog page</a> for more.`,
      ],
    },
    {
      id: 'captured-photos',
      title: ['captured', 'photos'],
      headline: 'Underexposed photos, unbalanced composition, out-of-focus subjects,...',
      paragraphs: [
        'Maybe one of these photo is worth a banh mi?',
        `See <a href="${AppRoutes.gallery.index}" class="c-link" sveltekit:prefetch>gallery</a> for (perhaps) joy?`,
      ],
    },
    {
      id: 'more-things',
      title: ['more', 'things'],
      headline: '',
      paragraphs: [
        `Absolutely nothing here. Maybe the possibilities are infinite? Perhaps it reflects my
        empty soul. But really it's just here to balance this UI grid... /shrug`,
      ],
    },
  ];
</script>

<div class="w-full max-w-5xl {$$props.class}">
  <div class="text-center">
    <h2 class="text-2xl font-bold md:text-3xl">Experimentation Sectors</h2>
    <p class="mt-4 italic">Projects go boom 💥</p>
  </div>
  <div class="mt-20 grid grid-cols-1 place-items-center gap-28 md:grid-cols-2">
    {#each sectors as { id, title, headline, paragraphs }, index}
      <article>
        <SkewedFlipCard class="h-72 w-72 md:w-80" {id} skew={index % 2 === 0 ? 'right' : 'left'}>
          <h3 slot="front" class="font-quang text-4xl">
            <span class="enclosed">{title[0]}</span>{title[1]}
          </h3>
          <div slot="back" class="prose p-4 text-sm md:p-8">
            <p class="text-lg">{headline}</p>
            {#each paragraphs as paragraph}
              <p>{@html paragraph}</p>
            {/each}
          </div>
        </SkewedFlipCard>
      </article>
    {/each}
  </div>
</div>

<style>
  .enclosed {
    @apply text-yellow;
    background: theme('colors.fg');
    padding: 0 5px;
    display: inline-block;
    transform: scale(0.75);
    transform-origin: right center;
  }
</style>
