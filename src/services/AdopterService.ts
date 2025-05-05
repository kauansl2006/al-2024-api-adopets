import AdopterEntity from "../dataSource/entities/AdopterEntity.js";
import PetEntity from "../dataSource/entities/PetEntity.js";
import AdopterRepository from "../dataSource/repositories/AdopterRepository.js";
import IAdopterService from "../interfaces/IAdopterService.js";
import { CreateAdopterDto, UpdateAdopterDto } from "../interfaces/types/dto.js";
import { NotFound } from "../utils/ErrorHandler.js";

export default class AdopterService implements IAdopterService {
  private adopterRepository: AdopterRepository;

  constructor(adopterRepository: AdopterRepository) {
    this.adopterRepository = adopterRepository;
  }

  async findAllAdopters(): Promise<AdopterEntity[]> {
    try {
      const foundAdopters = await this.adopterRepository.findAllAdopters();

      if (foundAdopters.length === 0) throw new NotFound("Adopters not found");

      return foundAdopters;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async findAdopterById(adopterId: number): Promise<AdopterEntity> {
    try {
      const foundAdopter =
        await this.adopterRepository.findAdopterById(adopterId);

      if (!foundAdopter) throw new NotFound("Adopter not found");

      return foundAdopter;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async createAdopter(dto: CreateAdopterDto): Promise<AdopterEntity> {
    try {
      const createdAdopter = await this.adopterRepository.createAdopter(dto);

      if (!createdAdopter) throw new Error("Adopter not created");

      return createdAdopter;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async updateAdopter(dto: UpdateAdopterDto): Promise<AdopterEntity> {
    try {
      const isUpdated = await this.adopterRepository.updateAdopter(dto);

      if (isUpdated === false) throw new Error("Adopter not update");

      const foundAdopter = await this.adopterRepository.findAdopterById(dto.id);

      if (!foundAdopter) throw new NotFound("Adopter not found after update");

      return foundAdopter;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async deleteAdopter(adopterId: number): Promise<AdopterEntity> {
    try {
      const foundAdopter =
        await this.adopterRepository.findAdopterById(adopterId);

      if (!foundAdopter) throw new NotFound("Adopter not found before delete");

      const isDelete = await this.adopterRepository.deleteAdopter(adopterId);

      if (isDelete === false) throw new Error("Adopter not deleted");

      return foundAdopter;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async findAllPetsAdopted(adopterId: number): Promise<PetEntity[]> {
    try {
      const foundAdopter =
        await this.adopterRepository.findAdopterById(adopterId);

      if (!foundAdopter) throw new NotFound("Adopter not found to find pets");

      const foundAdoptedPets =
        await this.adopterRepository.findAllPetsAdopted(adopterId);

      if (foundAdoptedPets.length === 0)
        throw new NotFound("Adopted pets not found");

      return foundAdoptedPets;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async findPetAdoptedById(
    adopterId: number,
    petId: number,
  ): Promise<PetEntity> {
    try {
      const foundAdopter =
        await this.adopterRepository.findAdopterById(adopterId);

      if (!foundAdopter) throw new NotFound("Adopter not found to find pet");

      const foundAdoptedPet = await this.adopterRepository.findPetAdoptedById(
        adopterId,
        petId,
      );

      if (!foundAdoptedPet) throw new NotFound("Adopted pet not found");

      return foundAdoptedPet;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
  async adoptPet(adopterId: number, petId: number): Promise<PetEntity> {
    try {
      const foundAdopter =
        await this.adopterRepository.findAdopterById(adopterId);

      if (!foundAdopter) throw new NotFound("Adopter not found to adopt pets");

      const foundPet = await this.adopterRepository.findPetById(petId);

      if (!foundPet) throw new NotFound("Pet not found to adopt pets");

      const isUpdated = await this.adopterRepository.adoptPet(
        foundAdopter,
        foundPet,
      );

      if (isUpdated === false) throw new Error("pet not adopted");

      const adoptedPet = await this.adopterRepository.findPetById(petId);

      if (!adoptedPet) throw new NotFound("Pet not found after adopted");

      return adoptedPet;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
}
