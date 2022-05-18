<script lang="ts">
  import classnames from 'classnames';

  export let id: string;
  export let skew: 'left' | 'right' | 'none' = 'left';

  $: hasBack = $$slots.back;
</script>

<input type="checkbox" id="{id}-toggler" hidden class="toggler" />
<label {id} class="{skew} cursor-pointer" for="{id}-toggler">
  <div class="card {classnames($$props.class, hasBack && 'hasBack')}">
    <div class="front">
      <slot name="front" />
    </div>

    {#if hasBack}
      <div class="back">
        <slot name="back" />
      </div>
    {/if}
  </div>
</label>

<style>
  label {
    @apply relative grid;
    perspective: 40em;
    transform-style: preserve-3d;
  }
  label::before {
    @apply h-full w-full bg-transparent drop-shadow-lg;
    grid-area: 1 / 1;
    content: '';
    margin-top: calc(-1 * 0.5rem);
    margin-left: calc(-1 * 0.5rem);
    pointer-events: none;
    border: 0.5rem solid theme('colors.fg');
    box-sizing: content-box;
  }
  label:hover {
    @apply drop-shadow-2xl;
  }
  .toggler:checked ~ label > .card.hasBack,
  .toggler:hover ~ label > .card.hasBack {
    transform: rotateY(180deg);
  }
  .toggler:checked ~ label > .card:not(.hasBack),
  .toggler:hover ~ label > .card:not(.hasBack) {
    transform: rotateY(0);
  }
  .toggler:checked ~ label::before,
  .toggler:hover ~ label::before {
    transform: none;
  }
  label > .card,
  label::before {
    transition: 0.3s transform cubic-bezier(0.25, 0.46, 0.45, 1);
  }

  label.left::before {
    transform: translateX(-40px) rotateY(-30deg) rotateX(15deg) scale(1.03);
  }
  label.left > .card {
    transform: rotateY(20deg) rotateX(10deg);
  }
  label.right:before {
    transform: translateX(40px) rotateY(30deg) rotateX(15deg) scale(1.03);
  }
  label.right > .card {
    transform: rotateY(-20deg) rotateX(10deg);
  }

  .card {
    @apply relative grid place-items-center bg-yellow/80;
    grid-area: 1/1;
  }
  .card.hasBack {
    transform-style: preserve-3d;
  }

  .front {
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .back {
    @apply absolute inset-0 grid h-full w-full place-items-center bg-yellow/80;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transform: rotateY(180deg);
  }
</style>
