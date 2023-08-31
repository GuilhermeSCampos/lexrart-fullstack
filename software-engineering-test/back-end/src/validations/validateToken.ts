import JWT from "../JWT";
import { RequestHandler } from "express";


export const validateToken: RequestHandler = async (req, _res, next) => {
  const jwt = new JWT();

  await jwt.validate(req.headers.authorization as string);

  return next();
};