/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import AdopterEntity from "../dataSource/entities/AdopterEntity.js";
import PetEntity from "../dataSource/entities/PetEntity.js";
import { CreateAdopterDto, UpdateAdopterDto } from "./types/dto.js";

export default interface IAdopterRepository {
  findAllAdopters(): Promise<AdopterEntity[]>;

  findAdopterById(adopterId: number): Promise<AdopterEntity | null>;

  createAdopter(dto: CreateAdopterDto): Promise<AdopterEntity>;

  updateAdopter(dto: UpdateAdopterDto): Promise<boolean>;

  deleteAdopter(adopterId: number): Promise<boolean>;

  findAllPetsAdopted(adopterId: number): Promise<PetEntity[]>;

  findPetAdoptedById(adopterId: number,petId: number): Promise<PetEntity | null>;

  findPetById(petId: number): Promise<PetEntity | null>;

  adoptPet(foundAdopter: AdopterEntity,foundPet: PetEntity,): Promise<boolean>;
}
