import { Express, Request, Response } from "express";

import petRoute from "./petRoute.js";
import adopterRoute from "./adopterRoute.js";
import shelterRoute from "./shelterRoute.js";

const routes = (app: Express) => {
  app.route("/").get((_request: Request, response: Response) => {
    response.status(200).send("Hello World");
  });

  app.use("/pets", petRoute);
  app.use("/adopters", adopterRoute);
  app.use("/shelters", shelterRoute);
};

export default routes;
