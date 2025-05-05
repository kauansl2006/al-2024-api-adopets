/* eslint-disable prettier/prettier */
import { Router } from "express";

import petFactory from "../factories/petFactory.js";
import PetController from "../controllers/PetController.js";

const router: Router = Router();

const petController: PetController = petFactory();

router
  .get("/", (req, res) => petController.findAllPets(req,res))
  .get("/:petId", (req, res) => petController.findPetById(req,res))
  .post("/", (req, res) => petController.createPet(req,res))
  .put("/:petId", (req, res) => petController.updatePet(req,res))
  .delete("/:petId",(req, res) => petController.deletePet(req,res));

export default router;
