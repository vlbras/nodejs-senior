import { Module, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from 'src/customer/customer.service';
import { PrismaService } from 'src/prisma.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    CustomerService,
    JwtService,
    PrismaService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
