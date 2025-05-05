/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";

export default interface IPetController {
  findAllPets(request: Request, response: Response, next: NextFunction): Promise<void>;

  findPetById(request: Request, response: Response, next: NextFunction): Promise<void>;

  createPet(request: Request, response: Response, next: NextFunction): Promise<void>;

  updatePet(request: Request, response: Response, next: NextFunction): Promise<void>;

  deletePet(request: Request, response: Response, next: NextFunction): Promise<void>;
}
