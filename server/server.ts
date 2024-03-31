import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import routes from "./src/routes/v1/index";
import morgan from "morgan";
import globalErrorHandler from "./src/errors/globalErrorHandler";
import AppError from "./src/utils/appError";
import headers from "./src/services/headers";
config();

const app: Application = express();
app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(express.json());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	helmet({
		crossOriginResourcePolicy: false,
	})
);

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(`${__dirname}/public`));

//TODO need to implement express-rate-limit

app.use("/v1", headers.set, routes);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(process.env.PORT || 8080, async () => {
	await mongoose.connect(String(process.env.DB));
	console.log(`Server running on port ${process.env.PORT}`);
});
