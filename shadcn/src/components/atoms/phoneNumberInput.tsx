import { forwardRef, useEffect, useState } from "react";
import { Input } from "../shadcn/ui/input";
import { SelectCustom } from "./select";
interface PhoneNumberInput {
	placeholder: string;
	value: string;
	phoneStart: string;
	setPhoneStart: (phoneStart: string) => void;
}

export const PhoneNumberInput = forwardRef(
	(
		{
			placeholder,
			value,
			phoneStart,
			setPhoneStart,
			...field
		}: PhoneNumberInput,
		ref: any
	) => {
		useEffect(() => {
			setPhoneStart("+998");
		}, []);
		return (
			<div className="flex gap-2">
				<SelectCustom
					defaultVal={"+998"}
					value={phoneStart}
					onValueChange={(val: string) => setPhoneStart(val)}
					items={[
						{ title: "+998", value: "+998" },
						{ title: "+997", value: "+997" },
						{ title: "+996", value: "+996" },
						{ title: "+995", value: "+995" },
					]}
					placeholder={""}
					className={"w-fit"}
				></SelectCustom>
				<Input value={value} {...field} placeholder={placeholder}></Input>
			</div>
		);
	}
);
