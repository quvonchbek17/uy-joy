import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Request } from 'express';
  import { REQUERED_ROLES } from "@common";
import { AuthService } from '../auth.service';


declare module 'express' {
  interface Request {
    user: {
      id: string,
      role: string
    };
  }
}
  @Injectable()
  export class HasRole implements CanActivate {
    constructor(
        private reflector: Reflector
        ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const roles = this.reflector.getAllAndOverride<string[]>(REQUERED_ROLES, [
        context.getHandler(),
        context.getClass(),
      ]);

      let user = request["user"]
      const hasRole = roles.find((role) => role === user.role);

      if (!hasRole) {
        throw new ForbiddenException('Ruxsatga ega emassiz.');
      }

      return true;
    }
  }
