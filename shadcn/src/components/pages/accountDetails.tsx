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
	FormMessage,
} from "../shadcn/ui/form";
import { Input } from "../shadcn/ui/input";
import { InputWithIconPassword } from "../atoms/InputWithIcon";

import { PhoneNumberInput } from "../atoms/phoneNumberInput";
import { AvatarComp } from "../atoms/avatar";
import { useEffect, useState } from "react";
import { IUserStore, useUserStore } from "@/store/user";
import { toast } from "@/components/shadcn/ui/use-toast";
import { UserDetailForm } from "../organisms/userDetailForm";
import { FormSchemaType } from "../organisms/types";

const AccountDetails = () => {
	const userStore = useUserStore((state) => state as IUserStore);

	function onSubmit(values: FormSchemaType) {
		if (values?.password && !values?.password?.newPassword) {
			delete values.password;
		}

		userStore
			.updateUser({
				_id: JSON.parse(String(localStorage.getItem("user")))._id,
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
		const userId = JSON.parse(String(localStorage.getItem("user")))?._id;
		if (!userId) return;
		userStore.getUser(userId);
	}, []);
	return (
		<div>
			<UserDetailForm onSubmit={onSubmit}></UserDetailForm>
		</div>
	);
};

export default AccountDetails;
