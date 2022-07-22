<script lang="ts">
  import classnames from 'classnames';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import server from 'svelte-awesome/icons/server';
  import { slide } from 'svelte/transition';

  import { inputcache } from '$lib/actions/inputcache';
  import type { TocEventDetails, TocEventItemDetails } from '$lib/actions/toc';
  import { toc } from '$lib/actions/toc';

  export let float = true;

  const ID = 'table-of-content-trigger';

  let open = false;

  const CLOSE_ON_LINK_CLICK_ID = 'close-on-link-click';
  let closeOnLinkClick: boolean;

  function onLinkClick() {
    if (closeOnLinkClick) {
      open = false;
    }
  }

  let items: TocEventItemDetails[];
  function onToc(e: CustomEvent<TocEventDetails>) {
    items = e.detail.items;

    if (!float) {
      const hash = location.hash?.substring(1);
      let matched: HTMLElement | undefined;
      for (const item of items) {
        if (item.id === hash) {
          matched = item.anchor ?? item.element;
        }
      }
      if (matched) {
        matched.click();
      }
    }
  }
</script>

<svelte:body use:toc={{ indicator: false, stimulateHashNavigation: false }} on:toc={onToc} />

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
            use:inputcache={{ id: CLOSE_ON_LINK_CLICK_ID }}
          />
        </div>
        <p class="mb-4 text-lg font-bold">Table of Contents</p>
      {/if}
      {#if items}
        <ul class="toc-ul">
          {#each items as { id, element, text } (id)}
            <li class="toc-li toc-li--{element.tagName.toLowerCase()}">
              <a href="#{id}" on:click={onLinkClick} class="c-link">{text}</a>
            </li>
          {/each}
        </ul>
      {/if}
    </section>
  {/if}
</div>

<style>
  .toc-li.toc-li--h1 {
    font-weight: bold;
  }
  .toc-li.toc-li--h2 {
    margin-left: 1rem;
  }
  .toc-li.toc-li--h3 {
    margin-left: 2.5rem;
  }
  .toc-li.toc-li--h4 {
    margin-left: 4rem;
  }
  .toc-li.toc-li--h5 {
    margin-left: 6rem;
  }
  .toc-li.toc-li--h6 {
    margin-left: 7rem;
  }
</style>
