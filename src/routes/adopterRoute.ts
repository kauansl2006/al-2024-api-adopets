/* eslint-disable prettier/prettier */
import { Router } from "express";

import adopterFactory from "../factories/adopterFactory.js";
import AdopterController from "../controllers/AdopterController.js";

import { adopterValidationMiddleware } from "../middlewares/validations/adopterValidationMiddleware.js";

const router: Router = Router();

const adopterController: AdopterController = adopterFactory();

router
  .get("/", (req,res,next) => adopterController.findAllAdopters(req,res,next))
  .get("/:adopterId", (req,res,next) => adopterController.findAdopterById(req,res,next))
  .post("/", adopterValidationMiddleware, (req,res,next) => adopterController.createAdopter(req,res,next))
  .put("/:adopterId", (req,res,next) => adopterController.updateAdopter(req,res,next))
  .delete("/:adopterId",(req,res,next) => adopterController.deleteAdopter(req,res,next));

router
  .get("/:adopterId/pets", (req,res,next) => adopterController.findAllPetsAdopted(req,res,next))
  .get("/:adopterId/pets/:petId", (req,res,next) => adopterController.findPetAdoptedById(req,res,next))
  .put("/:adopterId/pets/:petId", (req,res,next) => adopterController.adoptPet(req,res,next));
  
export default router;
