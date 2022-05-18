<script lang="ts">
  import { SkewedFlipCard } from '$lib/ui/components';
</script>

<div class="w-full max-w-5xl {$$props.class}">
  <div class="text-center">
    <h2 class="text-3xl font-bold">Experimentation Sectors</h2>
    <p class="mt-4 italic">Projects go boom 💥</p>
  </div>
  <div class="mt-20 grid grid-cols-1 place-items-center gap-28 md:grid-cols-2">
    <article>
      <SkewedFlipCard class="h-64 w-80" id="open-source" skew="right">
        <h3 slot="front" class="font-quang text-4xl">
          <span class="enclosed">open</span>source
        </h3>
        <div slot="back" class="prose p-8 text-sm">
          <p class="text-lg">Broken applications, unfinished features, failed tests, ...</p>
          <p class="">This is where my code never see the light of day.</p>
          <p class="">
            Visit <a
              href="https://github.com/vnphanquang"
              class="underline hover:text-secondary"
              target="_blank">github</a
            > for "free" softwares.
          </p>
        </div>
      </SkewedFlipCard>
    </article>
    <article>
      <SkewedFlipCard class="h-64 w-80" id="something" skew="left">
        <h3 slot="front" class="font-quang text-4xl">
          <span class="enclosed">blog</span>posts
        </h3>
        <div slot="back" class="prose p-8 text-sm">
          <p class="text-lg">Cringeworthy writing, irrational logics, irrelevant topics, ...</p>
          <p class="">This is what I'll definitely regret two years from now.</p>
          <p class="">
            See <a href="/blog" class="underline hover:text-secondary">blog page</a> for more.
          </p>
        </div>
      </SkewedFlipCard>
    </article>
    <article>
      <SkewedFlipCard class="h-64 w-80 p-4" id="gallery" skew="right">
        <h3 slot="front" class="font-quang text-4xl">
          <span class="enclosed">captured</span>photos
        </h3>
        <div slot="back" class="prose p-8 text-sm">
          <p class="text-lg">
            Underexposed photos, unbalanced composition, out-of-focus subjects,...
          </p>
          <p class="">Maybe one of these photo is worth a banh mi?</p>
          <p class="">
            See <a href="/gallery" class="underline hover:text-secondary">gallery</a> for (perhaps) joy?
          </p>
        </div>
      </SkewedFlipCard>
    </article>
    <article>
      <SkewedFlipCard class="h-64 w-80" id="blog" skew="left">
        <h3 slot="front" class="font-quang text-4xl">
          <span class="enclosed">more</span>things
        </h3>
        <div slot="back" class="prose p-8 text-sm">
          <p class="text-base">
            Absolutely nothing here. Maybe the possibilities are infinite? Perhaps it reflects my
            empty soul. But really it's just here to balance this UI grid... /shrug
          </p>
        </div></SkewedFlipCard
      >
    </article>
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
