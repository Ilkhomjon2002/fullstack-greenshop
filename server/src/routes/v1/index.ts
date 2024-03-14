import express, { Request, Response, Router } from "express";
import authRoutes from "../auth/index";
const router: Router = express.Router();

router.use("/auth", authRoutes);

export default router;
