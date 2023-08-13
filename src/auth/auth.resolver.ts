import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';
import { Public } from '../lib/decorators/public.decorator';
import { Customer } from '../lib/decorators/customer.decorator';
import { UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { Auth } from 'src/lib/entities/auth.entity';
import { CustomerID } from '../lib/decorators/customer-id.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => Auth)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput)
  }

  @Public()
  @Mutation(() => Auth)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput)
  }

  @Mutation(() => Boolean)
  async verifyAccount(
    @CustomerID() customerId: string,
    @Args('activationCode') activationCode: string
  ) {
    return this.authService.verifyAccount(customerId, activationCode)
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => Auth)
  async refreshTokens(
    @CustomerID() customerId: string,
    @Customer('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(customerId, refreshToken)
  }
}