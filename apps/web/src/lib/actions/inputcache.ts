export interface InputCacheParameters {
  id: string;
  strategy?: 'local' | 'storage';
}

export function inputcache(node: HTMLInputElement, parameters: InputCacheParameters) {
  let { id, strategy = 'local' } = parameters;
  const type = node.type;
  const name = node.name;
  let value: any;

  function key() {
    return `inputcache#${id}`;
  }

  function handler() {
    switch (type) {
      case 'checkbox':
      case 'radio':
        if (!!node.value && node.value !== 'off' && node.value !== 'on') {
          // if value, cache the group values
          const query = `input[name="${name}"]:checked`;
          value = Array.from(document.querySelectorAll<HTMLInputElement>(query)).map(
            (node) => node.value,
          );
        } else {
          // if no value, cache :checked state
          value = node.checked;
        }
        break;
      default:
        value = node.value;
        break;
    }
    const storage = strategy === 'local' ? localStorage : sessionStorage;
    storage.setItem(key(), JSON.stringify(value));
  }

  setTimeout(() => {
    const storage = strategy === 'local' ? localStorage : sessionStorage;
    const cached = storage.getItem(key());
    if (cached) {
      value = JSON.parse(cached);
      switch (type) {
        case 'checkbox':
        case 'radio':
          const previousChecked = node.checked;
          if (Array.isArray(value)) {
            node.checked = value.includes(node.value);
          } else {
            node.checked = value;
          }
          if (previousChecked !== node.checked) {
            node.dispatchEvent(new Event('change'));
          }
          break;
        default:
          const previousValue = node.value;
          node.value = value;
          if (previousValue !== value) {
            node.dispatchEvent(new Event('input'));
          }
          break;
      }
    }
    node.addEventListener('change', handler);
  }, 0);

  return {
    update(parameters: InputCacheParameters) {
      ({ id, strategy = 'local' } = parameters);
    },
    destroy() {
      node.removeEventListener('check', handler);
    },
  };
}
