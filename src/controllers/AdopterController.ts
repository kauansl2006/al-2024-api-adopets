import IAdopterController from "../interfaces/IAdopterController.js";

import AdopterService from "../services/AdopterService.js";

import { Request, Response, NextFunction } from "express";

export default class AdopterController implements IAdopterController {
  private adopterService: AdopterService;

  constructor(adopterService: AdopterService) {
    this.adopterService = adopterService;
  }

  async findAllAdopters(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const foundAdopters = await this.adopterService.findAllAdopters();

      response.status(200).json(foundAdopters);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  async findAdopterById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { adopterId } = request.params;

    try {
      const foundAdopters = await this.adopterService.findAdopterById(
        Number(adopterId),
      );

      response.status(200).json(foundAdopters);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  async createAdopter(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const requestBody = request.body;

    const dto = {
      name: requestBody.name,
      photo: requestBody.photo,
      email: requestBody.email,
      phone: requestBody.phone,
      birthDate: requestBody.birthDate,
      password: requestBody.password,
      address: {
        street: requestBody.address.street,
        neighborhood: requestBody.address.neighborhood,
        city: requestBody.address.city,
        state: requestBody.address.state,
        zipCode: requestBody.address.zipCode,
      },
    };

    try {
      const createdAdopter = await this.adopterService.createAdopter(dto);

      response.status(201).json({
        message: "Adopter created successfully",
        data: createdAdopter,
      });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  async updateAdopter(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { adopterId } = request.params;
    const requestBody = request.body;

    const dto = {
      id: Number(adopterId),
      name: requestBody.name,
      photo: requestBody.photo,
      email: requestBody.email,
      phone: requestBody.phone,
      birthDate: requestBody.birthDate,
    };

    try {
      const updatedAdopter = await this.adopterService.updateAdopter(dto);

      response.status(201).json({
        message: "Adopter updated successfully",
        data: updatedAdopter,
      });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  async deleteAdopter(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { adopterId } = request.params;

    try {
      const deletedAdopter = await this.adopterService.deleteAdopter(
        Number(adopterId),
      );

      response.status(201).json({
        message: "Adopter deleted successfully",
        data: deletedAdopter,
      });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  async findAllPetsAdopted(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { adopterId } = request.params;

    try {
      const foundAdoptedPets = await this.adopterService.findAllPetsAdopted(
        Number(adopterId),
      );

      response.status(200).json(foundAdoptedPets);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  async findPetAdoptedById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { adopterId, petId } = request.params;

    try {
      const foundAdoptedPet = await this.adopterService.findPetAdoptedById(
        Number(adopterId),
        Number(petId),
      );

      response.status(200).json(foundAdoptedPet);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  async adoptPet(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { adopterId, petId } = request.params;

    try {
      const adoptedPet = await this.adopterService.adoptPet(
        Number(adopterId),
        Number(petId),
      );

      response
        .status(200)
        .json({ message: "Pet adopted sucessfully", data: adoptedPet });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
}
