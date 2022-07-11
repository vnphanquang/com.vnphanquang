<script lang="ts">
  import { clickoutside } from '@svelte-put/clickoutside';
  import debounce from 'lodash.debounce';
  import { createEventDispatcher } from 'svelte';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import searchIcon from 'svelte-awesome/icons/search';
  import { slide } from 'svelte/transition';

  import type { SearchFunction, SearchResultItem, SearchSubmitDetail } from './SearchBox.types';

  export let id: string;
  export let placeholder = 'Search';
  export let autocomplete = 'off';

  /** svelte-awesome icon that will be passed to data attribute */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export let icon: any = searchIcon;

  export let results: SearchResultItem[] = [];
  export let query = '';

  export let debounceMs = 250;
  export let search: SearchFunction = () => {
    /**/
  };

  let searchInputElement: HTMLInputElement;

  let lastQuery = '';
  let hasSearched = false;
  let showResult = false;
  let selectedIndex: undefined | number;

  const dispatch = createEventDispatcher<{
    submit: SearchSubmitDetail;
  }>();

  function onClickOutside() {
    showResult = false;
  }

  function onFocus() {
    showResult = true;
  }
  function onKeyDown(event: KeyboardEvent) {
    if (results.length) {
      let increment = 0;
      switch (event.key) {
        case 'ArrowDown':
          increment = 1;
          break;
        case 'ArrowUp':
          increment = -1;
          break;
        default:
          break;
      }
      if (increment) {
        if (selectedIndex === undefined) {
          selectedIndex = increment === -1 ? results.length - 1 : 0;
        } else {
          selectedIndex += increment;
        }
        if (selectedIndex < 0) {
          selectedIndex = results.length - 1;
        } else if (selectedIndex >= results.length) {
          selectedIndex = 0;
        }
      }
    }
  }
  const onInput = debounce(async (e: Event) => {
    const query = (e.target as HTMLInputElement).value;
    if (query && lastQuery !== query) {
      lastQuery = query;
      const searched = await search(query);
      if (searched) {
        hasSearched = true;
        results = searched.map((item, index) =>
          typeof item === 'string'
            ? {
                id: index.toString(),
                text: item,
              }
            : item,
        );
        selectedIndex = undefined;
      }
    }
  }, debounceMs);

  function onClick(index: number) {
    selectedIndex = index;
    onSubmit();
  }

  function onSubmit() {
    const selected = selectedIndex !== undefined ? results[selectedIndex] : query;
    dispatch('submit', selected);
    searchInputElement?.blur();
    showResult = false;
  }
</script>

<form
  class="
    relative bg-bg-accent shadow-lg focus-within:shadow-xl
    {results.length && showResult ? 'rounded-t-md' : 'rounded-md'}
    {$$props.class}
  "
  on:submit|preventDefault={onSubmit}
  use:clickoutside
  on:clickoutside={onClickOutside}
>
  <label for={id} class="flex items-center py-3 px-5">
    <p class="text-primary">
      <Icon data={icon} scale={1.2} />
    </p>
    <input
      bind:this={searchInputElement}
      {id}
      {autocomplete}
      {placeholder}
      type="text"
      class="ml-4 flex-1 bg-transparent outline-none focus:outline-none"
      bind:value={query}
      on:keydown={onKeyDown}
      on:focus={onFocus}
      on:input={onInput}
    />
  </label>
  {#if results.length && showResult}
    <ul
      transition:slide={{ duration: 200 }}
      class="
        absolute left-0 right-0 top-full z-modal
        max-h-[50vh] overflow-y-auto
        rounded-b-lg border-t border-border bg-bg-accent
        py-2 shadow-lg
        hover:shadow-xl
      "
    >
      <slot name="top" searched={hasSearched} class="py-3 px-5">
        {#if !hasSearched}
          <p class="py-3 px-5 text-sm text-gray-500">(Showing recent URLs)</p>
        {/if}
      </slot>
      {#each results as item, index (item.id)}
        {@const inputId = `${id}-result-${item.id}`}
        {@const inputName = `${id}-result`}
        <li class="hover:bg-primary-hover">
          <label
            for={inputId}
            class="cursor-pointer"
            on:click|preventDefault={() => onClick(index)}
          >
            <input
              hidden
              class="peer"
              type="radio"
              id={inputId}
              name={inputName}
              value={index}
              bind:group={selectedIndex}
            />
            <slot {item}>
              <p class="py-3 px-5 peer-checked:bg-primary">{item.text}</p>
            </slot>
          </label>
        </li>
      {/each}
    </ul>
  {/if}
</form>
