import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class AddressEntity {
  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column("varchar")
  public street!: string;

  @Column("varchar")
  public neighborhood!: string;

  @Column("varchar")
  public city!: string;

  @Column("varchar")
  public state!: string;

  @Column("varchar")
  public zipCode!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  constructor(
    street: string,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string,
  ) {
    this.street = street;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
  }
}
