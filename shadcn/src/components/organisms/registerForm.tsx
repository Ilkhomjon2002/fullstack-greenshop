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
import { IUserStore, useUserStore } from "@/store/user";
const formSchema = z.object({
	username: z.string({
		required_error: "Username is required",
	}),
	email: z
		.string({
			required_error: "Email is required",
		})
		.email("Email should be valid"),
	password: z.string({
		required_error: "Password is required",
	}),
	confirmPassword: z.string({
		required_error: "Password is required",
	}),
});

export const RegisterForm = (props: { setFormType: (type: any) => void }) => {
	const store = useUserStore((state) => state as IUserStore);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			username: "",
		},
	});
	function changeForm() {
		props.setFormType("login");
	}
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		store.register({
			username: values.username,
			email: values.email,
			password: values.password,
			passwordConfirm: values.confirmPassword,
		});
		console.log(values);
	}
	return (
		<div className="w-[300px] my-0 mx-auto">
			<div className="flex items-center justify-center gap-2 pb-12">
				<span className="text-xl  cursor-pointer" onClick={changeForm}>
					Login
				</span>
				<span>|</span>
				<span className="text-xl cursor-pointer text-primary">Register</span>
			</div>
			<span className="text-sm text-zinc-700 inline-block pb-3">
				Enter your username and password to login.
			</span>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Username" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
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
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<InputWithIconPassword
										placeholder="Confirm Password"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full">
						Register
					</Button>
					<div className="mt-12 relative">
						<div className="w-full absolute h-[1px] bg-red top-[50%] z-[-1] bg-slate-800 opacity-30"></div>
						<p className="bg-white text-zinc-700 w-fit mx-auto text-sm px-2">
							Or register with
						</p>
					</div>
				</form>
			</Form>
			<div className="flex flex-col gap-4 pt-7">
				<ButtonWithIcon
					className="text-zinc-700"
					iconSrc={GoogleIcon}
					variant={"outline"}
					title="Continue with Google"
				></ButtonWithIcon>
				<ButtonWithIcon
					className="text-zinc-700"
					iconSrc={FacebookIcon}
					variant={"outline"}
					title="Continue with Facebook"
				></ButtonWithIcon>
			</div>
		</div>
	);
};