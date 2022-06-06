<script lang="ts">
  /**
   * https://codepen.io/designcouch/pen/ExvwPY
   */

  export let variant: 'one' | 'two' | 'three' | 'four' | 'random' = 'random';
  export let open = false;
  export let id: string;

  const variantToCount = {
    one: 3,
    two: 6,
    three: 4,
    four: 3,
  };

  let [type, count] = getConfig();
  function getConfig() {
    let config: [Exclude<typeof variant, 'random'>, number];
    if (variant !== 'random') {
      config = [variant, variantToCount[variant]];
    } else {
      const array = Object.entries(variantToCount);
      config = array[Math.floor(Math.random() * array.length)] as typeof config;
    }
    return config;
  }
</script>

<input type="checkbox" {id} bind:checked={open} class="ham-checkbox" hidden />
<label class="ham-{type} {$$props.class} select-none" for={id}>
  {#each new Array(count) as _}
    <span />
  {/each}
</label>

<style>
  /* Icon 1 */

  .ham-one,
  .ham-two,
  .ham-three,
  .ham-four {
    @apply relative cursor-pointer;
    width: 1.875em; /* 30px */
    height: 1.40625em; /* 22.5px */
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }

  .ham-one,
  .ham-two,
  .ham-three,
  .ham-four,
  .ham-one span,
  .ham-two span,
  .ham-three span,
  .ham-four span {
    transition-property: transform, opacity, top, left, width;
    transition-duration: 250ms;
    transition-timing-function: ease-in-out;
  }

  .ham-one span,
  .ham-three span,
  .ham-four span {
    @apply absolute left-0 block w-full bg-current opacity-100;
    border-radius: 9px;
    height: 0.28125em; /* 4.5px */
    transform: rotate(0deg);
  }

  .ham-one span:nth-child(1) {
    top: 0px;
  }

  .ham-one span:nth-child(2) {
    top: 0.5625em; /* 9px */
  }

  .ham-one span:nth-child(3) {
    top: 1.125em; /* 18px */
  }

  .ham-checkbox:checked ~ .ham-one span:nth-child(1) {
    top: 0.5625em; /* 9px */
    transform: rotate(135deg);
  }

  .ham-checkbox:checked ~ .ham-one span:nth-child(2) {
    opacity: 0;
    left: -1.875em; /* 30px */
  }

  .ham-checkbox:checked ~ .ham-one span:nth-child(3) {
    top: 0.5625em; /* 9px */
    transform: rotate(-135deg);
  }

  /* Icon 2 */
  .ham-two span {
    @apply absolute block w-1/2 bg-current opacity-100;
    height: 0.28125em; /* 4.5px */
    transform: rotate(0deg);
  }

  .ham-two span:nth-child(even) {
    left: 50%;
    border-radius: 0 9px 9px 0;
  }

  .ham-two span:nth-child(odd) {
    left: 0px;
    border-radius: 9px 0 0 9px;
  }

  .ham-two span:nth-child(1),
  .ham-two span:nth-child(2) {
    top: 0px;
  }

  .ham-two span:nth-child(3),
  .ham-two span:nth-child(4) {
    top: 0.5625em; /* 9px */
  }

  .ham-two span:nth-child(5),
  .ham-two span:nth-child(6) {
    top: 1.125em; /* 18px */
  }

  .ham-checkbox:checked ~ .ham-two span:nth-child(1),
  .ham-checkbox:checked ~ .ham-two span:nth-child(6) {
    transform: rotate(45deg);
  }

  .ham-checkbox:checked ~ .ham-two span:nth-child(2),
  .ham-checkbox:checked ~ .ham-two span:nth-child(5) {
    transform: rotate(-45deg);
  }

  .ham-checkbox:checked ~ .ham-two span:nth-child(1) {
    left: 0.15625em; /* 2.5px */
    top: 0.21875em; /* 3.5px */
  }

  .ham-checkbox:checked ~ .ham-two span:nth-child(2) {
    left: calc(50% - 0.15625em);
    top: 0.21875em; /* 3.5px */
  }

  .ham-checkbox:checked ~ .ham-two span:nth-child(3) {
    left: -50%;
    opacity: 0;
  }

  .ham-checkbox:checked ~ .ham-two span:nth-child(4) {
    left: 100%;
    opacity: 0;
  }

  .ham-checkbox:checked ~ .ham-two span:nth-child(5) {
    left: 0.15625em; /* 2.5px */
    top: 0.90625em; /* 14.5px */
  }

  .ham-checkbox:checked ~ .ham-two span:nth-child(6) {
    left: calc(50% - 0.15625em);
    top: 0.90625em; /* 14.5px */
  }

  /* Icon 3 */
  .ham-three span:nth-child(1) {
    top: 0px;
  }

  .ham-three span:nth-child(2),
  .ham-three span:nth-child(3) {
    top: 0.5625em; /* 9px */
  }

  .ham-three span:nth-child(4) {
    top: 1.125em; /* 18px */
  }

  .ham-checkbox:checked ~ .ham-three span:nth-child(1) {
    top: 0.5625em; /* 9px */
    width: 0%;
    left: 50%;
  }

  .ham-checkbox:checked ~ .ham-three span:nth-child(2) {
    transform: rotate(45deg);
  }

  .ham-checkbox:checked ~ .ham-three span:nth-child(3) {
    transform: rotate(-45deg);
  }

  .ham-checkbox:checked ~ .ham-three span:nth-child(4) {
    top: 0.5625em; /* 9px */
    width: 0%;
    left: 50%;
  }

  /* Icon 4 */
  .ham-four span:nth-child(1) {
    top: 0px;
    transform-origin: left center;
  }

  .ham-four span:nth-child(2) {
    top: 0.5625em; /* 9px */
    transform-origin: left center;
  }

  .ham-four span:nth-child(3) {
    top: 1.125em; /* 18px */
    transform-origin: left center;
  }

  .ham-checkbox:checked ~ .ham-four span:nth-child(1) {
    transform: rotate(45deg);
    top: -0.09375em; /* 1.5px */
    left: 0.25em; /* 4px */
  }

  .ham-checkbox:checked ~ .ham-four span:nth-child(2) {
    width: 0%;
    opacity: 0;
  }

  .ham-checkbox:checked ~ .ham-four span:nth-child(3) {
    transform: rotate(-45deg);
    top: 1.21875em; /* 19.5px */
    left: 0.25em; /* 4px */
  }
</style>
