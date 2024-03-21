import express, { Request, Response, Router } from "express";
import {
	loginController,
	registerController,
	verifyEmail,
} from "../../controllers/authController";
import {
	facebookLoginController,
	loginWithGoogleController,
} from "../../controllers/oauthController";

const router: Router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/verify-email", verifyEmail);

router.get("/login/google", loginWithGoogleController);
router.get("/login/facebook", facebookLoginController);
export default router;
