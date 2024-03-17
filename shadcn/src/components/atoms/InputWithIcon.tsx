import { useState } from "react";
import { Button } from "../shadcn/ui/button";
import { Input, InputProps } from "../shadcn/ui/input";
import { ButtonIcon } from "./ButtonIcon";
import { forwardRef } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
interface IInputWithIconPassword extends InputProps {}
export const InputWithIconPassword = forwardRef(
	(props: IInputWithIconPassword, ref: any) => {
		const [type, setType] = useState("password");
		const changeType = (type: boolean) => {
			setType(type ? "text" : "password");
		};
		return (
			<div className="flex items-center relative">
				<Input {...props} type={type} className="pr-15"></Input>
				{type == "password" ? (
					<ButtonIcon
						type="button"
						className="absolute right-0 top-0"
						onClick={() => changeType(true)}
					>
						<EyeOutlined></EyeOutlined>
					</ButtonIcon>
				) : (
					<ButtonIcon
						type="button"
						className="absolute right-0 top-0"
						onClick={() => changeType(false)}
					>
						<EyeInvisibleOutlined />
					</ButtonIcon>
				)}
			</div>
		);
	}
);
