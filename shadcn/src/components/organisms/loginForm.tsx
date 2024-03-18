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

export const LoginForm = ({
	setFormType,
}: {
	setFormType: (type: any) => void;
}) => {
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
		setFormType("register");
	}
	function googleLogin() {
		window.location.href = "http://localhost:8080/v1/auth/login/google";

		// store.loginWithGoogle();
	}
	function facebookLogin() {
		window.location.href = "http://localhost:8080/v1/auth/login/facebook";
		// store.loginWithFacebook();
	}
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		store.login({ email: values.email, password: values.password });
		console.log(values);
	}
	return (
		<div className="w-[300px] my-0 mx-auto">
			<div className="flex items-center justify-center gap-2 pb-12">
				<span className="text-xl text-primary cursor-pointer">Login</span>
				<span>|</span>
				<span className="text-xl cursor-pointer" onClick={changeForm}>
					Register
				</span>
			</div>
			<span className="text-sm text-zinc-700 inline-block pb-3">
				Enter your username and password to login.
			</span>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Email" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<InputWithIconPassword placeholder="Password" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full">
						Login
					</Button>
					<div className="mt-12 relative">
						<div className="w-full absolute h-[1px] bg-red top-[50%] z-[-1] bg-slate-800 opacity-30"></div>
						<p className="bg-white text-zinc-700 w-fit mx-auto text-sm px-2">
							Or login with
						</p>
					</div>
				</form>
			</Form>
			<div className="flex flex-col gap-4 pt-7">
				<ButtonWithIcon
					className="text-zinc-700"
					iconSrc={GoogleIcon}
					variant={"outline"}
					title="Login with Google"
					onClick={googleLogin}
				></ButtonWithIcon>
				<ButtonWithIcon
					className="text-zinc-700"
					iconSrc={FacebookIcon}
					variant={"outline"}
					onClick={facebookLogin}
					title="Login with Facebook"
				></ButtonWithIcon>
			</div>
		</div>
	);
};
