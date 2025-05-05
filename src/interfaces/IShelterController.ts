/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";

export default interface IShelterController {
  findAllShelters(request: Request, response: Response, next: NextFunction): Promise<void>;

  findShelterById(request: Request, response: Response, next: NextFunction): Promise<void>;

  createShelter(request: Request, response: Response, next: NextFunction): Promise<void>;

  updateShelter(request: Request, response: Response, next: NextFunction): Promise<void>;

  deleteShelter(request: Request, response: Response, next: NextFunction): Promise<void>;

  findAllPetsSheltered(request: Request, response: Response, next: NextFunction): Promise<void>;

  findPetShelteredById(request: Request, response: Response, next: NextFunction): Promise<void>;

  shelterPet(request: Request, response: Response, next: NextFunction): Promise<void>;
}
