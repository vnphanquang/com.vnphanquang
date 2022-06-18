import { registerEnumType } from '@nestjs/graphql';
import { Role, AuthProvider } from '@prisma/client';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

registerEnumType(AuthProvider, {
  name: 'AuthProvider',
  description: 'Open authentication (OAuth) provider',
});
