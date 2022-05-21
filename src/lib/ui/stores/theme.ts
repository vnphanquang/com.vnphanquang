import { writable } from 'svelte/store';

function createTheme() {
  const { subscribe, update } = writable<'light' | 'bulb'>('light');
  return {
    subscribe,
    toggle: () => update((theme) => (theme === 'light' ? 'bulb' : 'light')),
  };
}

export const theme = createTheme();
