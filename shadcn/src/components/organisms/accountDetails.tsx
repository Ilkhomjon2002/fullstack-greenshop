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
import { IUser, IUserStore, useUserStore } from "@/store/user";
import { toast } from "@/components/shadcn/ui/use-toast";
interface FormSchemaType {
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	username: string;
	password?: {
		currentPassword?: string;
		newPassword?: string;
		confirmPassword?: string;
	};
}

const formSchemaYup = Yup.object({
	email: Yup.string()
		.required("Email is required")
		.email("Email should be valid email"),
	firstName: Yup.string().required("First Name is required"),
	lastName: Yup.string().required("Last name is required"),
	phoneNumber: Yup.string().required("Phone Number is required"),
	username: Yup.string().required("User name is required"),
	password: Yup.object({
		currentPassword: Yup.string().optional(),
		newPassword: Yup.string().optional(),
		confirmPassword: Yup.string().optional(),
	}),
});

const AccountDetails = () => {
	const userStore = useUserStore((state) => state as IUserStore);
	const [phoneStart, setPhoneStart] = useState("");

	const form = useForm<FormSchemaType>({
		resolver: yupResolver(formSchemaYup),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			phoneNumber: "",
			username: "",
			password: {
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			},
		},
	});

	function onSubmit(values: FormSchemaType) {
		if (values?.password && !values?.password?.newPassword) {
			delete values.password;
		}

		userStore
			.updateUser({
				_id: JSON.parse(String(localStorage.getItem("user"))).user._id,
				...values,
			})
			.then((message: any) => {
				console.log(message);
				toast({
					variant: "default",
					title: "",
					description: message,
				});
			});
	}
	useEffect(() => {
		userStore
			.getUser(JSON.parse(String(localStorage.getItem("user"))).user._id)
			.then((res: IUser) => {
				form.setValue("email", String(res?.email));
				form.setValue("username", String(res?.username));
				form.setValue("firstName", String(res?.firstName));
				form.setValue("lastName", String(res?.lastName));
				form.setValue("phoneNumber", String(res?.phoneNumber));
			});
	}, []);
	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="font-medium">Personal Information</div>
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
								name="email"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											Email address <span className="text-red-700">*</span>
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
								name="username"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											Username <span className="text-red-700">*</span>
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
							<div className="pt-8">
								<FormLabel>Photo</FormLabel>
								<div className="flex gap-3 pt-2">
									<AvatarComp
										avatarUrl={userStore?.user?.avatarUrl}
										fallbackImg={FallBackImage}
									></AvatarComp>
									<Button type="button">Change</Button>
									<Button variant={"ghost"}>Remove</Button>
								</div>
							</div>
						</div>
					</div>{" "}
					<div className="font-medium pt-9">Password change</div>
					<div className="flex gap-7">
						<div className="w-full">
							<FormField
								control={form.control}
								name="password.currentPassword"
								render={({ field }) => (
									<FormItem className="pt-5">
										<FormLabel className="font-normal text-textGrey">
											Current password
										</FormLabel>
										<FormControl>
											<InputWithIconPassword placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password.newPassword"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											New Password
										</FormLabel>
										<FormControl>
											<InputWithIconPassword placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password.confirmPassword"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											Confrim new password
										</FormLabel>
										<FormControl>
											<InputWithIconPassword placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="pt-12">
								<Button type="submit" className="w-fit ">
									Save Change
								</Button>
							</div>
						</div>
						<div className="w-full"></div>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default AccountDetails;
