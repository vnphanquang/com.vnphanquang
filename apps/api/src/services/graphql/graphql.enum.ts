import { registerEnumType } from '@nestjs/graphql';
import { Role, AuthProvider, Locale, PostCategory, PostTag } from '@prisma/client';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

registerEnumType(AuthProvider, {
  name: 'AuthProvider',
  description: 'Open authentication (OAuth) provider',
});

registerEnumType(Locale, {
  name: 'Locale',
  description: 'Locale',
});

registerEnumType(PostCategory, {
  name: 'PostCategory',
  description: 'Post category',
});

registerEnumType(PostTag, {
  name: 'PostTag',
  description: 'Post tag',
});
