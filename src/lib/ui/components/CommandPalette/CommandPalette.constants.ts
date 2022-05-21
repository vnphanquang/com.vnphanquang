import socials from '$lib/data/socials.json';

import type { Command } from './CommandPalette.types';

export const COMMANDS: Record<Command['id'], Command> = {
  'open.internal.home': {
    type: 'open',
    id: 'open.internal.home',
    href: '/',
    description: 'Home page',
    scopes: ['global'],
  },
  'open.internal.about': {
    type: 'open',
    id: 'open.internal.about',
    href: '/about',
    description: 'About page',
    scopes: ['global'],
  },
  'open.internal.gallery': {
    type: 'open',
    id: 'open.internal.gallery',
    href: '/gallery',
    description: 'Gallery page',
    scopes: ['global'],
  },
  'open.internal.blog': {
    type: 'open',
    id: 'open.internal.blog',
    href: '/blog',
    description: 'Blog page',
    scopes: ['global'],
  },
  'open.internal.resume': {
    type: 'open',
    id: 'open.internal.resume',
    href: '/QuangPhan_Resume.pdf',
    description: 'Quang Phan\'s resume',
    scopes: ['global'],
  },
  'open.external.github': {
    type: 'open',
    id: 'open.external.github',
    href: socials.github.href,
    description: 'Quang Phan\'s github profile',
    scopes: ['global'],
  },
  'open.external.twitter': {
    type: 'open',
    id: 'open.external.twitter',
    href: socials.twitter.href,
    description: 'Quang Phan\'s twitter profile',
    scopes: ['global'],
  },
  'open.external.instagram': {
    type: 'open',
    id: 'open.external.instagram',
    href: socials.instagram.href,
    description: 'Quang Phan\'s instagram profile',
    scopes: ['global'],
  },
  'open.external.linkedin': {
    type: 'open',
    id: 'open.external.linkedin',
    href: socials.linkedin.href,
    description: 'Quang Phan\'s linkedin profile',
    scopes: ['global'],
  },
  'open.external.jsfiddle': {
    type: 'open',
    id: 'open.external.jsfiddle',
    href: socials.jsfiddle.href,
    description: 'Quang Phan\'s jsfiddle profile',
    scopes: ['global'],
  },
  'open.external.stackoverflow': {
    type: 'open',
    id: 'open.external.stackoverflow',
    href: socials.stackoverflow.href,
    description: 'Quang Phan\'s stackoverflow profile',
    scopes: ['global'],
  },
  'open.external.strava': {
    type: 'open',
    id: 'open.external.strava',
    href: socials.strava.href,
    description: 'Quang Phan\'s strava profile',
    scopes: ['global'],
  },
};
