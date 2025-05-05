/* eslint-disable no-unused-vars */

import AdopterEntity from "../dataSource/entities/AdopterEntity.js";
import PetEntity from "../dataSource/entities/PetEntity.js";
import { CreateAdopterDto, UpdateAdopterDto } from "./types/dto.js";

export default interface IAdopterService {
  findAllAdopters(): Promise<AdopterEntity[]>;

  findAdopterById(adopterId: number): Promise<AdopterEntity>;

  createAdopter(dto: CreateAdopterDto): Promise<AdopterEntity>;

  updateAdopter(dto: UpdateAdopterDto): Promise<AdopterEntity>;

  deleteAdopter(adopterId: number): Promise<AdopterEntity>;

  findAllPetsAdopted(adopterId: number): Promise<PetEntity[]>;

  findPetAdoptedById(adopterId: number, petId: number): Promise<PetEntity>;

  adoptPet(adopterId: number, petId: number): Promise<PetEntity>;
}
