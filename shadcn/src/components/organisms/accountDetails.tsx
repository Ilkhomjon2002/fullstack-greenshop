import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../shadcn/ui/button";

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
import { ButtonWithIcon } from "../atoms/ButtonWithIcon";
import GoogleIcon from "@/public/icons/googleIcon.svg";
import FacebookIcon from "@/public/icons/facebookIcon.svg";
import { useStore } from "zustand";
import { IUserStore, useUserStore } from "@/store/user";
import { useToastStore } from "@/store/alert";
import { title } from "process";
import { PhoneNumberInput } from "../atoms/phoneNumberInput";
const formSchema = z.object({
	email: z
		.string({
			required_error: "Email is required",
		})
		.email("Email should be valid"),
	password: z.string({
		required_error: "Password is required",
	}),
});

const AccountDetails = () => {
	const toastStore = useToastStore();
	const store = useUserStore((state) => state as IUserStore);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	function changeForm() {
		console.log("form changed");
		// setFormType("register");
	}
	function googleLogin() {
		window.location.href = "http://localhost:8080/v1/auth/login/google";
	}
	function facebookLogin() {
		window.location.href = "http://localhost:8080/v1/auth/login/facebook";
	}
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		store.login({ email: values.email, password: values.password }).then(() => {
			toastStore.addToast("SUCCESS", "Login", "Successfully logged in!");
			// closeForm();
		});
		console.log(values);
	}
	return (
		<div>
			<Form {...form}>
				<form>
					<div className="font-medium">Personal Information</div>
					<div className="flex gap-7">
						<div className="w-full">
							<FormField
								control={form.control}
								name="email"
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
								name="email"
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
								name="email"
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
								name="email"
								render={({ field }) => (
									<FormItem className="pt-8">
										<FormLabel className="font-normal text-textGrey">
											Phone Number <span className="text-red-700">*</span>
										</FormLabel>
										<FormControl>
											<PhoneNumberInput placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>{" "}
					<div className="font-medium pt-9">Password change</div>
					<div className="flex gap-7">
						<div className="w-full">
							<FormField
								control={form.control}
								name="password"
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
								name="password"
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
								name="password"
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
