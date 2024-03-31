import { Request, Response, NextFunction, CookieOptions } from "express";
import catchAsync from "../utils/catchAsync";
import User, { IUser } from "../models/userModel";
import UserNotVerified, {
	INotVerifiedUser,
} from "../models/unVerifiedUserModel";
import jwt from "../services/jwt";
import AppError from "../utils/appError";
import { sendEmail } from "../utils/email";
import unVerifiedUserModel from "../models/unVerifiedUserModel";
const createAndSendToken = (
	user: IUser,
	statusCode: 200 | 201,
	res: Response
) => {
	console.log("CREATE AND SEND TOKEN");
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
	console.log(res);

	res.status(statusCode).json({ status: "success", token, data: { user } });
};
const verifyEmail = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			return next(new AppError("There is no user with this email!", 404));
		}
		const emailVerificationCode = await user.createVerificationToken();
		sendEmail({
			email: "smax18760@gmail.com",
			subject: "Verification code for email",
			text: emailVerificationCode,
		});

		console.log(user);
		res.send(emailVerificationCode);
	}
);

//** -------------Controllers---------------- */
//** Login controller triggered by /v1/auth/login
const loginController = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;
		if (!email || !password) {
			return next(new AppError("Please provide email and password!", 400));
		}

		const user = await User.findOne({ email }).select("+password");
		console.log(user);

		if (
			user &&
			(await user?.correctPassword(password, String(user.password)))
		) {
			return createAndSendToken(user, 200, res);
		}
		return next(new AppError("Incorrect email or password!", 401));
	}
);
//** Login controller triggered by /v1/auth/register
const registerController = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, username, password, passwordConfirm } = req.body;

		const user = await unVerifiedUserModel.create({
			email,
			username,
			password,
			passwordConfirm,
		});
		// createAndSendToken(user, 201, res);
		res.send(user);
	}
);

export { loginController, registerController, verifyEmail };
