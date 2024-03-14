import { Request, Response, NextFunction } from "express";
import { IAppError } from "../types/appErrorType";

const sendErrorDev = (err: IAppError, res: Response) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const errorController = (
	err: IAppError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	console.log(err);
	sendErrorDev(err, res);
};

export default errorController;
