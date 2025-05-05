import AppDataSource from "../dataSource/config/dataSource.js";

import PetRepository from "../dataSource/repositories/PetRepository.js";
import PetService from "../services/PetService.js";
import PetController from "../controllers/PetController.js";

const petFactory = (): PetController => {
  const petRepository: PetRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"),
  );
  const petService: PetService = new PetService(petRepository);

  return new PetController(petService);
};

export default petFactory;
