import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { Component, ReactElement } from "react";
import "@/components/atoms/css/dropdown.css";
import React from "react";
import { Separator } from "../shadcn/ui/separator";
import { NavLink, NavLinkProps } from "react-router-dom";
interface IDropdownContent {
	children: any;
	className?: string;
}
interface IDropdownItem {
	children: any;
	className?: string;
	to: string | null;
	action: () => void;
}
const DropdownContent = ({ children, className }: IDropdownContent) => {
	return (
		<div
			className={cn(
				"z-50 min-w-[8rem] overflow-hidden   bg-popover  text-popover-foreground  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				className
			)}
		>
			{children}
		</div>
	);
};
const DropdownItem = ({ children, className, to, action }: IDropdownItem) => {
	return (
		<>
			{to != null ? (
				<NavLink
					to={String(`${to}`)}
					className={({ isActive }) => {
						return cn(
							"relative flex   select-none items-center rounded-sm  py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
							className,
							isActive && "dropdown_item_active"
						);
					}}
				>
					{children}
				</NavLink>
			) : (
				<div
					onClick={action}
					className={cn(
						"relative flex   select-none items-center rounded-sm  py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
						className
					)}
				>
					{children}
				</div>
			)}
		</>
	);
};
interface ICustomDropdownItem {
	icon?: ReactElement;
	className?: string;
	title: string;
	to?: string | null;
	action?: () => void;
}
interface ICustomDropdown {
	title: string;
	items: ICustomDropdownItem[];
}
export const CustomDropDown = ({ title, items }: ICustomDropdown) => {
	return (
		<>
			<DropdownContent className="bg-customCardBg pb-4 flex flex-col gap-2">
				<div className="text-lg font-bold pl-4 pt-4 cursor-default">
					{title}
				</div>
				{items.map((item) => {
					if (item.title != "seperator") {
						return (
							<DropdownItem
								to={String(item.to)}
								key={item.title}
								action={item.action ? item.action : () => {}}
								className={cn("dropdown_item gap-2 py-3", item?.className)}
							>
								{React.createElement(() => item.icon)}
								{item.title}
							</DropdownItem>
						);
					} else {
						return (
							<Separator key={item.title} className="bg-primary/50"></Separator>
						);
					}
				})}
			</DropdownContent>
		</>
	);
};
