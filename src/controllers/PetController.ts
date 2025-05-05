import IPetController from "../interfaces/IPetController.js";

import PetService from "../services/PetService.js";

import { Request, Response } from "express";

export default class PetController implements IPetController {
  private petService: PetService;

  constructor(petService: PetService) {
    this.petService = petService;
  }

  async findAllPets(request: Request, response: Response): Promise<void> {
    try {
      const foundPets = await this.petService.findAllPets();

      response.status(200).json(foundPets);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  }
  async findPetById(request: Request, response: Response): Promise<void> {
    const { petId } = request.params;

    try {
      const foundPets = await this.petService.findPetById(Number(petId));

      response.status(200).json(foundPets);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  }
  async createPet(request: Request, response: Response): Promise<void> {
    const requestBody = request.body;

    const dto = {
      name: requestBody.name,
      photo: requestBody.photo,
      birthDate: requestBody.birthDate,
      specie: requestBody.specie,
      size: requestBody.size,
      isAdopted: requestBody.isAdopted,
    };

    try {
      const createdPet = await this.petService.createPet(dto);

      response
        .status(201)
        .json({ message: "Pet created successfully", data: createdPet });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  }
  async updatePet(request: Request, response: Response): Promise<void> {
    const { petId } = request.params;
    const requestBody = request.body;

    const dto = {
      id: Number(petId),
      name: requestBody.name,
      photo: requestBody.photo,
      birthDate: requestBody.birthDate,
      specie: requestBody.specie,
      size: requestBody.size,
      isAdopted: requestBody.isAdopted,
    };

    try {
      const updatedPet = await this.petService.updatePet(dto);

      response
        .status(201)
        .json({ message: "Pet updated successfully", data: updatedPet });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  }
  async deletePet(request: Request, response: Response): Promise<void> {
    const { petId } = request.params;

    try {
      const deletedPet = await this.petService.deletePet(Number(petId));

      response
        .status(201)
        .json({ message: "Pet deleted successfully", data: deletedPet });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  }
}
