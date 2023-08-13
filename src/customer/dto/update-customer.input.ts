import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateCustomerInput } from "./create-customer.input";
import { IsOptional } from "class-validator";

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly activationCode?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly isVerified?: boolean;

  @IsOptional ()
  @Field(() => String, { nullable: true })
  readonly refreshToken?: string;
}