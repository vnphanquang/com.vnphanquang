<script lang="ts">
  import { intersect } from '@svelte-put/intersect';
  import { slide } from 'svelte/transition';

  import { MediaOverlay } from '$lib/components';
  import { milestones } from '$lib/data/milestones';
  import { AppRoutes, to } from '$lib/services/navigation';
  
  import { AppConfig } from '$config';

  let SHOW_DETAILS_TOGGLER_ID = 'timeline-details-toggler';
  let showDetails = true;

  const milestonesIntersectedMap: Record<number, boolean> = milestones.reduce((acc, curr) => {
    acc[curr.id] = false;
    return acc;
  }, {} as Record<number, boolean>);
  const intersectedMap = {
    header: false,
    timelineHeading: false,
    next: false,
    previous: false,
    signature: false,
  };

  function onIntersect(id: number): void {
    milestonesIntersectedMap[id] = true;
  }
</script>

<svelte:head>
  <title>About | vnphanquang</title>
  <meta name="description" content="Quang Phan's truncated timeline" />

  <meta property="og:title" content="About vnphanquang" />
  <meta property="og:image" content="{AppConfig.urls.web}/images/screenshots/about.png" />
  <meta property="og:url" content="{AppConfig.urls.web}{to(AppRoutes.about.index)}" />
  <meta name="twitter:card" content="summary_large_image" />

  <meta property="og:type" content="profile" />
  <meta property="profile:first_name" content="Quang" />
  <meta property="profile:last_name" content="Phan" />
  <meta property="profile:gender" content="male" />
  <meta property="profile:username" content="vnphanquang" />
</svelte:head>

