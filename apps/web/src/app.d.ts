/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="@types/gtag.js" />

// Typescript support in svelte-kit, see
// https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  interface Locals {
    session?: import('./lib/dtos').JwtPayload;
  }
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}

interface ImportMetaEnv {
  VITE_GTAG_MEASUREMENT_ID: string;
}

declare namespace svelte.JSX {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type EventHandler<E = Event, T = HTMLElement> = (event: E & { target: EventTarget & T }) => any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  type CustomEventHandler<T, D = any> = EventHandler<CustomEvent<D>, T>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type HTMLAttrs<T> = {
    [key in keyof EventList as `on${key}`]?: CustomEventHandler<T, EventList[key]>;
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    // on:clickoutside
    onclickoutside?: (event: CustomEvent<MouseEvent>) => void;
    // on:movablestart
    onmovablestart?: (
      event: CustomEvent<import('@svelte-put/movable').MovableEventDetails>,
    ) => void;
    // on:movableend
    onmovableend?: (event: CustomEvent<import('@svelte-put/movable').MovableEventDetails>) => void;
    // on:intersect
    onintersect?: (event: CustomEvent<import('@svelte-put/intersect').IntersectDetail>) => void;
    onintersectonce?: (event: CustomEvent<import('@svelte-put/intersect').IntersectDetail>) => void;
  }
}

declare module '*.svelte';
declare module '@icons-pack/svelte-simple-icons';
