<script lang="ts">
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import chevronRight from 'svelte-awesome/icons/chevronRight';
  import { slide } from 'svelte/transition';

  import { inputcache } from '$lib/actions/inputcache';

  export let data: {
    id: number;
    question: string;
    answer: string[];
  }[];

  const naq = data.map((n) => ({ ...n, checked: false }));

  // TODO: fix @quantiz/common export-import and use slugify to generate slug for naq h3

  let naqOnlyExpandOne: boolean;
  let expandedId: number | undefined;
  let expansionHistory: number[] = []; // saving index of naq

  function onChangeExpansionRule(event: { target: { checked: boolean } }) {
    if (naqOnlyExpandOne === false && event.target.checked) {
      let lastOpenedIndex = 0;
      for (const index of expansionHistory.reverse()) {
        if (naq[index].checked) {
          lastOpenedIndex = index;
          break;
        }
      }
      expandedId = naq[lastOpenedIndex].id;
    } else if (naqOnlyExpandOne && event.target.checked === false) {
      for (const n of naq) {
        n.checked = expandedId === n.id;
      }
    }
  }

  function onExpansionsChanged(index: number) {
    if (expansionHistory[expansionHistory.length - 1] !== index) {
      expansionHistory.push(index);
    }
    if (expansionHistory.length > 10) {
      expansionHistory.shift();
    }
  }
</script>

<div class={$$props.class}>
  <div class="text-center">
    <h2 class="text-2xl font-bold md:text-3xl">Never Asked Questions</h2>
    <p class="mt-4 italic">You might even find some answers</p>
  </div>

  <div class="mt-10 mb-2 flex items-end justify-end">
    <label for="naq-expansion-toggle" class="mr-4 cursor-pointer text-sm">
      View one at a time
    </label>
    <input
      id="naq-expansion-toggle"
      type="checkbox"
      class="c-toggle-primary"
      on:change={onChangeExpansionRule}
      bind:checked={naqOnlyExpandOne}
      use:inputcache={{ id: 'naq-expansion-toggle' }}
    />
  </div>

  <div class="grid grid-cols-1 gap-y-2 border-t border-border">
    {#each naq as { id, question, answer, checked }, index (id)}
      {@const shouldExpand = naqOnlyExpandOne ? expandedId === id : checked}
      {@const htmlId = `naq-expansion-${id}`}
      {@const name = 'naq-expansion'}
      <article class="hover:text-primary">
        <label
          for={htmlId}
          class="block border-b border-border px-4 py-6 hover:cursor-pointer"
        >
          {#if naqOnlyExpandOne}
            <input
              type="radio"
              id={htmlId}
              {name}
              on:change={() => onExpansionsChanged(index)}
              bind:group={expandedId}
              value={id}
              hidden
            />
          {:else}
            <input
              type="checkbox"
              id={htmlId}
              {name}
              on:change={() => onExpansionsChanged(index)}
              bind:checked
              value={id}
              hidden
            />
          {/if}
          <div class="flex items-center justify-between">
            <h3 class="pr-4 font-bold sm:pr-10" id="naq-{id}">{question}</h3>
            <div>
              <Icon
                data={chevronRight}
                scale={1.25}
                class="{shouldExpand ? '-rotate-90' : 'rotate-90'} transition-transform"
              />
            </div>
          </div>
          {#if shouldExpand}
            <div
              class="prose mx-6 mt-4 max-w-none border-l border-border px-4 py-2 text-fg"
              transition:slide
            >
              {#each answer as paragraph}
                <p>{paragraph}</p>
              {/each}
            </div>
          {/if}
        </label>
      </article>
    {/each}
  </div>
</div>
