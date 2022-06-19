import { User } from '@prisma/client';

export interface JwtPayload extends User {
  sub: User['id'];
}
