import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/exception";
import { APP_ERROR_MESSAGE } from "../constants/constant";

export default function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status ? error.status : 500;
  const message =
    status === 500 ? APP_ERROR_MESSAGE.serverError : error.message;
  const errors = error.error;
  console.log("errorMiddleware", status, message, errors);
  res.status(status).send({ status, message, error: errors });
}
