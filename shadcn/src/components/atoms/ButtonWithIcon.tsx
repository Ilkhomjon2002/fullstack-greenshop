import { Mail } from "lucide-react";

import { Button, ButtonProps } from "@/components/shadcn/ui/button";
import { forwardRef } from "react";
interface IButtonWithIcon extends ButtonProps {
	title: string;
	iconSrc: string;
}
export const ButtonWithIcon = forwardRef(
	({ title, iconSrc, ...props }: IButtonWithIcon, ref) => {
		return (
			<Button {...props}>
				<img src={iconSrc} alt="" className="mr-2 h-4 w-4" />
				{title}
			</Button>
		);
	}
);
