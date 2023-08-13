import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtPayload } from "../../auth/types/jwt-payload.type";

export const CustomerID = createParamDecorator(
  ( _: undefined, context: ExecutionContext ) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const user = req.user as JwtPayload;

    return user.customerId;
  }
);