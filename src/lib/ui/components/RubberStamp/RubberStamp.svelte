<script lang="ts">
  export let variant: 'propose' | 'reject' | 'approve' | 'draft' = 'propose';
</script>

<div class="stamp stamp-{variant} {$$props.class}">
  <slot />
</div>

<style>
  .stamp {
    @apply inline-block text-xl font-bold;

    padding: 0.25rem 1rem;
    border-radius: 1rem;

    mask-image: url('/images/grunge.webp');
    mask-size: 944px 604px;
    mix-blend-mode: multiply;
  }

  .stamp-propose {
    color: #555;
    border: 0.25rem solid currentColor;
  }

  .stamp-reject {
    color: #d23;
    border: 0.5rem double currentColor;
    mask-position: 2rem 3rem;
  }

  .stamp-approve {
    color: #0a9928;
    border: 0.5rem solid currentColor;
    mask-position: 13rem 6rem;
    border-radius: 0;
  }

  .stamp-draft {
    color: #c4c4c4;
    border: 1rem double currentColor;
    border-radius: 0;
    padding: 0.5rem;
  }
</style>
