import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class SignInInput {
  @IsEmail()
  @Field(() => String)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  readonly password: string;
}