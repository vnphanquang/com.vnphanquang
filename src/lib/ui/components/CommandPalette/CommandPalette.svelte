<script lang="ts">
  import type Fuse from 'fuse.js';
  import debounce from 'lodash.debounce';
  import { createEventDispatcher, onMount } from 'svelte';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import searchIcon from 'svelte-awesome/icons/search';
  import { slide } from 'svelte/transition';

  import { goto } from '$app/navigation';
  import { CommandPaletteCache } from '$lib/ui/services/cache/commandPalette.cache';

  import { COMMANDS } from './CommandPalette.constants';
  import type { CommandType, Command } from './CommandPalette.types';

  const placeholders: Record<CommandType, string> = {
    open: 'site or file',
    run: 'command',
  };

  let fuse: Fuse<Command> | undefined;
  let type: CommandType = 'open';
  let input = '';
  let results: Fuse.FuseResult<Command>[] = [];
  let selectedIndex: number | undefined;
  let hasSearched = false;
  let commandPaletteCacheService: CommandPaletteCache;

  const dispatch = createEventDispatcher<{
    execute: Command;
  }>();

  function capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const search = debounce((query: string) => {
    if (query && fuse) {
      hasSearched = true;
      results = fuse.search({
        $and: [
          { type: `=${type}` },
          {
            $or: [{ id: query }, { description: query }],
          },
        ],
      });
      if (results.length) {
        selectedIndex = 0;
      }
    }
  }, 250);

  $: {
    input = input.trimStart();
    if (input.startsWith('>') && type !== 'run') {
      type = 'run';
      input = input.slice(1);
    }
    search(input);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      if (type === 'run' && input.length === 0) {
        type = 'open';
      }
    } else if (results.length) {
      let increment = 0;
      switch (event.key) {
        case 'ArrowDown':
          increment = 1;
          break;
        case 'ArrowUp':
          increment = -1;
          break;
        default:
          break;
      }
      if (increment) {
        selectedIndex = selectedIndex === undefined ? 0 : selectedIndex + increment;
        if (selectedIndex < 0) {
          selectedIndex = results.length - 1;
        } else if (selectedIndex >= results.length) {
          selectedIndex = 0;
        }
      }
    }
  }
  function onClick(index: number) {
    selectedIndex = index;
    submit();
  }

  function submit() {
    if (selectedIndex !== undefined) {
      const command = results[selectedIndex].item;
      switch (command.type) {
        case 'open':
          if (command.id.startsWith('open.internal')) {
            goto(command.href);
          } else {
            window.open(command.href, '_blank');
          }
          break;
        case 'run':
          break;
        default:
          break;
      }
      dispatch('execute', command);
      commandPaletteCacheService.addRecentCommand(command.id);
    }
  }

  onMount(async () => {
    commandPaletteCacheService = new CommandPaletteCache();
    const recentCommands = commandPaletteCacheService.getRecentCommands();
    results = recentCommands.map((c, index) => ({
      item: COMMANDS[c],
      refIndex: index,
    }));

    const Fuse = (await import('fuse.js')).default;
    const options = {
      keys: ['id', 'type', 'description'],
    };
    fuse = new Fuse(Object.values(COMMANDS), options);
  });
</script>

<form
  class="w-10/12 max-w-2xl rounded bg-bg-highlight shadow-lg focus-within:shadow-xl md:w-8/12 {$$props.class}"
  on:submit|preventDefault={submit}
>
  <label class="flex items-center py-3 px-5 " for="command-palette">
    <p class="grid cursor-pointer grid-cols-[repeat(3,auto)] items-center gap-x-2 text-primary">
      <Icon data={searchIcon} />
      <span>{capitalize(type)}</span>
      {#if type === 'run'}
        <span>></span>
      {/if}
    </p>
    <!-- svelte-ignore a11y-autofocus -->
    <input
      id="command-palette"
      class="ml-2 flex-1 bg-transparent outline-none focus:outline-none"
      type="text"
      autocomplete="off"
      placeholder={placeholders[type]}
      bind:value={input}
      on:keydown={onKeyDown}
      autofocus
    />
  </label>
  {#if results.length}
    <ul
      transition:slide={{ duration: 200 }}
      class="max-h-[50vh] overflow-y-auto border-t border-border py-2"
    >
      {#if !hasSearched}
      <p class="px-5 py-3 text-sm text-fg/50">(Showing recent commands)</p>
      {/if}
      {#each results as { item }, index (item.id)}
        <li>
          <label
            for={item.id}
            class="relative cursor-pointer"
            on:click|preventDefault={() => onClick(index)}
          >
            <input
              hidden
              class="peer"
              type="radio"
              value={index}
              name="command-search-result"
              id={item.id}
              bind:group={selectedIndex}
            />
            <p class="text-ellipsis py-3 px-5 peer-checked:bg-primary">{item.description}</p>
          </label>
        </li>
      {/each}
    </ul>
  {/if}
</form>
