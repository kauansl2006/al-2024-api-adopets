import { HttpStatusEnum } from "../interfaces/enums/HttpStatusEnum.js";

export class ErrorHandler extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequest extends ErrorHandler {
  constructor(message: string) {
    super(message, HttpStatusEnum.BAD_REQUEST);
  }
}

export class NotFound extends ErrorHandler {
  constructor(message: string) {
    super(message, HttpStatusEnum.NOT_FOUND);
  }
}
