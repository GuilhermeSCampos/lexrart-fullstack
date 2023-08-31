import { UserSchema } from "@/schemas/user.schema";
import { RequestHandler } from "express";

export default class AuthMiddleware {
  public verifyUserBody: RequestHandler = (req, res, next) => {
    const parseResult = UserSchema.safeParse(req.body);
    if (!parseResult.success) {
      return next(parseResult.error);
    }
    return next();
  };
}