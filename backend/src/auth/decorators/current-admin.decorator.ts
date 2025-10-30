import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AdminUser } from '../interfaces';

export const CurrentAdmin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AdminUser => {
    const request = ctx.switchToHttp().getRequest<{ user: AdminUser }>();
    return request.user;
  },
);
