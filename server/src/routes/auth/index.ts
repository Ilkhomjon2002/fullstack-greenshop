import express, { Request, Response, Router } from "express";
const router: Router = express.Router();

router.get("/login", (req: Request, res: Response) => {
	res.send("login");
});

export default router;
