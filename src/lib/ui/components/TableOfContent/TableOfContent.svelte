<script lang="ts">
  import classnames from 'classnames';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import server from 'svelte-awesome/icons/server';
  import { slide } from 'svelte/transition';

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
</script>

<div
  class={classnames(
    'not-prose flex w-fit flex-col overflow-auto',
    float &&
      "fixed right-4 top-24 z-float max-h-[calc(99vh-theme('spacing.32'))] max-w-[90vw] rounded bg-bg-accent p-3 shadow-lg hover:shadow-xl md:top-40 md:max-w-[50vw]",
    $$props.class,
  )}
>
  {#if float}
    <input type="checkbox" id={ID} hidden bind:checked={open} />
    <label class="sticky top-0 flex w-full cursor-pointer items-start" for={ID}>
      <p class="flex flex-1 items-center justify-end">
        <Icon data={server} scale={1.25} />
      </p>
    </label>
  {/if}
  {#if open || !float}
    <ul class={classnames('list-none', float && 'p-3 md:p-5')} transition:slide={{ duration: 200 }}>
      {#if float}
        <h2 class="mb-4 text-lg font-bold">Table of Contents</h2>
      {/if}
      {#each $tableOfContent as { id, level, text } (id)}
        <li class={getLiClassNames(level)}>
          <a href="#{id}">{text}</a>
        </li>
      {/each}
    </ul>
  {/if}
</div>
