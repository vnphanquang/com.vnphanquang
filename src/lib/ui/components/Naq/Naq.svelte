<script lang="ts">
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import chevronRight from 'svelte-awesome/icons/chevronRight';
  import { slide } from 'svelte/transition';

  export let data: {
    id: number;
    question: string;
    answer: string;
  }[];

  const naq = data.map((n) => ({ ...n, checked: false }));

  // TODO: fix @quantiz/common export-import and use slugify to generate slug for naq h3

  let naqOnlyExpandOne = false;
  let expandedId: number | undefined;
  function onChangeExpansionRule(event: any) {
    if (event.target.checked) {
      for (const n of naq) {
        if (n.checked) {
          expandedId = n.id;
          break;
        }
      }
    } else {
      for (const n of naq) {
        n.checked = expandedId === n.id;
      }
    }
  }
</script>

<section id="naq" class="my-20">
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
    {#each naq as { id, question, answer, checked } (id)}
      {@const shouldExpand = naqOnlyExpandOne ? expandedId === id : checked}
      <article class="hover:text-primary">
        <label
          for="naq-expansion-{id}"
          class="block border-b border-border px-4 py-6 hover:cursor-pointer"
        >
          {#if naqOnlyExpandOne}
            <input
              type="radio"
              id="naq-expansion-{id}"
              name="naq-expansion"
              bind:group={expandedId}
              value={id}
              hidden
            />
          {:else}
            <input type="checkbox" id="naq-expansion-{id}" bind:checked hidden />
          {/if}
          <div class="flex items-center justify-between">
            <h3 class="font-bold" id="naq-{id}">{question}</h3>
            <Icon
              data={chevronRight}
              scale={1.25}
              class="{shouldExpand ? '-rotate-90' : 'rotate-90'} transition-transform"
            />
          </div>
          {#if shouldExpand}
            <p class="mx-6 mt-4 border-l border-border px-4 py-2 text-fg" transition:slide>{answer}</p>
          {/if}
        </label>
      </article>
    {/each}
  </div>
</section>
