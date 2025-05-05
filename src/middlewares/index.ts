import { Express } from "express";

import { errorMiddleware } from "./errorMiddleware.js";

const middlewares = (app: Express) => {
  app.use(errorMiddleware);
};

export default middlewares;
