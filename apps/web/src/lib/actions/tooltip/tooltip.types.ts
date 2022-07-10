/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Options } from '@popperjs/core';
import type { SvelteComponent } from 'svelte';

export type ActionTooltipParameters<ComponentProp extends Record<string, any> = {}> = {
  content: string;
  html: string;
  component: typeof SvelteComponent;
  placement: Options['placement'];
  enabled: boolean;
  props: ComponentProp;
};
