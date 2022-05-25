import { AppRoutes } from '$generated/routing';

export const BLOG_ID_DICTIONARY = {
  code: {
    typescriptUtilityTypeFlattenRecord: 'typescript-utility-type-flatten-record',
  },
} as const;

export const BLOG_METADATA = {
  [BLOG_ID_DICTIONARY.code.typescriptUtilityTypeFlattenRecord]: {
    id: BLOG_ID_DICTIONARY.code.typescriptUtilityTypeFlattenRecord,
    title: 'Typescript Utility Type: Flatten a Nested Record',
    description: 'Guide on how to build a recursive type that flattens a nested record',
    publishedAt: '2022-05-25',
    updatedAt: '2022-05-25',
    tags: ['code', 'typescript'],
    href: AppRoutes.blog.code.typescriptUtilityTypeFlattenRecord,
  },
};
