import { Box, Button, ButtonProps } from "@chakra-ui/react";
import { PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
interface IPrimaryButton extends ButtonProps {
	onClick: () => void;
}

const PrimaryButton = (props: IPrimaryButton) => {
	return (
		<Button w={"100%"} {...props} bg={"brand.100"} color={"white"}>
			{props.children}
		</Button>
	);
};

const LinkButton: React.FC<any> = ({ children, to, title, ...props }) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<NavLink
			className={({ isActive }) => {
				setIsActive(isActive);
				return "bg-red-500";
			}}
			to={to}
		>
			<Box
				{...props}
				fontWeight={"600"}
				transition={".3s ease"}
				_after={{
					transition: ".3s ease",
					width: isActive ? "100%" : "0%",
					content: `""`,
					position: "absolute",
					height: "2px",
					background: isActive ? "brand.100" : "transparent",
					bottom: "0%",
					left: "0%",
					opacity: isActive ? "100%" : "0%",
				}}
				_hover={{
					color: "brand.100",
					_after: {
						width: "100%",
						opacity: "100%",
						background: "brand.100",
					},
				}}
				cursor={"pointer"}
				color={isActive ? "brand.100" : "secondary.100"}
				as={"span"}
			>
				{title}
			</Box>
		</NavLink>
	);
};

export { PrimaryButton, LinkButton };
