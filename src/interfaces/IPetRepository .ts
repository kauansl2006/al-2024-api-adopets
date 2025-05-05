/* eslint-disable no-unused-vars */

import PetEntity from "../dataSource/entities/PetEntity.js";
import { CreatePetDto, UpdatePetDto } from "./types/dto.js";

export default interface IPetRepository {
  findAllPets(): Promise<PetEntity[]>;

  findPetById(petId: number): Promise<PetEntity | null>;

  createPet(dto: CreatePetDto): Promise<PetEntity>;

  updatePet(dto: UpdatePetDto): Promise<boolean>;

  deletePet(petId: number): Promise<boolean>;
}
