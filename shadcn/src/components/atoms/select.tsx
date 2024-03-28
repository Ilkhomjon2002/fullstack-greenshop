import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcn/ui/select";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
interface IItem {
	value: string;
	title: string;
}
interface ISelect {
	items: IItem[];
	placeholder: string;
	className: string;
	defaultVal?: any;
	value: any;
	onValueChange: (val: string) => void;
}
export const SelectCustom = ({
	items,
	placeholder,
	className,
	defaultVal,
	value,
	onValueChange,
}: ISelect) => {
	return (
		<Select
			defaultValue={defaultVal}
			onValueChange={onValueChange}
			value={value}
		>
			<SelectTrigger className={cn("w-[180px]", className)}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{items.map((item: IItem) => {
					return <SelectItem value={item.value}>{item.title}</SelectItem>;
				})}
			</SelectContent>
		</Select>
	);
};
