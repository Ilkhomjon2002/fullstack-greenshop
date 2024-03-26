import { toast } from "@/components/shadcn/ui/use-toast";
export default (err: any) => {
	const toastHandler = (title: string, description: string) => {
		toast({
			variant: "destructive",
			title,
			description,
		});
	};

	return new Promise((_, reject) => {
		switch (err.status) {
			case "401-1":
				toastHandler("Login Error", err.error);
				break;
			case 400:
				toastHandler("Something went wrong", err.error);
				break;
			case 401:
				toastHandler("Unauthorized request", err.error);
				break;
			case 404:
				toastHandler("Not found", err.error);
				break;
		}
		if (err.status >= 500) {
			toastHandler("Server error", err.error);
		}
		if (err.status == "CONERROR") {
			toastHandler("Connection error", err.error);
		}
		reject(err);
	});
};
