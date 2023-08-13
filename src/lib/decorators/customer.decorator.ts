import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtPayloadWithRefreshToken } from "src/auth/types/jwt-payload.type";

export const Customer = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext,
  ) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (data) return req.user[data];

    return req.user;
  }
);