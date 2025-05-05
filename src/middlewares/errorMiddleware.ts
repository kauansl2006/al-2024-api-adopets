import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { HttpStatusEnum } from "../interfaces/enums/HttpStatusEnum.js";

export const errorMiddleware = (
  error: ErrorHandler,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode ?? HttpStatusEnum.INTERNAL_SERVER_ERROR;
  const message = error.statusCode ? error.message : "Internal Server Error";

  response.status(statusCode).json({ message });

  next();
};
