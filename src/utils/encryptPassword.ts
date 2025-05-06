import bcrypt from "bcrypt";

export const encryptPassword = (password: string, saltRounds: number) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};
