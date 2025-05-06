import { Repository } from "typeorm";
import AdopterEntity from "../entities/AdopterEntity.js";
import bcrypt from "bcrypt";
import { jwtSecret } from "../config/jwtSecret.js";
import jwt from "jsonwebtoken";

export default class AuthRepository {
  private readonly adopterRepository: Repository<AdopterEntity>;

  constructor(adopterRepository: Repository<AdopterEntity>) {
    this.adopterRepository = adopterRepository;
  }
  async findAdopterByEmail(email: string): Promise<AdopterEntity | null> {
    return this.adopterRepository.findOne({ where: { email } });
  }
  async comparePasswords(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
  async createAuth(foundAdopter: AdopterEntity): Promise<string> {
    return jwt.sign(
      {
        id: foundAdopter.id,
        email: foundAdopter.email,
      },
      jwtSecret.secret,
      {
        expiresIn: 86400,
      },
    );
  }
}
