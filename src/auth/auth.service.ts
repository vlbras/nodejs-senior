import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from 'src/customer/customer.service';
import { hash, verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpInput: SignUpInput) {
    const { email, password } = signUpInput;
    const hashedPassword = await hash(password);

    const { id: customerId } = await this.customerService.create({
      email,
      password: hashedPassword,
    });

    const { accessToken, refreshToken} = await this.generateTokens(customerId, email);

    return { accessToken, refreshToken }
  }

  async signIn(signInInput: SignInInput) {
    const { email, password } = signInInput;
    const customer = await this.customerService.findOne({ email });
    const isPasswordValid = await verify(customer.password, password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const { accessToken, refreshToken} = await this.generateTokens(customer.id, email);

    return { accessToken, refreshToken }
  }

  async refreshTokens(customerId: string, token: string) {
    const { email, refreshToken: hashedRefreshToken } = await this.customerService.findOne({ id: customerId });
    const isRefreshTokenValid = await verify(hashedRefreshToken, token);

    if (!isRefreshTokenValid) {
      throw new ForbiddenException('Invalid refresh token');
    }

    const { accessToken, refreshToken } = await this.generateTokens(customerId, email);

    return { accessToken, refreshToken }
  }

  private async generateTokens(customerId: string, email: string) {
    const payload = { customerId, email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_TTL,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_TOKEN_TTL,
      }),
    ]);

    const hashedRefreshToken = await hash(refreshToken);
    await this.customerService.update({ id: customerId }, { refreshToken: hashedRefreshToken });

    return { accessToken, refreshToken }
  }
}