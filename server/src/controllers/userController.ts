import { Request, Response } from "express";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
const checkPassword = async (user: any, password: string, target: string) => {
	console.log(password);
	console.log(target);
	return await user?.correctPassword(password, String(target));
};

const updateController = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const { firstName, lastName, userName, email, password, phoneNumber } =
		req.body;
	const user = await User.findById(id, req.body).select("+password");

	if (user) {
		if (!req.body.password) {
			await User.findByIdAndUpdate(id, req.body);
		} else {
			if (
				await checkPassword(
					user,
					password.currentPassword,
					String(user.password)
				)
			) {
				await User.findByIdAndUpdate(id, {
					firstName,
					lastName,
					userName,
					email,
					phoneNumber,
					password: password.newPassword,
					passwordConfirm: password.passwordConfirm,
				});
			} else {
				throw new AppError("Password didn`t match", 400);
			}
		}
		res.status(200).json({
			message: "User has been updated successfully",
			status: "success",
		});
	}

	throw new AppError("User not found", 404);
});

const getController = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const user = await User.findById(id);
	if (!user) {
		throw new AppError("User not found", 404);
	}

	res.status(200).json({
		data: user,
		status: "success",
	});
});
const deleteController = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	await User.findByIdAndDelete(id);

	res.status(202);
});

export { updateController, getController, deleteController };
