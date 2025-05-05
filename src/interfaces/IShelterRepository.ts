/* eslint-disable no-unused-vars */

import PetEntity from "../dataSource/entities/PetEntity.js";
import ShelterEntity from "../dataSource/entities/ShelterEntity.js";
import { CreateShelterDto, UpdateShelterDto } from "./types/dto.js";

export default interface IShelterRepository {
  findAllShelters(): Promise<ShelterEntity[]>;

  findShelterById(shelterId: number): Promise<ShelterEntity | null>;

  createShelter(dto: CreateShelterDto): Promise<ShelterEntity>;

  updateShelter(dto: UpdateShelterDto): Promise<boolean>;

  deleteShelter(shelterId: number): Promise<boolean>;

  findAllPetsSheltered(shelterId: number): Promise<PetEntity[]>;

  findPetShelteredById(
    shelterId: number,
    petId: number,
  ): Promise<PetEntity | null>;

  findPetById(petId: number): Promise<PetEntity | null>;

  shelterPet(
    foundShelter: ShelterEntity,
    foundPet: PetEntity,
  ): Promise<boolean>;
}
