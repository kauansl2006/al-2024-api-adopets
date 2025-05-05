import IShelterController from "../interfaces/IShelterController.js";
import ShelterService from "../services/ShelterService.js";

import { Request, Response } from "express";

export default class ShelterController implements IShelterController {
  private shelterService: ShelterService;

  constructor(shelterService: ShelterService) {
    this.shelterService = shelterService;
  }

  async findAllShelters(request: Request, response: Response): Promise<void> {
    try {
      const foundShelters = await this.shelterService.findAllShelters();

      response.status(200).json(foundShelters);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  }
  async findShelterById(request: Request, response: Response): Promise<void> {
    const { shelterId } = request.params;

    try {
      const foundShelters = await this.shelterService.findShelterById(
        Number(shelterId),
      );

      response.status(200).json(foundShelters);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  }
  async createShelter(request: Request, response: Response): Promise<void> {
    const requestBody = request.body;

    const dto = {
      name: requestBody.name,
      photo: requestBody.photo,
      email: requestBody.email,
      phone: requestBody.phone,
      saltPassword: requestBody.saltPassword,
      hashPassword: requestBody.hashPassword,
      address: {
        street: requestBody.address.street,
        neighborhood: requestBody.address.neighborhood,
        city: requestBody.address.city,
        state: requestBody.address.state,
        zipCode: requestBody.address.zipCode,
      },
    };

    try {
      const createdShelter = await this.shelterService.createShelter(dto);

      response.status(201).json({
        message: "Shelter created successfully",
        data: createdShelter,
      });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  }
  async updateShelter(request: Request, response: Response): Promise<void> {
    const { shelterId } = request.params;
    const requestBody = request.body;

    const dto = {
      id: Number(shelterId),
      name: requestBody.name,
      photo: requestBody.photo,
      email: requestBody.email,
      phone: requestBody.phone,
    };

    try {
      const updatedShelter = await this.shelterService.updateShelter(dto);

      response.status(201).json({
        message: "Shelter updated successfully",
        data: updatedShelter,
      });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  }
  async deleteShelter(request: Request, response: Response): Promise<void> {
    const { shelterId } = request.params;

    try {
      const deletedShelter = await this.shelterService.deleteShelter(
        Number(shelterId),
      );

      response.status(201).json({
        message: "Shelter deleted successfully",
        data: deletedShelter,
      });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  }
  async findAllPetsSheltered(
    request: Request,
    response: Response,
  ): Promise<void> {
    const { shelterId } = request.params;

    try {
      const foundShelteredPets = await this.shelterService.findAllPetsSheltered(
        Number(shelterId),
      );

      response.status(200).json(foundShelteredPets);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  }
  async findPetShelteredById(
    request: Request,
    response: Response,
  ): Promise<void> {
    const { shelterId, petId } = request.params;

    try {
      const foundShelteredPet = await this.shelterService.findPetShelteredById(
        Number(shelterId),
        Number(petId),
      );

      response.status(200).json(foundShelteredPet);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  }
  async shelterPet(request: Request, response: Response): Promise<void> {
    const { shelterId, petId } = request.params;

    try {
      const shelteredPet = await this.shelterService.shelterPet(
        Number(shelterId),
        Number(petId),
      );

      response
        .status(200)
        .json({ message: "Pet sheltered sucessfully", data: shelteredPet });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  }
}
