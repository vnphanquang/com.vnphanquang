<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import barChart from 'svelte-awesome/icons/barChart';
  import clockO from 'svelte-awesome/icons/clockO';
  import database from 'svelte-awesome/icons/database';
  import fileTextO from 'svelte-awesome/icons/fileTextO';
  import tableIcon from 'svelte-awesome/icons/table';
  import { fly, slide, fade } from 'svelte/transition';

  import { tooltip } from '$lib/actions/tooltip';
  import type { SearchResultItem } from '$lib/components/SearchBox';
  import { SearchBox } from '$lib/components/SearchBox';
  import {
    webWordFrequencyRecent,
    webWordFrequencyScrape,
    webWordFrequencySearch,
    type WebWordFrequencyScrapeResponse
  } from '$lib/services/api/webwordfrequency';

  import { BarChart } from './_components';

  export const load: Load = async () => {
    const { urls } = await webWordFrequencyRecent();
    return {
      props: {
        recent: urls.map((url, index) => ({ id: index.toString(), text: url })),
      },
    };
  };
</script>

<script lang="ts">
  export let recent: SearchResultItem[] = [];

  let query = '';
  let scrapeResponse: Promise<WebWordFrequencyScrapeResponse>;

  const VIEW_MODES = [
    {
      id: 'table',
      text: 'Table',
      icon: tableIcon,
    },
    {
      id: 'chart',
      text: 'Chart',
      icon: barChart,
    },
  ] as const;
  let viewMode: typeof VIEW_MODES[number]['id'] = 'table';

  const PER_PAGE_OPTIONS = [10, 25, 50, 100] as const;
  let perPage: typeof PER_PAGE_OPTIONS[number] = 10;
  let page = 0;

  const CHART_VIEW_MODES = [
    {
      id: 'all',
      text: 'All',
    },
    {
      id: 'first-30',
      text: 'First 30',
    },
  ];
  let chartViewMode: typeof CHART_VIEW_MODES[number]['id'] = 'first-30';

  async function search(query: string) {
    if (query) {
      const response = await webWordFrequencySearch(query);
      return response.results;
    }
  }

  async function scrape(e: CustomEvent<SearchResultItem | string>) {
    const detail = e.detail;
    let url: string;
    if (typeof detail === 'string') {
      url = detail;
    } else {
      url = detail.text;
    }
    if (scrapeResponse) {
      let previousUrl = ''
      try {
        previousUrl = (await scrapeResponse).url;
      } catch (error) {
      } finally {
        if (previousUrl === url) return;
      }
    }
    query = url;
    scrapeResponse = webWordFrequencyScrape(url);
  }

  function paginate(page: number, maxPage: number, increment: number) {
    if (increment > 0) {
      return Math.min(maxPage, page + increment);
    } else {
      return Math.max(0, page + increment);
    }
  }

  function slice(words: WebWordFrequencyScrapeResponse['words'], offset: number, perPage: number): WebWordFrequencyScrapeResponse['words'] {
    const end = offset + perPage;
    let remainder = 0;
    if (end > words.length) {
      remainder = end - words.length;
    }
    return [...words.slice(offset, end), ...new Array(remainder).fill(['', ''])];
  }
</script>

<svelte:head>
  <title> Web Word Frequency | Experiment | vnphanquang</title>
  <meta name="description" content="Scrape URL and count word occurrence" />
</svelte:head>

