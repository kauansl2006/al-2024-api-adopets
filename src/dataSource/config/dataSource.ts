import { DataSource } from "typeorm";

import PetEntity from "../entities/PetEntity.js";
import AdopterEntity from "../entities/AdopterEntity.js";
import ShelterEntity from "../entities/ShelterEntity.js";
import AddressEntity from "../entities/AddressEntity.js";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/dataSource/storage/database_development.sqlite",
  entities: [PetEntity, AdopterEntity, ShelterEntity, AddressEntity],
  synchronize: true,
});

export default AppDataSource;
