/* eslint-disable prettier/prettier */
import { Router } from "express";

import authFactory from "../factories/authFactory.js";
import AuthController from "../controllers/AuthController.js";

const router: Router = Router();

const authController: AuthController = authFactory();

router.post("/", (req,res,next) => authController.createAuth(req,res,next))

export default router;
