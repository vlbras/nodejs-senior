import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetCustomerInput, GetCustomerInputIdEmail } from './dto/customer.input';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { hash } from 'argon2';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}
  async findAll(params: GetCustomerInput) {
    const { skip, take, cursor, where } = params;

    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
    });
  }

  async findOne(where: GetCustomerInputIdEmail) {
    const customer = await this.prisma.customer.findUnique({
      where,
    });

    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    return customer;
  }

  async create(createCustomerInput: CreateCustomerInput) {
    try {
      const customer = await this.prisma.customer.create({
        data: createCustomerInput,
      });
      return customer;
    }

    catch (error) {
      throw new BadRequestException('Customer with this email already exists');
    }
  }

  async update(where: GetCustomerInputIdEmail, updateCustomerInput: UpdateCustomerInput) {
    await this.findOne(where);

    if (updateCustomerInput.password) {
      const hashedPassword = await hash(updateCustomerInput.password)

      updateCustomerInput = {
        ...updateCustomerInput,
        password: hashedPassword,
      };
    }

    try {
      const customer = await this.prisma.customer.update({
        where,
        data: updateCustomerInput,
      });
      return customer;
    }

    catch (error) {
      throw new BadRequestException('Customer with this email already exists');
    }
  }

  async delete(where: GetCustomerInputIdEmail) {
    await this.findOne(where);

    return this.prisma.customer.delete({
      where,
    });
  }
}
