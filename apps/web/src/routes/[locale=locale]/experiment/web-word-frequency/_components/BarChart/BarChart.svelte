<script lang="ts">
  import { scaleBand, scaleLinear } from 'd3-scale';

  import { tooltip } from '$lib/actions/tooltip';

  export let data: Array<[string, number]> = [];
  export let labelled = true;
  export let width = 800;
  export let height = 600;

  const margin = { top: 10, right: 10, bottom: 20, left: 100 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  $: xDomain = data.map(([x,]) => x);
  $: yDomain = data.map(([,y]) => y);

  $: yScale = scaleBand().domain(xDomain).range([0, innerHeight]).padding(0.1);
  $: xScale = scaleLinear().domain([0, Math.max.apply(null, yDomain)]).range([0, innerWidth]);

</script>


<svg {width} {height} class="text-base-content fill-current {$$props.class}">
  <g transform={`translate(${margin.left},${margin.top})`}>
    {#each xScale.ticks() as tickValue}
      <g transform={`translate(${xScale(tickValue)},0)`}>
        <line y2={innerHeight} stroke="black" />
        <text text-anchor="middle" dy=".7em" y={innerHeight + 3}>
          {tickValue}
        </text>
      </g>
    {/each}
    {#each data as [x, y]}
      {#if labelled}
        <text
          text-anchor="end"
          x="-3"
          dy="1ch"
          y={yScale(x) ?? 0 + yScale.bandwidth() / 2}
          class="text-2xs"
        >
          {x}
        </text>
      {/if}
      <rect
        use:tooltip={{ content: x }}
        x="0"
        y={yScale(x)}
        width={xScale(y)}
        height={yScale.bandwidth()}
      />
    {/each}
  </g>
</svg>
