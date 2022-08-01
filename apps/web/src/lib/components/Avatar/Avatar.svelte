<script lang="ts">
  import Avatar from '@svelte-put/avatar/Avatar.svelte';
  export let user: {
    avatarUrl: string;
    email: string;
    firstName: string;
    lastName?: string;
  };

  export let size = 32;
</script>

<!-- TODO: for svelte-put:
  - export `alt` for default slot
  - calculate size from props for definitive default image
-->

<Avatar
  src={user.avatarUrl}
  gravatar={{
    email: user.email,
    size: size,
  }}
  uiAvatar={{
    name: `${user.firstName}${user.lastName ? `+${user.lastName}` : ''}`,
    background: '333333',
    color: 'FFFFFF',
    size: size,
  }}
>
  <svelte:fragment let:src>
    <img
      class="rounded-full {$$props.class}"
      {src}
      alt={user.firstName + (user.lastName ? ` ${user.lastName}` : '')}
      loading="lazy"
      width="{size}"
      height="{size}"
    >
  </svelte:fragment>
</Avatar>
