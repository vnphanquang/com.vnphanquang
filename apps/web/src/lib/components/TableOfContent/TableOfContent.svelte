<script lang="ts">
  import classnames from 'classnames';
  import { onMount } from 'svelte';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import server from 'svelte-awesome/icons/server';
  import { slide } from 'svelte/transition';

  import { TableOfContentsSettingsCache } from '$lib/cache/tableOfContentsSettings.cache';
  import { TableOfContentContext } from './TableOfContent.context';

  export let float = true;

  const ID = 'table-of-content-trigger';

  const tableOfContent = TableOfContentContext.get();

  function getLiClassNames(level: 1 | 2 | 3 | 4 | 5 | 6) {
    return classnames(
      'not-prose c-link',
      level === 1 && 'font-bold',
      level === 2 && 'ml-4',
      level === 3 && 'ml-10',
      level === 4 && 'ml-16',
      level === 5 && 'ml-14',
      level === 6 && 'ml-28',
    );
  }

  let open = false;

  const CLOSE_ON_LINK_CLICK_ID = 'close-on-link-click';
  let tableOfContentsSettingsCache: TableOfContentsSettingsCache;
  let closeOnLinkClick: boolean;

  $: closeOnLinkClick !== undefined && tableOfContentsSettingsCache.setCloseOnLinkClick(closeOnLinkClick);

  function onLinkClick() {
    if (closeOnLinkClick) {
      open = false;
    }
  }

  onMount(() => {
    tableOfContentsSettingsCache = new TableOfContentsSettingsCache();
    closeOnLinkClick = tableOfContentsSettingsCache.getCloseOnLinkClick();
  });
</script>

<div
  class={classnames(
    'not-prose flex w-fit flex-col overflow-auto',
    float &&
      "fixed right-4 top-24 z-float max-h-[calc(99vh-theme('spacing.36'))] max-w-[90vw] rounded bg-bg-accent shadow-lg hover:shadow-xl md:top-32 md:max-w-[50vw]",
    $$props.class,
  )}
>
  {#if float}
    <input type="checkbox" id={ID} hidden bind:checked={open} />
    <label class="sticky top-0 flex w-full cursor-pointer items-start p-3" for={ID}>
      <p class="flex flex-1 items-center justify-end">
        <Icon data={server} scale={1.25} />
      </p>
    </label>
  {/if}
  {#if open || !float}
    <section class={classnames(float && 'p-3 md:p-5')} transition:slide={{ duration: 200 }}>
      {#if float}
        <div class="mb-4 flex items-center justify-end gap-x-2">
          <label for={CLOSE_ON_LINK_CLICK_ID}> Close on click </label>
          <input
            type="checkbox"
            name={CLOSE_ON_LINK_CLICK_ID}
            id={CLOSE_ON_LINK_CLICK_ID}
            bind:checked={closeOnLinkClick}
            class="c-toggle-primary"
          />
        </div>
        <h2 class="mb-4 text-lg font-bold">Table of Contents</h2>
      {/if}
      <ul class="list-none">
        {#each $tableOfContent as { id, level, text } (id)}
          <li class={getLiClassNames(level)}>
            <a href="#{id}" on:click={onLinkClick}>{text}</a>
          </li>
        {/each}
      </ul>
    </section>
  {/if}
</div>
