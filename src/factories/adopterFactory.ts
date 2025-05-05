import AppDataSource from "../dataSource/config/dataSource.js";

import AdopterRepository from "../dataSource/repositories/AdopterRepository.js";
import AdopterService from "../services/AdopterService.js";
import AdopterController from "../controllers/AdopterController.js";

const adopterFactory = (): AdopterController => {
  const adopterRepository: AdopterRepository = new AdopterRepository(
    AppDataSource.getRepository("AdopterEntity"),
    AppDataSource.getRepository("PetEntity"),
  );
  const adopterService: AdopterService = new AdopterService(adopterRepository);

  return new AdopterController(adopterService);
};

export default adopterFactory;
