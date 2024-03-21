import mongoose, { Schema, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export interface IUser extends Types.ObjectId {
	email: string;
	username: string;
	password?: string;
	passwordConfirm?: string;
	active?: boolean;
	verificationExpireDate?: string;
	verificationToken?: string;
	correctPassword(
		candidatePassword: string,
		userPassword: string
	): Promise<boolean>;
	createVerificationToken(): Promise<string>;
}

const userSchema = new Schema<IUser>({
	email: {
		type: String,
		require: [true, "Email is required!"],
		unique: true,
		trim: true,
		lowercase: true,
		validate: [validator.isEmail, "Please provide us valid email!"],
	},
	username: {
		type: String,
		required: [true, "Username is required!"],
		trim: true,
	},
	password: {
		type: String,
		required: [true, "Please provide us password!"],
		minLength: [8, "Password should have 8 characters!"],
		//select : false hides our password when we retrieve it
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, "Please confirm password!"],
		validate: {
			validator: function (this: IUser, val: string): boolean {
				// this works only on CREATE and SAVE!!!
				return val === this.password;
			},
			message: "Passwords are not same!",
		},
	},
	verificationToken: {
		type: String,
		select: false,
		required: false,
	},
	verificationExpireDate: {
		type: String,
		select: false,
		required: false,
	},
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
});

userSchema.pre("save", async function (next) {
	//only runs if password is actually modified
	console.log("pre-save");
	if (!this.isModified("password")) return next();
	console.log("password modification");

	if (this.password) {
		//Hash the password with cost of 12
		this.password = await bcrypt.hash(this.password, 12);
	}
	//delete passwordConfirm
	this.passwordConfirm = undefined;
	next();
});
userSchema.methods.correctPassword = async function (
	candidatePassword: string,
	userPassword: string
): Promise<boolean> {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createVerificationToken = async function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.verificationToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.verificationExpireDate = Date.now() + 10 * 60 * 1000; //10 minutes

	console.log("this in createVerificationToken", this);
	console.log({ resetToken }, this.verificationToken);
	return resetToken;
};
export default mongoose.model<IUser>("user", userSchema);
