import express, { Router } from "express";
import {
	getController,
	updateController,
	deleteController,
} from "../../controllers/userController";
import {
	getBillingAddressController,
	postBillingAddressController,
	updateAddressController,
	deleteBillingAddressController,
	getBillingAddressesController,
} from "../../controllers/billingAddressController";
const router: Router = express.Router();

router.get("/:id", getController);
router.put("/:id", updateController);
router.put("/:id/address/:billingAddressId", updateAddressController);
router.get("/:id/address/:billingAddressId", getBillingAddressController);
router.get("/:id/address", getBillingAddressesController);
router.delete("/:id/address/:billingAddressId", deleteBillingAddressController);
router.post("/:id/address/", postBillingAddressController);
router.delete("/:id", deleteController);

export default router;
