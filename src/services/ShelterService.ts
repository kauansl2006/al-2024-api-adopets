import PetEntity from "../dataSource/entities/PetEntity.js";
import ShelterEntity from "../dataSource/entities/ShelterEntity.js";
import ShelterRepository from "../dataSource/repositories/ShelterRepository.js";
import IShelterService from "../interfaces/IShelterService.js";
import { CreateShelterDto, UpdateShelterDto } from "../interfaces/types/dto.js";
import { NotFound } from "../utils/ErrorHandler.js";

export default class ShelterService implements IShelterService {
  private shelterRepository: ShelterRepository;

  constructor(shelterRepository: ShelterRepository) {
    this.shelterRepository = shelterRepository;
  }

  async findAllShelters(): Promise<ShelterEntity[]> {
    try {
      const foundShelters = await this.shelterRepository.findAllShelters();

      if (foundShelters.length === 0) throw new NotFound("Shelters not found");

      return foundShelters;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async findShelterById(shelterId: number): Promise<ShelterEntity> {
    try {
      const foundShelter =
        await this.shelterRepository.findShelterById(shelterId);

      if (!foundShelter) throw new NotFound("Shelter not found");

      return foundShelter;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async createShelter(dto: CreateShelterDto): Promise<ShelterEntity> {
    try {
      const createdShelter = await this.shelterRepository.createShelter(dto);

      if (!createdShelter) throw new Error("Shelter not created");

      return createdShelter;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async updateShelter(dto: UpdateShelterDto): Promise<ShelterEntity> {
    try {
      const isUpdated = await this.shelterRepository.updateShelter(dto);

      if (isUpdated === false) throw new Error("Shelter not update");

      const foundShelter = await this.shelterRepository.findShelterById(dto.id);

      if (!foundShelter) throw new NotFound("Shelter not found after update");

      return foundShelter;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async deleteShelter(shelterId: number): Promise<ShelterEntity> {
    try {
      const foundShelter =
        await this.shelterRepository.findShelterById(shelterId);

      if (!foundShelter) throw new NotFound("Shelter not found before delete");

      const isDelete = await this.shelterRepository.deleteShelter(shelterId);

      if (isDelete === false) throw new Error("Shelter not deleted");

      return foundShelter;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async findAllPetsSheltered(shelterId: number): Promise<PetEntity[]> {
    try {
      const foundShelter =
        await this.shelterRepository.findShelterById(shelterId);

      if (!foundShelter) throw new NotFound("Shelter not found to find pets");

      const foundShelteredPets =
        await this.shelterRepository.findAllPetsSheltered(shelterId);

      if (foundShelteredPets.length === 0)
        throw new NotFound("Sheltered pets not found");

      return foundShelteredPets;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async findPetShelteredById(
    shelterId: number,
    petId: number,
  ): Promise<PetEntity> {
    try {
      const foundShelter =
        await this.shelterRepository.findShelterById(shelterId);

      if (!foundShelter) throw new NotFound("Shelter not found to find pet");

      const foundShelteredPet =
        await this.shelterRepository.findPetShelteredById(shelterId, petId);

      if (!foundShelteredPet) throw new NotFound("Sheltered pet not found");

      return foundShelteredPet;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async shelterPet(shelterId: number, petId: number): Promise<PetEntity> {
    try {
      const foundShelter =
        await this.shelterRepository.findShelterById(shelterId);

      if (!foundShelter)
        throw new NotFound("Shelter not found to shelter pets");

      const foundPet = await this.shelterRepository.findPetById(petId);

      if (!foundPet) throw new NotFound("Pet not found to shelter pets");

      const isUpdated = await this.shelterRepository.shelterPet(
        foundShelter,
        foundPet,
      );

      if (isUpdated === false) throw new Error("pet not sheltered");

      const shelteredPet = await this.shelterRepository.findPetById(petId);

      if (!shelteredPet) throw new NotFound("Pet not found after sheltered");

      return shelteredPet;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
}
