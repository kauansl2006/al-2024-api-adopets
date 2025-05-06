const JWT_SECRET = String(process.env.JWT_SECRET);

export const jwtSecret = {
  secret: JWT_SECRET,
};
