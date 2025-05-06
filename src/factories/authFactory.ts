import AuthController from "../controllers/AuthController.js";
import AppDataSource from "../dataSource/config/dataSource.js";
import AuthRepository from "../dataSource/repositories/AuthRepository.js";
import AuthService from "../services/AuthService.js";

const authFactory = (): AuthController => {
  const authRepository: AuthRepository = new AuthRepository(
    AppDataSource.getRepository("AdopterEntity"),
  );
  const authService: AuthService = new AuthService(authRepository);

  return new AuthController(authService);
};

export default authFactory;
