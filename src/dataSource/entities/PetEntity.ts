import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { PetSizeEnum } from "../../interfaces/enums/PetSizeEnum.js";
import AdopterEntity from "./AdopterEntity.js";
import ShelterEntity from "./ShelterEntity.js";

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column("varchar")
  public name!: string;

  @Column("varchar", { nullable: true })
  public photo?: string;

  @Column("date")
  public birthDate!: Date;

  @Column("varchar")
  public specie!: string;

  @Column("varchar")
  public size!: PetSizeEnum;

  @Column("boolean")
  public isAdopted!: boolean;

  @ManyToOne(() => AdopterEntity, (adopter) => adopter.pets)
  public adopter?: AdopterEntity;

  @ManyToOne(() => ShelterEntity, (shelter) => shelter.pets)
  public shelter!: ShelterEntity;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  constructor(
    name: string,
    photo: string,
    birthDate: Date,
    specie: string,
    size: PetSizeEnum,
    isAdopted: boolean,
  ) {
    this.name = name;
    this.photo = photo;
    this.birthDate = birthDate;
    this.specie = specie;
    this.size = size;
    this.isAdopted = isAdopted;
  }
}
