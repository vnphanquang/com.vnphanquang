import { AppConfig } from '$config';
import { AppRoutes } from '$generated/routing';

export const BLOG_ID_DICTIONARY = {
  typescriptUtilityTypeFlattenRecord: 'typescript-utility-type-flatten-record',
} as const;

export const BLOG_METADATA = {
  [BLOG_ID_DICTIONARY.typescriptUtilityTypeFlattenRecord]: {
    id: BLOG_ID_DICTIONARY.typescriptUtilityTypeFlattenRecord,
    title: 'Typescript Utility Type: Flatten a Nested Record',
    screenshot: `${AppConfig.urls.web}/images/screenshots/blog-typescript-flatten-record.png`,
    description: 'Guide on how to build a recursive type that flattens a nested record',
    publishedAt: '2022-05-25',
    updatedAt: '2022-05-25',
    category: 'code',
    tags: ['typescript'],
    href: AppRoutes.blog.typescriptUtilityTypeFlattenRecord,
  },
};
