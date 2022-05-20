export type ShortcutModifier = 'alt' | 'ctrl' | 'meta' | 'shift';
export type ShortcutModifierDefinition = ShortcutModifier | ShortcutModifier[];

export interface ShortcutTrigger {
  enabled?: boolean;
  modifier?: ShortcutModifier | ShortcutModifier[] | ShortcutModifier[][];
  key: string;
  callback: (trigger: ShortcutTrigger) => void;
  preventDefault?: boolean;
}

export interface ShortcutParameters {
  enabled?: boolean;
  trigger: Array<ShortcutTrigger> | ShortcutTrigger;
  type?: 'keydown' | 'keyup';
}

export function shortcut(node: HTMLElement, params: ShortcutParameters) {
  let { enabled = true, trigger, type = 'keydown' } = params;

  const handler = (event: KeyboardEvent) => {
    const normalizedTriggers = Array.isArray(trigger) ? trigger : [trigger];
    const modifiedMap: Record<ShortcutModifier, boolean> = {
      alt: event.altKey,
      ctrl: event.ctrlKey,
      shift: event.shiftKey,
      meta: event.metaKey,
    };
    for (const trigger of normalizedTriggers) {
      const {
        modifier = [],
        key,
        callback,
        preventDefault = false,
        enabled: triggerEnabled = true,
      } = trigger;
      if (modifier.length) {
        const modifierDefs = (Array.isArray(modifier) ? modifier : [modifier]).map((def) =>
          typeof def === 'string' ? [def] : def,
        );
        const modified = modifierDefs.every((def) =>
          def.every((modifier) => modifiedMap[modifier]),
        );
        if (!modified) continue;
      }
      if (event.key === key && triggerEnabled) {
        if (preventDefault) event.preventDefault();
        callback(trigger);
      }
    }
  };

  if (enabled) node.addEventListener(type, handler);

  return {
    update: (update: ShortcutParameters) => {
      const { enabled: newEnabled = true, type: newType = 'keydown' } = update;

      if (enabled && (!newEnabled || type !== newType)) {
        node.removeEventListener(type, handler);
      } else if (!enabled && newEnabled) {
        node.addEventListener(newType, handler);
      }

      enabled = newEnabled;
      type = newType;
      trigger = update.trigger;
    },
    destroy: () => {
      node.removeEventListener(type, handler);
    },
  };
}
