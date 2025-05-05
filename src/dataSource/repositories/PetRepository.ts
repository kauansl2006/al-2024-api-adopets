import { Repository } from "typeorm";

import IPetRepository from "../../interfaces/IPetRepository .js";
import PetEntity from "../entities/PetEntity.js";
import { CreatePetDto, UpdatePetDto } from "../../interfaces/types/dto.js";

export default class PetRepository implements IPetRepository {
  private petRepository: Repository<PetEntity>;

  constructor(petRepository: Repository<PetEntity>) {
    this.petRepository = petRepository;
  }
  async findAllPets(): Promise<PetEntity[]> {
    return await this.petRepository.find();
  }
  async findPetById(petId: number): Promise<PetEntity | null> {
    return await this.petRepository.findOneBy({ id: petId });
  }
  async createPet(dto: CreatePetDto): Promise<PetEntity> {
    const createdPet: PetEntity = this.petRepository.create({
      name: dto.name,
      photo: dto.photo,
      birthDate: dto.birthDate,
      specie: dto.specie,
      size: dto.size,
      isAdopted: dto.isAdopted,
    });

    return await this.petRepository.save(createdPet);
  }
  async updatePet(dto: UpdatePetDto): Promise<boolean> {
    const updateResult = await this.petRepository.update(dto.id, {
      name: dto.name,
      photo: dto.photo,
      birthDate: dto.birthDate,
      specie: dto.specie,
      size: dto.size,
      isAdopted: dto.isAdopted,
    });

    if (updateResult.affected === 0) return false;
    else return true;
  }
  async deletePet(petId: number): Promise<boolean> {
    const deleteResult = await this.petRepository.delete(petId);

    if (deleteResult.affected === 0) return false;
    else return true;
  }
}
