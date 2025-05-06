import * as yup from "yup";
import { CreateShelterDto } from "../../interfaces/types/dto.js";
import { NextFunction, Request, Response } from "express";

const shelterSchema: yup.ObjectSchema<Omit<CreateShelterDto, "address">> =
  yup.object({
    name: yup.string().defined().required(),
    photo: yup.string().defined(),
    email: yup.string().defined().required(),
    phone: yup
      .string()
      .defined()
      .required()
      .matches(
        /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
        "invalid format to phone number",
      ),
    password: yup
      .string()
      .defined()
      .required()
      .min(6)
      .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
        "invalid format to password",
      ),
  });

export const shelterValidationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    shelterSchema.validateSync(request.body, { abortEarly: false });

    next();
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const validationErrors: Record<string, string> = {};

      error.inner.forEach((error) => {
        if (error.path) validationErrors[error.path] = error.message;
      });

      response.status(400).json({ errors: validationErrors });
    }
  }
};
