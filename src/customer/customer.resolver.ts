import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'lib/entities/customer.entity';
import { CustomerService } from './customer.service';
import { GetCustomerInput, GetCustomerInputIdEmail } from './dto/customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/lib/guards/roles.guard';
import { Roles } from 'src/lib/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  async customers(@Args('data') { skip, take, where }: GetCustomerInput) {
    return this.customerService.findAll({ skip, take, where });
  }

  @Query(() => Customer)
  async customer(@Args('data') param : GetCustomerInputIdEmail) {
    return this.customerService.findOne(param);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => Customer)
  async updateCustomer(@Args('data') param: GetCustomerInputIdEmail, @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput) {
    return this.customerService.update(param, updateCustomerInput);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => Customer)
  async deleteCustomer(@Args('data') param: GetCustomerInputIdEmail) {
    return this.customerService.delete(param);
  }
}
