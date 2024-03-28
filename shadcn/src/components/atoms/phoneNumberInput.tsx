import { useState } from "react";
import { Input } from "../shadcn/ui/input";
import { SelectCustom } from "./select";
interface PhoneNumberInput {
	placeholder: string;
}

export const PhoneNumberInput = ({ placeholder }: PhoneNumberInput) => {
	const [phoneStart, setPhoneStart] = useState("+998");

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
			<Input placeholder={placeholder}></Input>
		</div>
	);
};
