import { Mail } from "lucide-react";

import { Button, ButtonProps } from "@/components/shadcn/ui/button";
interface IButtonIcon extends ButtonProps {
	iconSrc?: string;
}
export function ButtonIcon({
	iconSrc,
	variant,
	children,
	...props
}: IButtonIcon) {
	return (
		<Button {...props} variant={variant ? variant : "ghost"}>
			{children ? children : <img src={iconSrc} alt="" />}
		</Button>
	);
}
