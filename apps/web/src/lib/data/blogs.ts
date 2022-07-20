import { AppConfig } from '$config';

export const BLOG_ID_DICTIONARY = {
  typescriptUtilityTypeFlattenRecord: 1,
} as const;

export const BLOG_METADATA = {
  [BLOG_ID_DICTIONARY.typescriptUtilityTypeFlattenRecord]: {
    id: BLOG_ID_DICTIONARY.typescriptUtilityTypeFlattenRecord,
    screenshot: `${AppConfig.urls.web}/images/screenshots/blog-typescript-flatten-record.png`,
  },
};
