/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { createPopper } from '@popperjs/core';
import type { Instance as PopperInstance } from '@popperjs/core';
import type { SvelteComponent } from 'svelte';

import TooltipComponent from './Tooltip.component.svelte';
import type { ActionTooltipParameters } from './tooltip.types';

const defaultParameters: ActionTooltipParameters = {
  content: '',
  html: '',
  component: TooltipComponent,
  placement: 'auto',
  enabled: true,
  props: {},
};

export function tooltip(node: HTMLElement | SVGElement, parameters: Partial<ActionTooltipParameters>) {
  parameters = {
    ...defaultParameters,
    ...parameters,
  };
  let popper: PopperInstance;
  let tooltip: HTMLElement;
  let instance: SvelteComponent;

  function updateOptions(params: Partial<ActionTooltipParameters>) {
    // cache any necessary option
    const oldParams = parameters;

    // do update
    parameters = {
      ...defaultParameters,
      ...params
    };

    if (!oldParams.enabled && parameters.enabled) {
      node.addEventListener('mouseenter', mouseEnter);
      node.addEventListener('mouseleave', mouseLeave);
    }
    if (oldParams.enabled && !parameters.enabled) {
      mouseLeave();
      node.removeEventListener('mouseenter', mouseEnter);
      node.removeEventListener('mouseleave', mouseLeave);
    }
  }

  function mouseEnter() {
    const { component, content, html, placement, props } = parameters;
    instance = new component!({
      target: document.body,
      props: { content, html, ...props },
    });

    tooltip = document.getElementById('tooltip')!;
    tooltip.setAttribute('data-show', '');

    // https://popper.js.org/
    popper = createPopper(node, tooltip, {
      placement,
      modifiers: [
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['top', 'right'],
            padding: 8,
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 12],
          },
        },
      ],
    });
  }

  function mouseLeave() {
    if (tooltip) {
      tooltip.removeAttribute('data-show');
    }
    if (popper) {
      popper.destroy();
    }
    if (instance) {
      instance.$destroy();
    }
  }

  if (parameters.enabled) {
    node.addEventListener('mouseenter', mouseEnter);
    node.addEventListener('mouseleave', mouseLeave);
  }

  return {
    destroy() {
      mouseLeave();
      node.removeEventListener('mouseenter', mouseEnter);
      node.removeEventListener('mouseleave', mouseLeave);
    },
    update(params: Partial<ActionTooltipParameters>) {
      updateOptions(params);
    },
  };
}
