import { Repository } from "typeorm";
import IShelterRepository from "../../interfaces/IShelterRepository.js";
import {
  CreateShelterDto,
  UpdateShelterDto,
} from "../../interfaces/types/dto.js";
import PetEntity from "../entities/PetEntity.js";
import ShelterEntity from "../entities/ShelterEntity.js";
import { encryptPassword } from "../../utils/encryptPassword.js";

export default class ShelterRepository implements IShelterRepository {
  private shelterRepository: Repository<ShelterEntity>;
  private petRepository: Repository<PetEntity>;

  constructor(
    shelterRepository: Repository<ShelterEntity>,
    petRepository: Repository<PetEntity>,
  ) {
    this.shelterRepository = shelterRepository;
    this.petRepository = petRepository;
  }
  async findAllShelters(): Promise<ShelterEntity[]> {
    return await this.shelterRepository.find();
  }
  async findShelterById(shelterId: number): Promise<ShelterEntity | null> {
    return await this.shelterRepository.findOneBy({ id: shelterId });
  }
  async createShelter(dto: CreateShelterDto): Promise<ShelterEntity> {
    const saltRounds = 10;
    const password = dto.password;

    const hash = encryptPassword(password, saltRounds);

    const createdShelter: ShelterEntity = this.shelterRepository.create({
      name: dto.name,
      photo: dto.photo,
      email: dto.email,
      phone: dto.phone,
      passwordHash: hash,
      address: {
        street: dto.address.street,
        neighborhood: dto.address.neighborhood,
        city: dto.address.city,
        state: dto.address.state,
        zipCode: dto.address.zipCode,
      },
    });

    return await this.shelterRepository.save(createdShelter);
  }
  async updateShelter(dto: UpdateShelterDto): Promise<boolean> {
    const updateResult = await this.shelterRepository.update(dto.id, {
      name: dto.name,
      photo: dto.photo,
      email: dto.email,
      phone: dto.phone,
    });

    if (updateResult.affected === 0) return false;
    else return true;
  }
  async deleteShelter(shelterId: number): Promise<boolean> {
    const deleteResult = await this.shelterRepository.delete(shelterId);

    if (deleteResult.affected === 0) return false;
    else return true;
  }
  async findAllPetsSheltered(shelterId: number): Promise<PetEntity[]> {
    return await this.petRepository.find({
      where: {
        isAdopted: false,
        shelter: {
          id: shelterId,
        },
      },
    });
  }
  async findPetShelteredById(
    shelterId: number,
    petId: number,
  ): Promise<PetEntity | null> {
    return await this.petRepository.findOne({
      where: {
        id: petId,
        isAdopted: false,
        shelter: {
          id: shelterId,
        },
      },
    });
  }
  async findPetById(petId: number): Promise<PetEntity | null> {
    const foundPet = await this.petRepository.findOneBy({ id: petId });

    if (foundPet?.isAdopted === false) return foundPet;
    else return null;
  }
  async shelterPet(
    foundShelter: ShelterEntity,
    foundPet: PetEntity,
  ): Promise<boolean> {
    const updateResult = await this.petRepository.update(foundPet.id, {
      shelter: foundShelter,
      isAdopted: false,
    });

    if (updateResult.affected === 0) return false;
    else return true;
  }
}
