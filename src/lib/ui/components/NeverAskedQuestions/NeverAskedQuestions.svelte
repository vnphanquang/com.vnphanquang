<script lang="ts">
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import chevronRight from 'svelte-awesome/icons/chevronRight';
  import { slide } from 'svelte/transition';

  export let data: {
    id: number;
    question: string;
    answer: string[];
  }[];

  const naq = data.map((n) => ({ ...n, checked: false }));

  // TODO: fix @quantiz/common export-import and use slugify to generate slug for naq h3

  let naqOnlyExpandOne = false;
  let expandedId: number | undefined;
  let expansionHistory: number[] = []; // saving index of naq

  function onChangeExpansionRule(event: { target: { checked: boolean } }) {
    if (event.target.checked) {
      let lastOpenedIndex = 0;
      for (const index of expansionHistory.reverse()) {
        if (naq[index].checked) {
          lastOpenedIndex = index;
          break;
        }
      }
      expandedId = naq[lastOpenedIndex].id;
    } else {
      for (const n of naq) {
        n.checked = expandedId === n.id;
      }
    }
  }

  function onClickExpansion(index: number) {
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
    <h2 class="text-3xl font-bold">Never Asked Questions</h2>
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
    />
  </div>

  <div class="grid grid-cols-1 gap-y-2 border-t border-border">
    {#each naq as { id, question, answer, checked }, index (id)}
      {@const shouldExpand = naqOnlyExpandOne ? expandedId === id : checked}
      {@const htmlId = `naq-expansion-${id}`}
      <article class="hover:text-primary">
        <label
          for={htmlId}
          class="block border-b border-border px-4 py-6 hover:cursor-pointer"
          on:click={() => onClickExpansion(index)}
        >
          {#if naqOnlyExpandOne}
            <input
              type="radio"
              id={htmlId}
              name="naq-expansion"
              bind:group={expandedId}
              value={id}
              hidden
            />
          {:else}
            <input type="checkbox" id={htmlId} bind:checked hidden />
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
            <div class="prose max-w-none mx-6 mt-4 border-l border-border px-4 py-2 text-fg" transition:slide>
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
