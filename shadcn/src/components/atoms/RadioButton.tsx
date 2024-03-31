import { Label } from "@/components/shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group";
import { cn } from "@/lib/utils";

interface IRadioGroupItem {
	value: string;
	title: string;
	className?: string;
}
export function RadioGroupComp({ items }: { items: IRadioGroupItem[] }) {
	return (
		<RadioGroup defaultValue="comfortable">
			{items.map((item: IRadioGroupItem) => {
				return (
					<div key={item.value} className={cn("flex items-center space-x-2")}>
						<RadioGroupItem value={item.value} id={item.value} />
						<Label className={item.className} htmlFor={item.value}>
							{item.title}
						</Label>
					</div>
				);
			})}
		</RadioGroup>
	);
}
