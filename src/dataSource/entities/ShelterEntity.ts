import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import PetEntity from "./PetEntity.js";
import AddressEntity from "./AddressEntity.js";

@Entity()
export default class ShelterEntity {
  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column("varchar")
  public name!: string;

  @Column("varchar")
  public photo!: string;

  @Column("varchar", { unique: true })
  public email!: string;

  @Column("varchar", { unique: true })
  public phone!: string;

  @Column("varchar")
  public passwordHash!: string;

  @OneToOne(() => AddressEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  public address?: AddressEntity;

  @OneToMany(() => PetEntity, (pet) => pet.shelter, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  public pets?: PetEntity[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  constructor(
    name: string,
    photo: string,
    email: string,
    phone: string,
    passwordHash: string,
    address: AddressEntity,
  ) {
    this.name = name;
    this.photo = photo;
    this.email = email;
    this.phone = phone;
    this.passwordHash = passwordHash;
    this.address = address;
  }
}
