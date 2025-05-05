import ShelterController from "../controllers/ShelterController.js";

import ShelterRepository from "../dataSource/repositories/ShelterRepository.js";
import ShelterService from "../services/ShelterService.js";
import AppDataSource from "../dataSource/config/dataSource.js";

const shelterFactory = (): ShelterController => {
  const shelterRepository: ShelterRepository = new ShelterRepository(
    AppDataSource.getRepository("ShelterEntity"),
    AppDataSource.getRepository("PetEntity"),
  );
  const shelterService: ShelterService = new ShelterService(shelterRepository);

  return new ShelterController(shelterService);
};

export default shelterFactory;
