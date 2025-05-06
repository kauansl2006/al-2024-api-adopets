import { NextFunction, Request, Response } from "express";
import AuthService from "../services/AuthService.js";

export default class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async createAuth(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const requestBody = request.body;

    const dto = {
      email: requestBody.email,
      password: requestBody.password,
    };

    try {
      const accessToken = await this.authService.createAuth(dto);

      response
        .status(201)
        .json({ message: "authentication successful", token: accessToken });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
}
