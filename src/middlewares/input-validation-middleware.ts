import { RequestHandler} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleware: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array().map(err => ({
      message: err.msg,
      field: err.path
    }));
     res.status(400).send({errorsMessages: errorsArray});
  } else {
    next()
  }
}
