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
	FormMessage,
} from "../shadcn/ui/form";
import { Input } from "../shadcn/ui/input";
import { PhoneNumberInput } from "../atoms/phoneNumberInput";
import { useEffect, useState } from "react";
import { IUserStore, useUserStore } from "@/store/user";
import { AddressFormSchemaType, IAddressForm } from "./types";

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

export const AddressForm = ({
	data,
	onSubmit,
	onMount,
	goBack,
}: IAddressForm) => {
	const userStore = useUserStore((state) => state as IUserStore);
	const [phoneStart, setPhoneStart] = useState("");
	const form = useForm<AddressFormSchemaType>({
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
	const onSubmitDefault = async (values: AddressFormSchemaType) => {
		const userId = JSON.parse(String(localStorage.getItem("user")))?._id;
		if (data?._id) {
			await onSubmit({ ...values, _id: data._id });
		} else {
			await onSubmit({ ...values });
		}
		await userStore.getBillingAddresses(String(userId));
		goBack();
	};
	useEffect(() => {
		if (data) {
			form.setValue("firstName", String(data?.firstName));
			form.setValue("lastName", String(data?.lastName));
			form.setValue("country", String(data?.country));
			form.setValue("city", String(data?.city));
			form.setValue("phoneNumber", String(data?.phoneNumber));
			form.setValue("zip", String(data?.zip));
			form.setValue("phoneNumber", String(data?.phoneNumber));
			form.setValue("emailAddress", String(data?.emailAddress));
			form.setValue("streetAddress", String(data?.streetAddress));
			form.setValue("extraAddress", String(data?.extraAddress));
			form.setValue("state", String(data?.state));
		} else {
			form.reset();
		}
		onMount && onMount();
	}, [data]);
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmitDefault)}>
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
						<div className="pt-12 flex gap-2">
							<Button
								type="button"
								onClick={goBack}
								className="w-fit"
								variant={"ghost"}
							>
								Back
							</Button>
							<Button type="submit" className="w-fit ">
								Save Address
							</Button>
						</div>
					</div>
					<div className="w-full"></div>
				</div>
			</form>
		</Form>
	);
};
