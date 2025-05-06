/* eslint-disable prettier/prettier */
import { Router } from "express";

import shelterFactory from "../factories/shelterFactory .js";
import ShelterController from "../controllers/ShelterController.js";

import { shelterValidationMiddleware } from "../middlewares/validations/shelterValidationMiddleware.js";

const router: Router = Router();

const shelterController: ShelterController = shelterFactory();

router
  .get("/", (req, res) => shelterController.findAllShelters(req,res))
  .get("/:shelterId", (req, res) => shelterController.findShelterById(req,res))
  .post("/", shelterValidationMiddleware, (req, res) => shelterController.createShelter(req,res))
  .put("/:shelterId", (req, res) => shelterController.updateShelter(req,res))
  .delete("/:shelterId",(req, res) => shelterController.deleteShelter(req,res));

router
  .get("/:shelterId/pets", (req, res) => shelterController.findAllPetsSheltered(req,res))
  .get("/:shelterId/pets/:petId", (req, res) => shelterController.findPetShelteredById(req,res))
  .put("/:shelterId/pets/:petId", (req, res) => shelterController.shelterPet(req,res));

export default router;
