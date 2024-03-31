import { NextFunction, Request, Response } from "express";

export default {
	set: (req: Request, res: Response, next: NextFunction) => {
		res.header({
			"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type,Authorization",
			"Access-Control-Allow-Origin": "*",
		});
		next();
	},
};