<main class="flex flex-col items-center gap-y-20 py-20">
  <section class="flex flex-col gap-y-6 text-center font-quang">
    <h1 class="text-5xl font-bold">Experiment: Web Word Frequency</h1>
    <p class="text-2xl italic">Scrape an URL and count word occurrence</p>
  </section>

  <section class="w-10/12 max-w-2xl md:w-8/12">
    <SearchBox
      id="url"
      bind:query={query}
      placeholder="input an url"
      results={recent}
      on:submit={scrape}
      {search}
    />
  </section>

  {#if !!scrapeResponse}
    {#await scrapeResponse}
      <progress class="c-progress w-56" />
    {:then { words, process_time, from_cached, total, scraped_at }}
      <section class="flex flex-col gap-y-10 w-11/12 max-w-5xl" in:fly={{ y: 30, duration: 250 }}>
        <div class="c-stats shadow-md c-stats-vertical md:c-stats-horizontal">
          <div class="c-stat">
            <div class="c-stat-figure text-primary">
              <Icon data={clockO} scale={2} />
            </div>
            <div class="c-stat-title">Process time</div>
            <div class="c-stat-value text-primary">{Math.round(process_time * 1000)}ms</div>
            <div class="c-stat-desc">Time spent scraping this URL</div>
          </div>

          <div class="c-stat">
            <div class="c-stat-figure text-secondary">
              <Icon data={fileTextO} scale={2} />
            </div>
            <div class="c-stat-title">Words</div>
            <div class="c-stat-value text-secondary">{total}</div>
            <div class="c-stat-desc">Number of words collected</div>
          </div>

          <div
            class="c-stat"
            use:tooltip={{ content: 'Each result is cache for a week.', placement: 'bottom' }}
          >
            <div class="c-stat-figure">
              <Icon data={database} scale={2} />
            </div>
            <div class="c-stat-title">{from_cached ? 'URL already scraped' : 'URL is now cached'}</div>
            <div class="c-stat-value">Cached</div>
            <div class="c-stat-desc">{from_cached ? 'Scraped' : 'Cached'} at {new Date(scraped_at).toLocaleString()}</div>
          </div>
        </div>

        <div class="justify-end hidden md:flex">
          <div class="flex-1 border-b-2 border-border border-opacity-50">
            <h2 class="font-bold">Frequencies</h2>
          </div>
          <div class="c-tabs">
            {#each VIEW_MODES as mode (mode.id)}
              {@const active = mode.id === viewMode}
              <label class="c-tab {active ? 'c-tab-active' : ''} flex gap-x-2" for={`view-${mode.id}`}>
                <span>{mode.text}</span>
                <input type="radio" name="view-mode" id={`view-${mode.id}`} value={mode.id} hidden bind:group={viewMode}>
                <Icon data={mode.icon} scale={1} />
              </label>
            {/each}
          </div>
        </div>

        {#if viewMode === 'table'}
          {@const offset = page * perPage}
          {@const maxPage = Math.ceil(words.length / perPage) - 1}
          <div class="overflow-x-auto shadow-md hover:shadow-lg rounded-lg text-sm" transition:fade={{ duration: 250 }}>
            <div class="py-4 px-6 bg-bg-accent/50">
              <label for="table-per-page" class="flex items-baseline gap-x-2">
                Showing
                <select
                  class="bg-bg rounded-lg pl-2 pt-1"
                  name="table-per-page"
                  id="table-per-page"
                  bind:value={perPage}
                >
                  {#each PER_PAGE_OPTIONS as value}
                    <option {value}>{value}</option>
                  {/each}
                </select>
                entries each page
              </label>

            </div>
            <table class="w-full text-sm text-left">
              <thead class='uppercase bg-bg-accent'>
                <tr>
                  <th class="px-6 py-3">#</th>
                  <th class="px-6 py-3">Word</th>
                  <th class="px-6 py-3">Occurrence</th>
                </tr>
              </thead>
              <tbody transition:slide={{ duration: 250 }}>
                {#each slice(words, offset, perPage) as [word, count], index}
                  <tr class="border-b border-border even:bg-bg-accent odd:bg-bg-accent/50">
                    <th class="px-6 py-3">{offset + index + 1}</th>
                    <td class="px-6 py-3">{word}</td>
                    <td class="px-6 py-3">{count}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
            <div class="py-4 px-6 bg-bg-accent/50 flex justify-between items-end">
              <p>Showing {offset + 1} to {Math.min(offset + perPage, words.length)} of {total} entries</p>
              <div class="table-pagination-btn-group">
                <button
                  class="table-pagination-btn"
                  on:click={() => page = 0}
                  use:tooltip={{ content: 'First page', placement: 'top' }}
                >«‹</button>
                <button
                  class="table-pagination-btn"
                  on:click={() => page = paginate(page, maxPage, -5)}
                  use:tooltip={{ content: 'Back 5 pages', placement: 'top' }}
                >«</button>
                <button
                  class="table-pagination-btn"
                  on:click={() => page = paginate(page, maxPage, -1)}
                  use:tooltip={{ content: 'Previous page', placement: 'top' }}
                >‹</button>
                <p class="table-pagination-btn-label">{page + 1}</p>
                <button
                  class="table-pagination-btn"
                  on:click={() => page = paginate(page, maxPage, 1)}
                  use:tooltip={{ content: 'Next page', placement: 'top' }}
                >›</button>
                <button
                  class="table-pagination-btn"
                  on:click={() => page = paginate(page, maxPage, 5)}
                  use:tooltip={{ content: 'Skip 5 page', placement: 'top' }}
                >»</button>
                <button
                  class="table-pagination-btn"
                  on:click={() => page = maxPage}
                  use:tooltip={{ content: 'Last page', placement: 'top' }}
                >›»</button>
              </div>
            </div>
          </div>
        {:else if viewMode === 'chart'}
          <div class="hidden md:block" transition:fade={{ duration: 250 }}>
            <div class="flex items-center gap-x-4">
              <p class="">View option:</p>
              <div class="c-tabs">
                {#each CHART_VIEW_MODES as mode (mode.id)}
                  {@const active = mode.id === chartViewMode}
                  <label class="c-tab {active ? 'c-tab-active' : ''} flex gap-x-2" for={`view-${mode.id}`}>
                    <span>{mode.text}</span>
                    <input type="radio" name="view-mode" id={`view-${mode.id}`} value={mode.id} hidden bind:group={chartViewMode}>
                  </label>
                {/each}
              </div>
            </div>
            <div class="mt-8 grid place-items-center">
              <BarChart
                data={chartViewMode === 'all' ? words : words.slice(0, 30)}
                labelled={chartViewMode !== 'all'}
              />
            </div>
          </div>
        {:else}
          <!-- should never reach -->
        {/if}

      </section>
    {:catch error}
      <p class="text-red-500" in:fly={{ y: 30, duration: 250 }}>
        {error.message ?? 'URL is not valid or cannot be fetched'}
      </p>
    {/await}
  {/if}

</main>

<style lang="postcss">
  .c-tabs {
    @apply flex flex-wrap items-end;
  }
  .c-tab {
    @apply text-center leading-loose opacity-50 hover:opacity-100;
    @apply relative flex-wrap items-center justify-center;
    @apply px-4 h-8 inline-flex cursor-pointer select-none;
    @apply border-border border-solid border-b-2;

    &.c-tab-active {
      @apply border-fg opacity-100;
    }
    &:focus {
      @apply outline-none;
    }
    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: -3px;
    }
  }

  .table-pagination-btn-group {
    @apply flex rounded-md overflow-hidden bg-bg-accent shadow hover:shadow-md;
  }
  .table-pagination-btn-label {
    @apply grid place-items-center text-sm px-2 font-bold;
    width: 4ch;
  }
  .table-pagination-btn {
    @apply cursor-pointer h-8 w-8 hover:bg-bg active:scale-95 overflow-hidden;
  }
</style>
