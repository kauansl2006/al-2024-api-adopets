import { PetSizeEnum } from "../enums/PetSizeEnum.js";

export type CreatePetDto = {
  name: string;
  photo: string;
  birthDate: Date;
  specie: string;
  size: PetSizeEnum;
  isAdopted: boolean;
};

export type UpdatePetDto = {
  id: number;
  name: string;
  photo: string;
  birthDate: Date;
  specie: string;
  size: PetSizeEnum;
  isAdopted: boolean;
};

type BaseUserDto = {
  name: string;
  photo: string;
  email: string;
  phone: string;
  birthDate: Date;
  password: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
};

export type CreateAdopterDto = BaseUserDto;

export type UpdateAdopterDto = Omit<BaseUserDto, "address" | "password"> & {
  id: number;
};

export type CreateShelterDto = Omit<BaseUserDto, "birthDate">;

export type UpdateShelterDto = Omit<
  BaseUserDto,
  "birthDate" | "address" | "password"
> & {
  id: number;
};
