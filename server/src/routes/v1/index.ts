import express, { Router } from "express";
import authRoutes from "../auth/index";
import {
	callbackGoogleController,
	facebookCallbackController,
} from "../../controllers/oauthController";
const router: Router = express.Router();

router.use("/auth", authRoutes);
router.get("/oauth/google/callback", callbackGoogleController);
router.get("/oauth/facebook/callback", facebookCallbackController);

export default router;
