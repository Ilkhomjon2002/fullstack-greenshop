import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { ReactElement } from "react";

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface IGroupItem {
	title: string;
	shortcut: string | null;
	action?: () => void;
	path?: string;
}
interface IDropdownProps {
	children: ReactElement;
	title: string;
	groups: Array<{ title: string; groupItems: Array<IGroupItem> }>;
}

export function DropdownMenuComp(props: IDropdownProps) {
	const navigate = useNavigate();
	const onSelect = (item: IGroupItem) => {
		if (item.path) {
			navigate(item.path);
		} else if (item.action) {
			item.action();
		}
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="cursor-pointer hover:shado">{props.children}</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>{props.title}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{props?.groups?.map((group) => {
					return (
						<React.Fragment key={group.title}>
							<DropdownMenuGroup>
								{group.groupItems?.map((item) => {
									return (
										<React.Fragment key={item.title}>
											<DropdownMenuItem onSelect={() => onSelect(item)}>
												{item.title}
												{item.shortcut && (
													<DropdownMenuShortcut>
														{item.shortcut}
													</DropdownMenuShortcut>
												)}
											</DropdownMenuItem>
										</React.Fragment>
									);
								})}
							</DropdownMenuGroup>
						</React.Fragment>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
