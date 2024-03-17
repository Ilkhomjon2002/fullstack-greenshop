import { toast } from "@/components/shadcn/ui/use-toast";
import { create } from "zustand";

export const useToastStore = create(() => ({
	addToast: async (
		type: "ERROR" | "SUCCESS",
		title: string,
		description: string
	) => {
		toast({
			variant: type == "ERROR" ? "destructive" : "default",
			title: title,
			description: description,
		});
	},
}));
