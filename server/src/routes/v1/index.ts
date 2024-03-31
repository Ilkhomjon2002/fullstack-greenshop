import express, { Router } from "express";
import authRoutes from "../auth/index";
import userRoutes from "./userRoutes";
import {
	callbackGoogleController,
	facebookCallbackController,
} from "../../controllers/oauthController";
import jwt from "../../services/jwt";
const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

router.get("/oauth/google/callback", callbackGoogleController);
router.get("/oauth/facebook/callback", facebookCallbackController);

export default router;
