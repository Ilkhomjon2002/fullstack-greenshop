import express, { Router } from "express";
import {
	getController,
	updateController,
	deleteController,
} from "../../controllers/userController";
import {
	getBillingAddressController,
	updateAddressController,
} from "../../controllers/billingAddressController";
const router: Router = express.Router();

router.get("/:id", getController);
router.put("/:id", updateController);
router.put("/:id/address/:billingAddressId", updateAddressController);
router.get("/:id/address/:billingAddressId", getBillingAddressController);
router.delete("/:id", deleteController);

export default router;
