import PetEntity from "../dataSource/entities/PetEntity.js";
import PetRepository from "../dataSource/repositories/PetRepository.js";
import IPetService from "../interfaces/IPetService.js";
import { CreatePetDto, UpdatePetDto } from "../interfaces/types/dto.js";
import { NotFound } from "../utils/ErrorHandler.js";

export default class PetService implements IPetService {
  private petRepository: PetRepository;

  constructor(petRepository: PetRepository) {
    this.petRepository = petRepository;
  }

  async findAllPets(): Promise<PetEntity[]> {
    try {
      const foundPets = await this.petRepository.findAllPets();

      if (foundPets.length === 0) throw new NotFound("Pets not found");

      return foundPets;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async findPetById(petId: number): Promise<PetEntity> {
    try {
      const foundPet = await this.petRepository.findPetById(petId);

      if (!foundPet) throw new NotFound("Pet not found");

      return foundPet;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async createPet(dto: CreatePetDto): Promise<PetEntity> {
    try {
      const createdPet = await this.petRepository.createPet(dto);

      if (!createdPet) throw new Error("Pet not created");

      return createdPet;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async updatePet(dto: UpdatePetDto): Promise<PetEntity> {
    try {
      const isUpdated = await this.petRepository.updatePet(dto);

      if (isUpdated === false) throw new NotFound("Pet not found to update");

      const foundPet = await this.petRepository.findPetById(dto.id);

      if (!foundPet) throw new NotFound("Pet not found after update");

      return foundPet;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async deletePet(petId: number): Promise<PetEntity> {
    try {
      const foundPet = await this.petRepository.findPetById(petId);

      if (!foundPet) throw new NotFound("Pet not found before delete");

      const isDelete = await this.petRepository.deletePet(petId);

      if (isDelete === false) throw new Error("Pet not deleted");

      return foundPet;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
}
