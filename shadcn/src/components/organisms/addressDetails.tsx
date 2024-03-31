import { z } from "zod";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "../shadcn/ui/button";
import * as Yup from "yup";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from "../shadcn/ui/form";
import { Input } from "../shadcn/ui/input";
import { InputWithIconPassword } from "../atoms/InputWithIcon";
import FallBackImage from "@/assets/fallback.png";
import { IAuthStore, useAuthStore } from "@/store/auth";
import { useToastStore } from "@/store/alert";
import { PhoneNumberInput } from "../atoms/phoneNumberInput";
import { AvatarComp } from "../atoms/avatar";
import { useEffect, useState } from "react";
import { IUser, IUserAddress, IUserStore, useUserStore } from "@/store/user";
import { toast } from "@/components/shadcn/ui/use-toast";
import { RadioGroupComp } from "../atoms/RadioButton";
interface FormSchemaType {
	firstName: string;
	lastName: string;
	country: string;
	city: string;
	streetAddress: string;
	extraAddress: string;
	state: string;
	zip: string;
	emailAddress: string;
	phoneNumber: string;
}

const formSchemaYup = Yup.object({
	firstName: Yup.string().required("First Name is required"),
	lastName: Yup.string().required("Last name is required"),
	phoneNumber: Yup.string().required("Phone Number is required"),
	country: Yup.string().required("Country is required"),
	city: Yup.string().required("City is required"),
	streetAddress: Yup.string().required("Street address is required"),
	extraAddress: Yup.string(),
	state: Yup.string().required("State is required"),
	zip: Yup.string().required("Zip is required"),
	emailAddress: Yup.string().required("Email address is required"),
});

const AccountDetails = () => {
	const userStore = useUserStore((state) => state as IUserStore);
	const [phoneStart, setPhoneStart] = useState("");

	const form = useForm<FormSchemaType>({
		resolver: yupResolver(formSchemaYup),
		defaultValues: {
			firstName: "",
			lastName: "",
			phoneNumber: "",
			country: "",
			city: "",
			streetAddress: "",
			extraAddress: "",
			state: "",
			zip: "",
			emailAddress: "",
		},
	});

	function onSubmit(values: FormSchemaType) {
		const userId = JSON.parse(String(localStorage.getItem("user"))).user._id;
		const billingAddressId = JSON.parse(String(localStorage.getItem("user")))
			.user.billingAddress[0];
		userStore
			.updateAddress(
				{
					...values,
					_id: billingAddressId,
				},
				userId
			)
			.then((message: any) => {
				toast({
					variant: "default",
					title: "",
					description: message,
				});
			});
	}
	useEffect(() => {
		const userId = JSON.parse(String(localStorage.getItem("user"))).user._id;
		const billingAddressId = JSON.parse(String(localStorage.getItem("user")))
			.user.billingAddress[0];

		userStore
			.getBillingAddress(billingAddressId, userId)
			.then((res: IUserAddress) => {
				form.setValue("firstName", String(res?.firstName));
				form.setValue("lastName", String(res?.lastName));
				form.setValue("country", String(res?.country));
				form.setValue("city", String(res?.city));
				form.setValue("phoneNumber", String(res?.phoneNumber));
				form.setValue("zip", String(res?.zip));
				form.setValue("phoneNumber", String(res?.phoneNumber));
				form.setValue("emailAddress", String(res?.emailAddress));
				form.setValue("streetAddress", String(res?.streetAddress));
				form.setValue("extraAddress", String(res?.extraAddress));
				form.setValue("state", String(res?.state));
			});
	}, []);
	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex justify-between align-top">
						{" "}
						<div>
							<div className="font-medium">Billing Address</div>
							<div className="text-textGrey text-[15px] text-gray-500 pt-2">
								The following addresses will be used on the checkout page by
								default.
							</div>
						</div>
						<div>
							<Button variant={"ghost"} className="text-primary">
								Add
							</Button>
						</div>
					</div>
					<div className="flex gap-7">
						<div className="w-full">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem className="pt-5">
										<FormLabel className="font-normal text-textGrey">
											First Name <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											Country / Region <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="streetAddress"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											Street Address <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="state"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											State <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>{" "}
							<FormField
								control={form.control}
								name="emailAddress"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											Email Address <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full">
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem className="pt-5">
										<FormLabel className="font-normal text-textGrey">
											Last Name <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											City <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="extraAddress"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-transparent">
											extra
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="zip"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											Zip <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phoneNumber"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											Phone Number <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<PhoneNumberInput
												phoneStart={phoneStart}
												setPhoneStart={setPhoneStart}
												placeholder=""
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>{" "}
					<div className="flex gap-7">
						<div className="w-full">
							<div className="pt-12">
								<Button type="submit" className="w-fit ">
									Save Address
								</Button>
							</div>
						</div>
						<div className="w-full"></div>
					</div>
				</form>
			</Form>{" "}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="pt-16">
					<div className="flex justify-between align-top">
						{" "}
						<div>
							<div className="font-medium">Shipping Address</div>
							<div className="text-textGrey text-[15px] text-gray-500 pt-2">
								You have not set up this type of address yet.
							</div>
						</div>
						<div className="flex gap-3 items-center">
							<RadioGroupComp
								items={[
									{
										title: "Same as billing address",
										value: "same",
										className: "font-normal",
									},
								]}
							></RadioGroupComp>
							<Button variant={"ghost"} className="text-primary">
								Add
							</Button>
						</div>
					</div>
					{/* <div className="flex gap-7">
						<div className="w-full">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem className="pt-5">
										<FormLabel className="font-normal text-textGrey">
											First Name <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											Country / Region <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="streetAddress"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											Street Address <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="state"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											State <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>{" "}
							<FormField
								control={form.control}
								name="emailAddress"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											Email Address <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full">
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem className="pt-5">
										<FormLabel className="font-normal text-textGrey">
											Last Name <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											City <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="extraAddress"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-transparent">
											extra
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="zip"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											Zip <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phoneNumber"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											Phone Number <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<PhoneNumberInput
												phoneStart={phoneStart}
												setPhoneStart={setPhoneStart}
												placeholder=""
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>{" "} */}
					{/* <div className="flex gap-7">
						<div className="w-full">
							<div className="pt-12">
								<Button type="submit" className="w-fit ">
									Save Address
								</Button>
							</div>
						</div>
						<div className="w-full"></div>
					</div> */}
				</form>
			</Form>
		</div>
	);
};

export default AccountDetails;
