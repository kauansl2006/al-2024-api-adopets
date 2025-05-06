import AuthRepository from "../dataSource/repositories/AuthRepository.js";
import { CreateAuthDto } from "../interfaces/types/dto.js";
import { BadRequest, NotFound } from "../utils/ErrorHandler.js";

export default class AuthService {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async createAuth(dto: CreateAuthDto): Promise<string> {
    try {
      const foundAdopter = await this.authRepository.findAdopterByEmail(
        dto.email,
      );

      if (!foundAdopter) throw new NotFound("Adopter not found");

      const passwordsMatch = await this.authRepository.comparePasswords(
        dto.password,
        foundAdopter.passwordHash,
      );

      if (passwordsMatch === false)
        throw new BadRequest("Passwords do not match");

      const accessToken = await this.authRepository.createAuth(foundAdopter);

      if (!accessToken) throw new NotFound("Access Token not found");

      return accessToken;
    } catch (error) {
      console.log("Server Error: ", error);
      throw error;
    }
  }
}
