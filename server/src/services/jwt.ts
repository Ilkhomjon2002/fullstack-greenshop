import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default {
	sign: (payload: {
		username: string;
		email: string;
		_id: string;
	}): string | unknown => {
		try {
			const token = jwt.sign(payload, String(process.env.JWT_SECRET), {
				expiresIn: String(process.env.JWT_EXPIRES_IN),
			});
			return token;
		} catch (err) {
			console.log("jwt-sign error", err);
			return err;
		}
	},
	verify: async (req: Request, res: Response, next: NextFunction) => {
		try {
			console.log(req.cookies.token);
			const decoded = jwt.verify(
				String(req.cookies.token),
				String(process.env.JWT_TOKEN)
			);
			req.body.user = decoded;
			console.log(decoded);
			next();
		} catch (err: any) {
			console.log(err);
			return res.status(401).json({ message: err?.message });
		}
	},
};
