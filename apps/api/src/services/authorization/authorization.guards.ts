import { CanActivate, ExecutionContext, Injectable, mixin } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '@prisma/client';

import { PrismaService } from '$services/prisma';

import { ROLES_KEY } from './authorization.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const user = GqlExecutionContext.create(context).getContext().req.user;
    return requiredRoles.some((role) => user.role === role);
  }
}

export interface ResourceOwnerGuardParams {
  arg: string;
  resource: 'user' | 'comment';
  adminByPass: boolean;
}

const resourceOwnerGuardDefaultParams: ResourceOwnerGuardParams = {
  arg: 'id',
  resource: 'user',
  adminByPass: true,
};

export function ResourceOwnerGuard(
  params: Partial<ResourceOwnerGuardParams> = resourceOwnerGuardDefaultParams,
) {
  const { arg, resource, adminByPass } = {
    ...resourceOwnerGuardDefaultParams,
    ...params,
  };
  @Injectable()
  class ResourceOwner implements CanActivate {
    constructor(private readonly prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = GqlExecutionContext.create(context);
      const { id: userId, role } = ctx.getContext().req.user;

      if (adminByPass && role === Role.admin) return true;

      const resourceId = ctx.getArgs()[arg];
      switch (resource) {
        case 'comment': {
          const comment = await this.prisma.comment.findUnique({ where: { id: resourceId } });
          return comment.authorId == userId;
        }
        case 'user':
        default:
          return userId == resourceId;
      }
    }
  }

  return mixin(ResourceOwner) as any;
}
