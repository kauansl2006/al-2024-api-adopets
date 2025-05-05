import express, { Express } from "express";
import routes from "./routes/index.js";
import middlewares from "./middlewares/index.js";

import AppDataSource from "./dataSource/config/dataSource.js";

AppDataSource.initialize()
  .then(() => console.log("Database connection successfully"))
  .catch((error) => console.log("Database connection error: ", error));

const app: Express = express();
app.use(express.json());
routes(app);
middlewares(app);

export default app;