<main class="grid place-items-center gap-y-14 py-20">
  <section
    class="
        grid place-items-center gap-y-6 px-4 text-center
        {intersectedMap.header ? 'animate-fade-in-up' : 'opacity-0'}
      "
    use:intersect={{ threshold: 0.3, enabled: !intersectedMap.header }}
    on:intersectonce={() => (intersectedMap.header = true)}
  >
    <h1 class="font-quang text-5xl font-bold">Quang Phan</h1>
    <h2 class="font-quang text-2xl italic">Learner, Developer, Jack of Zero Trade</h2>
    <img
      src="/images/vnphanquang/sketch_portrait.svg"
      alt="portrait"
      width="100"
      height="153"
      class="bg-bg"
      loading="lazy"
    />
    <button id="resume-download" type="button" class="c-btn-outline py-1 px-2 text-xs uppercase">
      <a href="/QuangPhan_Resume.pdf" target="_blank"> Download PDF resume </a>
    </button>
    <p class="text-primary">~ • ~</p>
  </section>
  <section class="relative w-full max-w-6xl px-4 md:px-10 xl:px-0">
    <h2
      class="
        text-center font-quang text-3xl font-bold
        {intersectedMap.timelineHeading ? 'animate-fade-in-up' : 'opacity-0'}
      "
      use:intersect={{ threshold: 0.3, enabled: !intersectedMap.timelineHeading }}
      on:intersectonce={() => (intersectedMap.timelineHeading = true)}
    >
      A Truncated Timeline
    </h2>
    <div
      class="
        mt-6 flex w-full max-w-4xl items-center justify-end gap-x-4
        {intersectedMap.timelineHeading ? 'animate-fade-in-up' : 'opacity-0'}
      "
      use:intersect={{ threshold: 0.3, enabled: !intersectedMap.timelineHeading }}
      on:intersectonce={() => (intersectedMap.timelineHeading = true)}
    >
      <label for={SHOW_DETAILS_TOGGLER_ID}> Show details </label>
      <input
        type="checkbox"
        name={SHOW_DETAILS_TOGGLER_ID}
        id={SHOW_DETAILS_TOGGLER_ID}
        bind:checked={showDetails}
        class="c-toggle-primary"
      />
    </div>
    <ul class="mt-10 flex flex-col items-center">
      <li
        class="
          mb-4 self-start text-sm italic md:self-auto
          {intersectedMap.next ? 'animate-fade-in-up' : 'opacity-0'}
        "
        use:intersect={{ threshold: 0.3, enabled: !intersectedMap.next }}
        on:intersectonce={() => (intersectedMap.next = true)}
      >
        next journey awaits ...
      </li>
      {#each milestones as milestone, index (milestone.id)}
        <p class="invisible -mt-24 h-24" id={milestone.slug} />
        <li
          class="
            mt-1 grid w-full grid-cols-[45px,1fr] justify-center gap-x-4 md:grid-cols-[1fr,auto,1fr] md:gap-x-8
            {showDetails ? '' : 'mb-4'}
            {milestonesIntersectedMap[milestone.id] ? 'animate-fade-in-up' : 'opacity-0'}
          "
          use:intersect={{ threshold: 0.2, enabled: !milestonesIntersectedMap[milestone.id] }}
          on:intersectonce={() => onIntersect(milestone.id)}
        >
          <div
            class="mt-1 hidden
            flex-col text-sm
            text-[#7c6f64] md:flex
            {index % 2 === 1
              ? 'md:col-start-3 md:row-start-1 md:justify-self-start md:text-left'
              : 'md:justify-self-end md:text-right'}
          "
          >
            <p class="font-semibold">{milestone.time}</p>
            <p class="mt-4 italic">{milestone.location}</p>
          </div>
          <div class="mt-1 flex flex-col items-center md:col-start-2">
            <div class="h-4 w-4 rounded-full border-2 border-primary bg-primary" />
            <div class="mt-2 w-[3px] flex-1 rounded-t bg-border" />
          </div>
          <div
            class="
            grid grid-cols-1 gap-y-4
            {milestone.timemark ? 'pb-4' : 'pb-10'}
            {index % 2 === 1
              ? 'md:col-start-1 md:row-start-1 md:justify-items-end md:text-right'
              : 'md:justify-items-start md:text-left'}"
          >
            <p class="text-sm md:hidden">
              {milestone.time} - <span class="mt-4 italic">{milestone.location}</span>
            </p>
            {#if milestone.headline}
              <h3 class="text-lg font-semibold">
                {@html milestone.headline}
              </h3>
            {/if}
            {#if milestone.title}
              <h4 class="text-sm italic">
                {@html milestone.title}
              </h4>
            {/if}
            {#if showDetails}
              <div class="grid grid-cols-1 gap-y-4" transition:slide>
                {#each milestone.paragraphs as paragraph}
                  <p class="text-sm">
                    {@html paragraph}
                  </p>
                {/each}
                <ul class="flex max-w-full items-end gap-x-2 overflow-x-auto md:justify-end">
                  {#each milestone.images as { id, src, alt, width } (id)}
                    <li class="">
                      <MediaOverlay {id} let:open>
                        <img
                          {src}
                          {alt}
                          {width}
                          class="h-auto rounded shadow hover:shadow-lg"
                          loading="lazy"
                        />
                        <img {src} {alt} class="w-max rounded shadow" slot="overlay" />
                      </MediaOverlay>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
          {#if milestone.timemark}
            <div class="relative pt-8 pb-20 md:col-[1/4] md:row-start-2">
              <div class="absolute top-0 left-1/2 h-[3px] w-4 -translate-x-1/2 rounded bg-border" />
              <div
                class="absolute bottom-12 left-1/2 h-[3px] w-4 -translate-x-1/2 rounded bg-border"
              />
              <div
                class="absolute bottom-0 left-1/2 h-12 w-[3px] -translate-x-1/2 rounded-b bg-border"
              />
              <p class="text-center font-semibold md:text-2xl">{milestone.timemark}</p>
            </div>
          {/if}
        </li>
      {/each}
      <li
        class="
          mt-2 self-start text-sm italic md:self-auto
          {intersectedMap.previous ? 'animate-fade-in-up' : 'opacity-0'}
        "
        use:intersect={{ threshold: 0.3, enabled: !intersectedMap.previous }}
        on:intersectonce={() => (intersectedMap.previous = true)}
      >
        ... previous adventures echoed
      </li>
    </ul>
  </section>
  <section
    class=" text-center {intersectedMap.signature ? 'animate-fade-in-up' : 'opacity-0'}"
    use:intersect={{ threshold: 0.3, enabled: !intersectedMap.signature }}
    on:intersectonce={() => (intersectedMap.signature = true)}
  >
    <p class="mb-8 text-primary">~ • ~</p>
    <img
      src="/images/vnphanquang/signature.svg"
      alt="signature"
      width="200"
      height="52"
      loading="lazy"
    />
  </section>
</main>
