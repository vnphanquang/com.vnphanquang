import { slugify } from '$lib/utils/slugify';

import type { TocParameters, ResolvedTocParameters, TocEventItemDetails } from './toc.types';

const DEFAULT_PARAMETERS: TocParameters = {
  selector: ':where(h1, h2, h3, h4, h5, h6)',
  ignoreSelector: ['.toc-exclude'],
  indicator: '#',
  anchored: 96,
  insertedParagraphClass: 'toc-p',
  insertedAnchorClass: 'toc-anchor',
  itemClass: 'toc-element',
  injectedStyleId: 'toc-style',
  stimulateHashNavigation: true,
};

export function resolveParameters(parameters: Partial<TocParameters> = {}): ResolvedTocParameters {
  const mergedParameters = {
    ...DEFAULT_PARAMETERS,
    ...parameters,
  };

  let { ignoreSelector } = mergedParameters;
  const { anchored, indicator } = mergedParameters;

  if (typeof ignoreSelector === 'string') {
    ignoreSelector = [ignoreSelector];
  }

  return {
    ...mergedParameters,
    anchored: typeof anchored === 'boolean' ? (anchored ? DEFAULT_PARAMETERS.anchored as number : -1) : anchored,
    indicator: typeof indicator === 'boolean' ? (indicator ? DEFAULT_PARAMETERS.indicator as string : '') : indicator,
    selector: `${mergedParameters.selector}${ignoreSelector.map((i) => `:not(${i})`).join()}`,
  };
}

export function addStyle(id: string, styleString: string) {
  const style = document.createElement('style');
  style.id = id;
  style.textContent = styleString;
  document.head.append(style);
}

export function removeStyle(id: string) {
  document.getElementById(id)?.remove();
}

export function transformTocItems(elements: HTMLElement[], parameters: ResolvedTocParameters) {
  const { injectedStyleId, insertedAnchorClass, anchored, indicator, insertedParagraphClass, itemClass } = parameters;

  const items: TocEventItemDetails[] = [];

  if (indicator && !document.getElementById(injectedStyleId)) {
    addStyle(
      injectedStyleId,
      `.${insertedAnchorClass}:hover::before {
        content: '${indicator}';
        position: absolute;
        right: 101%;
      }`,
    );
  }

  for (const element of elements) {
    let id = element.id;
    if (id) {
      element.setAttribute('data-original-id', element.id);
    }
    if (!element.id) {
      if (!element.textContent) {
        console.error('Element must have either text content or id attribute');
      }
      element.id = id = slugify(element.textContent || '');
    }

    let anchor: HTMLAnchorElement | undefined;
    let p: HTMLParagraphElement | undefined;
    if (anchored !== -1) {
      // wrap content in anchor tag
      anchor = document.createElement('a');
      anchor.style.position = 'relative';
      anchor.className = insertedAnchorClass;
      anchor.href = `#${id}`;
      anchor.innerHTML = element.innerHTML;
      element.innerHTML = '';
      element.appendChild(anchor);

      // set element position to 'relative'
      element.className = `${itemClass} ${element.className}`;
      const position = getComputedStyle(element).getPropertyValue('position');
      if (position === 'static') {
        (element as HTMLHeadingElement).style.position = 'relative';
      }

      // add a hidden paragraph for scroll padding
      if (anchored !== 0) {
        p = document.createElement('p');
        p.className = insertedParagraphClass;
        p.style.bottom = '100%';
        p.style.position = 'absolute';
        p.style.visibility = 'hidden';
        p.style.marginTop = `-${anchored}px`;
        p.style.height = `${anchored}px`;
        p.id = id;
        element.removeAttribute('id');
        element.appendChild(p);
      }
    }

    items.push({
      element: element as HTMLElement,
      id,
      text: element.textContent ?? '',
      anchor,
      p,
    });
  }

  return items;
}

export function restoreTocItems(elements: HTMLElement[], parameters: ResolvedTocParameters) {
  const { insertedAnchorClass, insertedParagraphClass, itemClass, injectedStyleId } = parameters;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    const paragraph = element.querySelector(`.${insertedParagraphClass}`);
    paragraph?.remove();

    const anchor = element.querySelector(`.${insertedAnchorClass}`);
    if (anchor) {
      const innerHTML = anchor.innerHTML;
      anchor.remove();
      element.innerHTML = innerHTML;
    }

    const className = element.className;
    className.replace(itemClass, '');
    element.className = className;
    element.id = element.getAttribute('data-original-id') || '';
  }

  removeStyle(injectedStyleId);
}
