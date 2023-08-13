import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

@InputType()
export class CreateCustomerInput {
  @IsEmail()
  @Field(() => String)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  readonly password: string;
}