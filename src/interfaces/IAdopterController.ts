/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";

export default interface IAdopterController {
  findAllAdopters(request: Request, response: Response, next: NextFunction): Promise<void>;

  findAdopterById(request: Request, response: Response, next: NextFunction): Promise<void>;

  createAdopter(request: Request, response: Response, next: NextFunction): Promise<void>;

  updateAdopter(request: Request, response: Response, next: NextFunction): Promise<void>;

  deleteAdopter(request: Request, response: Response, next: NextFunction): Promise<void>;

  findAllPetsAdopted(request: Request, response: Response, next: NextFunction): Promise<void>;

  findPetAdoptedById(request: Request, response: Response, next: NextFunction): Promise<void>;

  adoptPet(request: Request, response: Response, next: NextFunction): Promise<void>;
}
