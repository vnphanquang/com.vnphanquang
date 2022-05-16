<script lang="ts">
  export let id: string;
  export let skew: 'left' | 'right' | 'none' = 'left';

</script>

<input type="checkbox" id="{id}-toggler" hidden class="toggler">
<label {id} class="{skew} cursor-pointer" for="{id}-toggler">
  <div class="card {$$props.class}">

    <slot name="front"/>

    <div class="back">
      <slot name="back"/>
    </div>

  </div>
</label>

<style>
  label {
    @apply grid relative;
    perspective: 40em;
    transform-style: preserve-3d;
  }
  label::before {
    @apply bg-transparent w-full h-full shadow-lg;
    grid-area: 1 / 1;
    content: '';
    backface-visibility: hidden;
    margin-top: calc(-1 * 0.5rem);
    margin-left: calc(-1 * 0.5rem);
    pointer-events: none;
    border: 0.5rem solid theme('colors.fg');
    box-sizing: content-box;
  }
  label:hover {
    @apply shadow-2xl;
  }
  .toggler:checked ~ label > .card,
  .toggler:hover ~ label > .card {
    transform: rotateY(180deg);
  }
  .toggler:checked ~ label::before,
  .toggler:hover ~ label::before {
    transform: none;
  }
  label > .card,
  label::before {
    will-change: transform;
    transition: .3s transform cubic-bezier(.25,.46,.45,1);
  }

  label.left::before {
    transform: translateX(-40px) rotateY(-30deg) rotateX(15deg) scale(1.03);
  }
  label.left > .card {
    transform: rotateY(25deg) rotateX(10deg);
  }
  label.right:before {
    transform: translateX(40px) rotateY(30deg) rotateX(15deg) scale(1.03);
  }
  label.right > .card {
    transform: rotateY(-25deg) rotateX(10deg);
  }

  .card {
    @apply relative bg-yellow/80 grid place-items-center;
    grid-area: 1/1;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .back {
    @apply bg-yellow/80 absolute inset-0 w-full h-full grid place-items-center;
    backface-visibility: hidden;
    transform: rotateY(180deg);
  }
</style>
