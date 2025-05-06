import IAdopterRepository from "../../interfaces/IAdopterRepository.js";

import AdopterEntity from "../entities/AdopterEntity.js";

import { Repository } from "typeorm";
import {
  CreateAdopterDto,
  UpdateAdopterDto,
} from "../../interfaces/types/dto.js";
import PetEntity from "../entities/PetEntity.js";
import { encryptPassword } from "../../utils/encryptPassword.js";

export default class AdopterRepository implements IAdopterRepository {
  private adopterRepository: Repository<AdopterEntity>;
  private petRepository: Repository<PetEntity>;

  constructor(
    adopterRepository: Repository<AdopterEntity>,
    petRepository: Repository<PetEntity>,
  ) {
    this.adopterRepository = adopterRepository;
    this.petRepository = petRepository;
  }
  async findAllAdopters(): Promise<AdopterEntity[]> {
    return await this.adopterRepository.find();
  }
  async findAdopterById(adopterId: number): Promise<AdopterEntity | null> {
    return await this.adopterRepository.findOneBy({ id: adopterId });
  }
  async createAdopter(dto: CreateAdopterDto): Promise<AdopterEntity> {
    const saltRounds = 10;
    const password = dto.password;

    const hash = encryptPassword(password, saltRounds);

    const createdAdopter: AdopterEntity = this.adopterRepository.create({
      name: dto.name,
      photo: dto.photo,
      email: dto.email,
      phone: dto.phone,
      birthDate: dto.birthDate,
      passwordHash: hash,
      address: {
        street: dto.address.street,
        neighborhood: dto.address.neighborhood,
        city: dto.address.city,
        state: dto.address.state,
        zipCode: dto.address.zipCode,
      },
    });

    return await this.adopterRepository.save(createdAdopter);
  }
  async updateAdopter(dto: UpdateAdopterDto): Promise<boolean> {
    const updateResult = await this.adopterRepository.update(dto.id, {
      name: dto.name,
      photo: dto.photo,
      email: dto.email,
      phone: dto.phone,
      birthDate: dto.birthDate,
    });

    if (updateResult.affected === 0) return false;
    else return true;
  }
  async deleteAdopter(adopterId: number): Promise<boolean> {
    const deleteResult = await this.adopterRepository.delete(adopterId);

    if (deleteResult.affected === 0) return false;
    else return true;
  }
  async findAllPetsAdopted(adopterId: number): Promise<PetEntity[]> {
    return await this.petRepository.find({
      where: {
        isAdopted: true,
        adopter: {
          id: adopterId,
        },
      },
    });
  }
  async findPetAdoptedById(
    adopterId: number,
    petId: number,
  ): Promise<PetEntity | null> {
    return await this.petRepository.findOne({
      where: {
        id: petId,
        isAdopted: true,
        adopter: {
          id: adopterId,
        },
      },
    });
  }
  async findPetById(petId: number): Promise<PetEntity | null> {
    return await this.petRepository.findOneBy({ id: petId });
  }
  async adoptPet(
    foundAdopter: AdopterEntity,
    foundPet: PetEntity,
  ): Promise<boolean> {
    const updateResult = await this.petRepository.update(foundPet.id, {
      adopter: foundAdopter,
      isAdopted: true,
    });

    if (updateResult.affected === 0) return false;
    else return true;
  }
}
