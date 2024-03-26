import express, { Router } from "express";
import authRoutes from "../auth/index";
import {
	callbackGoogleController,
	facebookCallbackController,
} from "../../controllers/oauthController";
import userModel from "../../models/unVerifiedUserModel";
const router: Router = express.Router();

router.use("/auth", authRoutes);
router.get("/oauth/google/callback", callbackGoogleController);
router.get("/oauth/facebook/callback", facebookCallbackController);
router.get("/test", async (req, res) => {
	const user = await userModel.findOne({ email: "test@gmail.com" });

	res.status(200).json(user);
});
export default router;
