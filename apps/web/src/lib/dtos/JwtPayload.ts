export interface JwtPayload {
  id: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  email: string;
  createdAt: string;
  updatedAt: null | string;
  deletedAt: null | string;
  sub: number;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
