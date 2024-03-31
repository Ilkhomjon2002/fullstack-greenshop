import { Request, Response } from "express";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import billingAddressModel from "../models/billingAddressModel";

const getBillingAddressController = catchAsync(
	async (req: Request, res: Response) => {
		const { id, billingAddressId } = req.params;

		const user = await billingAddressModel.findById(billingAddressId);
		if (!user) {
			throw new AppError("User not found", 404);
		}

		res.status(200).json({
			data: user,
			status: "success",
		});
	}
);

const updateAddressController = catchAsync(
	async (req: Request, res: Response) => {
		const { id, billingAddressId } = req.params;
		const billingAddress = await billingAddressModel.findByIdAndUpdate(
			billingAddressId,
			req.body
		);

		res.status(200).json({
			data: billingAddress,
			message: "Billing address has been updated successfully",
			status: "success",
		});
	}
);

export { updateAddressController, getBillingAddressController };
