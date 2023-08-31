import { ConversationSchema } from "../../schemas/conversation.schema";
import { RequestHandler } from "express";

export default class ConversationMiddleware {
  public validateOrderQuery: RequestHandler = (req, _res, next) => {
    const order = req.query.order as string;

    if (typeof order === 'undefined' || (order !== 'asc' && order !== 'desc')) {
      throw new Error('Invalid or missing order parameter. It must be "asc" or "desc".');
    }

    return next();
  };

  public verifyBody: RequestHandler = (req, _res, next) => {
    const parseResult = ConversationSchema.safeParse(req.body);
    if (!parseResult.success) {
      return next(parseResult.error);
    }
    return next();
  };

  public verifyReqParams: RequestHandler = async (req, _res, next) => {
    const { id } = req.params;
    const digitRegex = /^\d+$/;

    if (!id) throw new Error('Missing id on params!');

    if (!digitRegex.test(id))
      throw new Error('ID params must be a digit');

    return next();
  };
}