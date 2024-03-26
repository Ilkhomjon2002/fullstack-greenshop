import { Button } from "@/components/shadcn/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import React, { Dispatch, SetStateAction } from "react";
import { ReactElement } from "react";

interface ICustomDialog {
	trigger: ReactElement;
	children: ReactElement;
	open: boolean;
	onOpenChange: Dispatch<SetStateAction<boolean>>;
}
export function CustomDialog(props: ICustomDialog) {
	return (
		<Dialog open={props.open} onOpenChange={props.onOpenChange}>
			<DialogTrigger asChild>{props.trigger}</DialogTrigger>
			<DialogContent className="sm:max-w-[500px] rounded-none sm:rounded-none pt-12 pb-16 border-none">
				{props.children}
				<DialogFooter className="h-[10px] bg-primary w-full absolute bottom-0"></DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
