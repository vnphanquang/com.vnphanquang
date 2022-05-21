import { AppRoutes } from '$generated/routing';
import socials from '$lib/data/socials.json';

import type { Command } from './CommandPalette.types';

// TODO: extract id into own map
// { open: internal: { ... }, external: { ... }, run: { ... } }

// TODO: add own service to handle search & execution for command palette
export const COMMANDS: Record<Command['id'], Command> = {
  // open
  'open.internal.home': {
    type: 'open',
    id: 'open.internal.home',
    href: AppRoutes.index,
    description: 'Open Home page',
    scopes: ['global'],
    cacheable: true,
  },
  'open.internal.about': {
    type: 'open',
    id: 'open.internal.about',
    href: AppRoutes.about.index,
    description: 'Open About page',
    scopes: ['global'],
    cacheable: true,
  },
  'open.internal.gallery': {
    type: 'open',
    id: 'open.internal.gallery',
    href: AppRoutes.gallery.index,
    description: 'Open Gallery page',
    scopes: ['global'],
    cacheable: true,
  },
  'open.internal.blog': {
    type: 'open',
    id: 'open.internal.blog',
    href: AppRoutes.blog.index,
    description: 'Open Blog page',
    scopes: ['global'],
    cacheable: true,
  },
  'open.internal.resume': {
    type: 'open',
    id: 'open.internal.resume',
    href: '/QuangPhan_Resume.pdf',
    description: "Open Quang Phan's resume",
    scopes: ['global'],
    cacheable: true,
  },
  'open.external.github': {
    type: 'open',
    id: 'open.external.github',
    href: socials.github.href,
    description: "Open Quang Phan's github profile",
    scopes: ['global'],
    cacheable: true,
  },
  'open.external.twitter': {
    type: 'open',
    id: 'open.external.twitter',
    href: socials.twitter.href,
    description: "Open Quang Phan's twitter profile",
    scopes: ['global'],
    cacheable: true,
  },
  'open.external.instagram': {
    type: 'open',
    id: 'open.external.instagram',
    href: socials.instagram.href,
    description: "Open Quang Phan's instagram profile",
    scopes: ['global'],
    cacheable: true,
  },
  'open.external.linkedin': {
    type: 'open',
    id: 'open.external.linkedin',
    href: socials.linkedin.href,
    description: "Open Quang Phan's linkedin profile",
    scopes: ['global'],
    cacheable: true,
  },
  'open.external.jsfiddle': {
    type: 'open',
    id: 'open.external.jsfiddle',
    href: socials.jsfiddle.href,
    description: "Open Quang Phan's jsfiddle profile",
    scopes: ['global'],
    cacheable: true,
  },
  'open.external.stackoverflow': {
    type: 'open',
    id: 'open.external.stackoverflow',
    href: socials.stackoverflow.href,
    description: "Open Quang Phan's stackoverflow profile",
    scopes: ['global'],
    cacheable: true,
  },
  'open.external.strava': {
    type: 'open',
    id: 'open.external.strava',
    href: socials.strava.href,
    description: "Open Quang Phan's strava profile",
    scopes: ['global'],
    cacheable: true,
  },

  // secret
  'open.internal.exOcculto.solanumLycopersicum': {
    type: 'open',
    id: 'open.internal.exOcculto.solanumLycopersicum',
    href: AppRoutes.exOcculto.solanumLycopersicum,
    description: 'Welcome, sir. Press enter to open!',
    scopes: ['global', 'secret'],
    secret: 'amica>solanum',
    cacheable: true,
  },

  // run
  'theme.toggle': {
    type: 'run',
    id: 'theme.toggle',
    description: 'Toggle light bulb',
    scopes: ['global'],
    cacheable: true,
  },
};
