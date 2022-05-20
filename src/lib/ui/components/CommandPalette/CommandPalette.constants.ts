import socials from '$lib/data/socials.json';

import type { Command, CommandOpen, CommandType } from './CommandPalette.types';

export const COMMANDS: Command[] = [
  {
    type: 'open',
    id: 'open.internal.home',
    href: '/',
    description: 'Home page',
  },
  {
    type: 'open',
    id: 'open.internal.about',
    href: '/about',
    description: 'About page',
  },
  {
    type: 'open',
    id: 'open.internal.gallery',
    href: '/gallery',
    description: 'Gallery page',
  },
  {
    type: 'open',
    id: 'open.internal.blog',
    href: '/blog',
    description: 'Blog page',
  },
  {
    type: 'open',
    id: 'open.internal.resume',
    href: '/QuangPhan_Resume.pdf',
    description: "Quang Phan's resume",
  },
  ...Object.values(socials).map((social) => ({
    type: 'open' as CommandType,
    id: `open.external.social.${social.id}` as CommandOpen['id'],
    href: social.href,
    description: `Quang Phan's ${social.id} profile`,
  })),
];
