import mongoose, { Schema, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
export interface IBillingAddress {
	firstName: string;
	lastName: string;
	country: string;
	streetAddress: string;
	state: string;
	emailAddress: string;
	city: string;
	extraAddress: string;
	phoneNumber: string;
	zip: string;
}
const billingAddressSchema = new Schema<IBillingAddress>({
	firstName: {
		type: String,
		required: [true, "First name is required"],
		trim: true,
	},
	lastName: {
		type: String,
		required: [true, "Last name is required"],
		trim: true,
	},
	country: {
		type: String,
		required: [true, "Country is required"],
		trim: true,
	},
	streetAddress: {
		type: String,
		required: [true, "Street address is required"],
		trim: true,
	},
	state: {
		type: String,
		required: [true, "State is required"],
		trim: true,
	},
	emailAddress: {
		type: String,
		required: [true, "Email address is required"],
		trim: true,
	},
	city: {
		type: String,
		required: [true, "City is required"],
		trim: true,
	},
	extraAddress: {
		type: String,
		trim: true,
	},
	phoneNumber: {
		type: String,
		required: [true, "Phone number is required"],
		trim: true,
	},
	zip: {
		type: String,
		required: [true, "Zip is required"],
		trim: true,
	},
});
export default mongoose.model<IBillingAddress>(
	"billingAddress",
	billingAddressSchema
);
