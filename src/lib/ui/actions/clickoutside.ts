/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export interface ClickOutsideParameters {
  enabled: boolean;
  inside?: HTMLElement;
  ignore: HTMLElement[];
}

/** Dispatch event on click outside of node */
export function clickoutside(
  node: HTMLElement,
  parameters: Partial<ClickOutsideParameters> = { enabled: true, ignore: [] },
) {
  let inside = parameters.inside;
  let enabled = parameters.enabled ?? true;
  let ignore = parameters.ignore ?? [];
  const handleClick = (event: Event) => {
    if (
      node &&
      !node.contains(event.target as Node) &&
      !event.defaultPrevented &&
      (!inside || inside.contains(event.target as Node)) &&
      (!ignore || ignore.every((element) => element !== event.target))
    ) {
      node.dispatchEvent(new CustomEvent('clickoutside', { detail: node }));
    }
  };

  if (parameters.enabled !== false) {
    document.addEventListener('mousedown', handleClick, true);
  }

  return {
    update(update: ClickOutsideParameters) {
      if (!enabled && update.enabled) {
        document.addEventListener('mousedown', handleClick, true);
      } else if (enabled && !update.enabled) {
        document.removeEventListener('mousedown', handleClick, true);
      }
      inside = update.inside;
      enabled = update.enabled ?? true;
      ignore = parameters.ignore ?? [];
    },
    destroy() {
      document.removeEventListener('mousedown', handleClick, true);
    },
  };
}
