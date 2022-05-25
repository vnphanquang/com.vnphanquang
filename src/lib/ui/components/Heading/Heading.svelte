<script lang="ts">
  import { TableOfContentContext } from '../TableOfContent/TableOfContent.context';

  export let id: string;
  export let level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  export let anchored = true;
  export let text: string;

  const context = TableOfContentContext.get();
  if (context) {
    context.register({ id, level, text });
  }

  const classNames = `not-prose ${$$props.class}`;
</script>

{#if anchored}
  <p class="invisible -mt-24 h-24" {id} />
{/if}

{#if level === 1}
  <h1 class={classNames}>
    {#if anchored}
      <a href={`#${id}`}>
        {text}
      </a>
    {:else}
      {text}
    {/if}
  </h1>
{:else if level === 2}
  <h2 class={classNames}>
    {#if anchored}
      <a href={`#${id}`}>
        {text}
      </a>
    {:else}
      {text}
    {/if}
  </h2>
{:else if level === 3}
  <h3 class={classNames}>
    {#if anchored}
      <a href={`#${id}`}>
        {text}
      </a>
    {:else}
      {text}
    {/if}
  </h3>
{:else if level === 4}
  <h4 class={classNames}>
    {#if anchored}
      <a href={`#${id}`}>
        {text}
      </a>
    {:else}
      {text}
    {/if}
  </h4>
{:else if level === 5}
  <h5 class={classNames}>
    {#if anchored}
      <a href={`#${id}`}>
        {text}
      </a>
    {:else}
      {text}
    {/if}
  </h5>
{:else if level === 6}
  <h6 class={classNames}>
    {#if anchored}
      <a href={`#${id}`}>
        {text}
      </a>
    {:else}
      {text}
    {/if}
  </h6>
{/if}
