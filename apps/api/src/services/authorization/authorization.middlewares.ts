import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { Role } from '@prisma/client';

export const authenticated: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
  let value = await next();
  const authenticated = !!ctx.context.req?.user;
  if (!authenticated) {
    value = null;
  }
  return value;
};

export const roles: (...roles: Role[]) => FieldMiddleware = (..._roles) => {
  const middleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
    let value = await next();
    const role = ctx.context.req?.user?.role;
    if (!_roles.includes(role)) {
      value = null;
    }
    return value;
  };

  return middleware;
};
