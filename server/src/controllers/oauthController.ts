import { CookieOptions, Request, Response } from "express";
import axios from "axios";
import catchAsync from "../utils/catchAsync";
import queryStringify from "../utils/queryStringify";
import { IUser } from "../models/userModel";
import jwt from "../services/jwt";
import User from "../models/userModel";
import { v4 as uuidv4 } from "uuid";
import { IGoogleUser } from "../types/userTypes";
import oAuth from "../services/oAuth";
const createAndRedirect = (user: IUser, res: Response) => {
	const tokenPayload = {
		username: user.username,
		email: user.email,
		_id: String(user._id),
	};

	const token = jwt.sign(tokenPayload);
	const cookieOptions: CookieOptions = {
		httpOnly: true,
		expires: new Date(
			Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 3600 * 1000
		),
		secure: true,
		signed: true,
	};
	res.cookie("token", token, cookieOptions);
	user.password = undefined;
	user.passwordConfirm = undefined;

	res.redirect(`http://localhost:5173?${queryStringify({ token })}`);
};

//** -------------Controllers---------------- */
//** Login controller triggered by /v1/auth/login/google and sends consent screen back
const loginWithGoogleController = (req: Request, res: Response) => {
	return oAuth.googleInit(res);
};

//** Login controller triggered by /v1/oauth/google/callback endpoint
const callbackGoogleController = catchAsync(
	async (req: Request, res: Response) => {
		const code = req.query.code;

		const { data }: any = await oAuth.googleGetToken(String(code));

		const googleUser: any = await oAuth.googleGetUser({
			access_token: data.access_token,
			id_token: data.id_token,
			res,
		});

		let user = await User.findOne({ email: googleUser.email });
		if (!user) {
			const newPassword = uuidv4().slice(0, 8);
			user = await User.create({
				email: googleUser.email,
				username: googleUser.given_name,
				password: newPassword,
				passwordConfirm: newPassword,
			});
		}

		createAndRedirect(user, res);
	}
);

//** Login controller triggered by /v1/auth/login/facebook and sends consent screen back
const facebookLoginController = (req: Request, res: Response) => {
	return oAuth.facebookInit(res);
};
//** Login controller triggered by /v1/oauth/facebook/callback endpoint
const facebookCallbackController = catchAsync(
	async (req: Request, res: Response) => {
		const { code } = req.query;
		const { data }: any = await oAuth.facebookGetToken(String(code));
		const facebookUser = await oAuth.facebookGetUser(data.access_token, res);
		let user = await User.findOne({ email: facebookUser.email });
		if (!user) {
			const newPassword = uuidv4().slice(0, 8);
			user = await User.create({
				email: facebookUser.email,
				username: facebookUser.given_name,
				password: newPassword,
				passwordConfirm: newPassword,
			});
		}
		createAndRedirect(user, res);
	}
);
export {
	loginWithGoogleController,
	callbackGoogleController,
	facebookLoginController,
	facebookCallbackController,
};
