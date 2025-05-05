/* eslint-disable no-unused-vars */

import PetEntity from "../dataSource/entities/PetEntity.js";
import ShelterEntity from "../dataSource/entities/ShelterEntity.js";
import { CreateShelterDto, UpdateShelterDto } from "./types/dto.js";

export default interface IShelterService {
  findAllShelters(): Promise<ShelterEntity[]>;

  findShelterById(shelterId: number): Promise<ShelterEntity>;

  createShelter(dto: CreateShelterDto): Promise<ShelterEntity>;

  updateShelter(dto: UpdateShelterDto): Promise<ShelterEntity>;

  deleteShelter(shelterId: number): Promise<ShelterEntity>;

  findAllPetsSheltered(shelterId: number): Promise<PetEntity[]>;

  findPetShelteredById(shelterId: number, petId: number): Promise<PetEntity>;

  shelterPet(shelterId: number, petId: number): Promise<PetEntity>;
}
