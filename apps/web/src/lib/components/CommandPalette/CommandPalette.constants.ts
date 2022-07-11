import socials from '$lib/data/socials.json';
import { AppRoutes, to } from '$lib/services/navigation';

import { COMMAND_ID_DICTIONARY, type Command } from './CommandPalette.types';

// TODO: add own service to handle search & execution for command palette
export const COMMANDS: Record<Command['id'], Command> = {
  // open
  [COMMAND_ID_DICTIONARY.open.internal.home]: {
    type: 'open',
    id: COMMAND_ID_DICTIONARY.open.internal.home,
    href: () => to(AppRoutes.index),
    description: 'Open Home page',
    scopes: ['global'],
    cacheable: true,
  },
  [COMMAND_ID_DICTIONARY.open.internal.about]: {
    type: 'open',
    id: COMMAND_ID_DICTIONARY.open.internal.about,
    href: () => to(AppRoutes.about.index),
    description: 'Open About page',
    scopes: ['global'],
    cacheable: true,
  },
  [COMMAND_ID_DICTIONARY.open.internal.blog]: {
    type: 'open',
    id: COMMAND_ID_DICTIONARY.open.internal.blog,
    href: () => to(AppRoutes.blog.index),
    description: 'Open Blog page',
    scopes: ['global'],
    cacheable: true,
  },
  [COMMAND_ID_DICTIONARY.open.internal.resume]: {
    type: 'open',
    id: COMMAND_ID_DICTIONARY.open.internal.resume,
    href: () => '/QuangPhan_Resume.pdf',
    description: "Open Quang Phan's resume",
    scopes: ['global'],
    cacheable: true,
  },
  [COMMAND_ID_DICTIONARY.open.internal.experiment.webWordFrequency]: {
    type: 'open',
    id: COMMAND_ID_DICTIONARY.open.internal.experiment.webWordFrequency,
    href: () => to(AppRoutes.experiment.webWordFrequency.index),
    description: 'Open Web Word Frequency experiment application',
    scopes: ['global'],
    cacheable: true,
  },
  [COMMAND_ID_DICTIONARY.open.external.github]: {
    type: 'open',
    id: COMMAND_ID_DICTIONARY.open.external.github,
    href: () => socials.github.href,
    description: "Open Quang Phan's github profile",
    scopes: ['global'],
    cacheable: true,
  },
  [COMMAND_ID_DICTIONARY.open.external.twitter]: {
    type: 'open',
    id: COMMAND_ID_DICTIONARY.open.external.twitter,
    href: () => socials.twitter.href,
    description: "Open Quang Phan's twitter profile",
    scopes: ['global'],
    cacheable: true,
  },
  [COMMAND_ID_DICTIONARY.open.external.instagram]: {
    type: 'open',
    id: COMMAND_ID_DICTIONARY.open.external.instagram,
    href: () => socials.instagram.href,
    description: "Open Quang Phan's instagram profile",
    scopes: ['global'],
    cacheable: true,
  },
  [COMMAND_ID_DICTIONARY.open.external.linkedin]: {
    type: 'open',
    id: COMMAND_ID_DICTIONARY.open.external.linkedin,
    href: () => socials.linkedin.href,
    description: "Open Quang Phan's linkedin profile",
    scopes: ['global'],
    cacheable: true,
  },
  [COMMAND_ID_DICTIONARY.open.external.jsfiddle]: {
    type: 'open',
    id: COMMAND_ID_DICTIONARY.open.external.jsfiddle,
    href: () => socials.jsfiddle.href,
    description: "Open Quang Phan's jsfiddle profile",
    scopes: ['global'],
    cacheable: true,
  },
  [COMMAND_ID_DICTIONARY.open.external.stackoverflow]: {
    type: 'open',
    id: COMMAND_ID_DICTIONARY.open.external.stackoverflow,
    href: () => socials.stackoverflow.href,
    description: "Open Quang Phan's stackoverflow profile",
    scopes: ['global'],
    cacheable: true,
  },
  [COMMAND_ID_DICTIONARY.open.external.strava]: {
    type: 'open',
    id: COMMAND_ID_DICTIONARY.open.external.strava,
    href: () => socials.strava.href,
    description: "Open Quang Phan's strava profile",
    scopes: ['global'],
    cacheable: true,
  },

  // secret
  [COMMAND_ID_DICTIONARY.open.internal.exOcculto.solanumLycopersicum]: {
    type: 'open',
    id: COMMAND_ID_DICTIONARY.open.internal.exOcculto.solanumLycopersicum,
    href: () => to(AppRoutes.exOcculto.solanumLycopersicum),
    description: 'For one with a heart of a tomato...',
    scopes: ['global', 'secret'],
    secret: 'amica>solanum',
    cacheable: true,
  },
  [COMMAND_ID_DICTIONARY.open.internal.exOcculto.chrysanthemumMaximum]: {
    type: 'open',
    id: COMMAND_ID_DICTIONARY.open.internal.exOcculto.solanumLycopersicum,
    href: () => to(AppRoutes.exOcculto.chrysanthemumMaximum),
    description: 'Chrysanthemum flos imple cor meum in astris...',
    scopes: ['global', 'secret'],
    secret: 'chrysanthemum socius',
    cacheable: true,
  },

  // run
  [COMMAND_ID_DICTIONARY.run.theme.toggle]: {
    type: 'run',
    id: COMMAND_ID_DICTIONARY.run.theme.toggle,
    description: 'Toggle light bulb',
    scopes: ['global'],
    cacheable: true,
  },
};
