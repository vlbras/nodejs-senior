import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private customerService: CustomerService) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<Array<Role>>('roles', context.getHandler());
    const req = GqlExecutionContext.create(context).getContext().req;

    if (req?.user) {
      const { email } = req.user;
      const user = await this.customerService.findOne({email});

      return roles.includes(user.role);
    }

    return false;
  }
}
