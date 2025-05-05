/* eslint-disable no-unused-vars */

import PetEntity from "../dataSource/entities/PetEntity.js";
import { CreatePetDto, UpdatePetDto } from "./types/dto.js";

export default interface IPetService {
  findAllPets(): Promise<PetEntity[]>;

  findPetById(petId: number): Promise<PetEntity>;

  createPet(dto: CreatePetDto): Promise<PetEntity>;

  updatePet(dto: UpdatePetDto): Promise<PetEntity>;

  deletePet(petId: number): Promise<PetEntity>;
}
