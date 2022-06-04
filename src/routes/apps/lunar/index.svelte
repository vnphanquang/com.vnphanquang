<script lang="ts">
  import { convertLunar2Solar } from '$lib/third-party/lunar';

  let month: number;
  let date: number;

  $: solar = convertLunar2Solar(date, month, 2022, 0, 7);
</script>

<p>{solar}</p>

<input
  min="1"
  max="12"
  type="number"
  class="c-input"
  bind:value={month}
/>

<input
  min="1"
  max="12"
  type="number"
  class="c-input"
  bind:value={date}
/>
