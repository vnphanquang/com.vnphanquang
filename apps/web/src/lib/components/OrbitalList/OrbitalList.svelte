<script lang="ts">
  // inspiration from: https://seamlesshr.com/ & Kevin's https://www.youtube.com/watch?v=vpx8pQaaJ38

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export let items: any[];
  export let radius = 100; // radius in pixel
  export let orbitDuration = 20;
  export let pulsateDuration: [number, number] = [0.8, 1.2];

  function calcShellTranslation(length: number, index: number) {
    const arcD = (2 * Math.PI) / length;
    let shellArc = arcD * index;

    let x = 0;
    let y = 0;
    if (shellArc <= Math.PI / 2) {
      // quarter 1
      x = Math.ceil(Math.sin(shellArc) * radius);
      y = -Math.ceil(Math.cos(shellArc) * radius);
    } else if (shellArc < Math.PI) {
      // quarter 2
      shellArc = Math.PI - shellArc;
      x = Math.ceil(Math.sin(shellArc) * radius);
      y = Math.ceil(Math.cos(shellArc) * radius);
    } else if (shellArc < Math.PI * 1.5) {
      // quarter 3
      shellArc = Math.PI * 1.5 - shellArc;
      x = -Math.ceil(Math.cos(shellArc) * radius);
      y = Math.ceil(Math.sin(shellArc) * radius);
    } else {
      // quarter 4
      shellArc = Math.PI * 2 - shellArc;
      x = -Math.ceil(Math.sin(shellArc) * radius);
      y = -Math.ceil(Math.cos(shellArc) * radius);
    }
    return `translate(${x}px,${y}px)`;
  }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
</script>

<div class="orbit {$$props.class}" style="--orbit-duration: {orbitDuration}s">
  <div class="center">
    <slot name="center" />
  </div>
  <ul class="satellites">
    {#each items as item, i}
      <div class="satellite-shell" style:transform={calcShellTranslation(items.length, i)}>
        <div
          class="satellite"
          style="--pulsate-duration: {randomInRange(...pulsateDuration)}s"
          style:animation-delay="{Math.random() * 4}s"
        >
          <div>
            <slot name="item" {item} />
          </div>
        </div>
      </div>
    {/each}
  </ul>
</div>

<style lang="postcss">
  .orbit {
    --orbit-duration: 20s;
    @apply relative grid aspect-square place-items-center;
  }

  .center {
    @apply grid aspect-square place-items-center;
  }

  .satellites {
    --orbit-play-state: running;
    @apply absolute inset-0 origin-center;
    z-index: 1;
    animation: orbit var(--orbit-duration, 10s) linear infinite;
    animation-play-state: var(--orbit-play-state, running);
  }

  .satellites:hover {
    --orbit-play-state: paused;
  }

  .satellite-shell {
    @apply absolute grid aspect-square place-items-center rounded-full;
  }

  .satellite {
    --pulsate-duration: 1s;
    @apply origin-center;
    animation: pulsate var(--pulsate-duration, 1s) ease-in-out alternate infinite;
  }

  .satellite > * {
    @apply origin-center;
    animation: orbit var(--orbit-duration, 10s) linear reverse infinite;
    animation-play-state: var(--orbit-play-state, running);
  }

  .satellite:hover {
    --orbit-play-state: paused;
    animation-play-state: paused;
  }

  .center {
    z-index: 2;
  }

  @keyframes orbit {
    100% {
      /* rotate: 1turn; */
      transform: rotate(1turn);
    }
  }

  @keyframes pulsate {
    100% {
      transform: scale(1.1);
    }
  }
</style>
